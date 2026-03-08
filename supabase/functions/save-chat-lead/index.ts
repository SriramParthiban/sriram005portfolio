import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, contactInfo } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const conversationText = messages.map((m: any) => `${m.role}: ${m.content}`).join("\n");

    // Use tool calling for reliable structured extraction
    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a lead extraction assistant. Analyze the conversation and extract visitor information. 
Pay very close attention to names - when the user says "I'm John" or "My name is John" or "It's John" or just responds with a name like "John", that IS their name. Extract it.
Similarly for emails and phone numbers - extract them when clearly provided by the user (not the assistant).
For the tag, create a specific 2-4 word label for their intent.
For the summary, write 2-3 sentences about what the visitor wants.
For the ai_response_summary, briefly describe what the assistant recommended.`,
          },
          {
            role: "user",
            content: `Extract lead info from this conversation:\n\n${conversationText}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_lead_info",
              description: "Extract visitor contact information and conversation summary from a chat conversation.",
              parameters: {
                type: "object",
                properties: {
                  extracted_name: {
                    type: "string",
                    description: "The visitor's name if they provided it during the conversation. Look for patterns like 'I'm [name]', 'My name is [name]', or when they just reply with a name. Return null if not provided.",
                  },
                  extracted_email: {
                    type: "string",
                    description: "The visitor's email address if provided. Return null if not provided.",
                  },
                  extracted_phone: {
                    type: "string",
                    description: "The visitor's phone number if provided. Return null if not provided.",
                  },
                  summary: {
                    type: "string",
                    description: "A 2-3 sentence summary of what the visitor wants and their needs.",
                  },
                  ai_response_summary: {
                    type: "string",
                    description: "A brief summary of what the AI assistant recommended or explained.",
                  },
                  tag: {
                    type: "string",
                    description: "A specific 2-4 word tag describing the visitor's intent, e.g. 'Website Development', 'Hiring Inquiry', 'Automation Consulting', 'Project Inquiry'. Return null if unclear.",
                  },
                },
                required: ["summary", "ai_response_summary"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_lead_info" } },
      }),
    });

    let summary = "";
    let aiResponseSummary = "";
    let extractedName = contactInfo?.name || null;
    let extractedEmail = contactInfo?.email || null;
    let extractedPhone = contactInfo?.phone || null;
    let tag: string | null = null;

    if (aiResp.ok) {
      const aiData = await aiResp.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      
      if (toolCall?.function?.arguments) {
        try {
          const parsed = JSON.parse(toolCall.function.arguments);
          summary = parsed.summary || "";
          aiResponseSummary = parsed.ai_response_summary || "";
          // Only override if AI found something and we don't already have it from contactInfo
          if (parsed.extracted_name && !extractedName) extractedName = parsed.extracted_name;
          if (parsed.extracted_email && !extractedEmail) extractedEmail = parsed.extracted_email;
          if (parsed.extracted_phone && !extractedPhone) extractedPhone = parsed.extracted_phone;
          if (parsed.tag) tag = parsed.tag;
        } catch (e) {
          console.error("Failed to parse tool call arguments:", e);
          // Fallback: try content field
          const content = aiData.choices?.[0]?.message?.content || "";
          summary = content.slice(0, 500);
        }
      } else {
        // Fallback to content if no tool call
        const content = aiData.choices?.[0]?.message?.content || "";
        try {
          const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          const parsed = JSON.parse(cleaned);
          summary = parsed.summary || "";
          aiResponseSummary = parsed.ai_response_summary || "";
          if (parsed.extracted_name && !extractedName) extractedName = parsed.extracted_name;
          if (parsed.extracted_email && !extractedEmail) extractedEmail = parsed.extracted_email;
          if (parsed.extracted_phone && !extractedPhone) extractedPhone = parsed.extracted_phone;
          if (parsed.tag) tag = parsed.tag;
        } catch {
          summary = content.slice(0, 500);
        }
      }
    }

    console.log("Extracted lead:", { extractedName, extractedEmail, extractedPhone, tag });

    // Save to database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await supabase.from("chat_leads").insert({
      name: extractedName,
      email: extractedEmail,
      phone: extractedPhone,
      summary,
      ai_response_summary: aiResponseSummary,
      full_conversation: messages,
      tag,
    });

    if (error) {
      console.error("DB insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to save lead" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send thank-you email to visitor if they provided an email
    if (extractedEmail && RESEND_API_KEY) {
      const visitorName = extractedName || "there";
      try {
        const emailResp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Sriram Parthiban <onboarding@resend.dev>",
            to: [extractedEmail],
            reply_to: "sriramparthiban1970@gmail.com",
            subject: "Thanks for visiting! — Sriram Parthiban",
            html: `
              <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#ffffff;">
                <h2 style="color:#7c3aed;margin-bottom:16px;">Hey ${visitorName}! 👋</h2>
                <p style="color:#333;line-height:1.7;font-size:15px;">
                  Thanks for chatting with my AI assistant on my portfolio! I really appreciate you taking the time to check out my work.
                </p>
                <p style="color:#333;line-height:1.7;font-size:15px;">
                  I've been notified about your visit and will personally review our conversation. If you had any questions or are interested in working together, I'll get back to you soon!
                </p>
                <p style="color:#333;line-height:1.7;font-size:15px;">
                  In the meantime, feel free to:
                </p>
                <ul style="color:#333;line-height:2;font-size:15px;">
                  <li>📅 <a href="https://calendly.com/sriramparthiban1970/30min" style="color:#7c3aed;">Book a quick call</a> to discuss your project</li>
                  <li>💼 <a href="https://linkedin.com/in/sriram-parthiban-0500q" style="color:#7c3aed;">Connect on LinkedIn</a></li>
                  <li>📧 Reply to this email directly</li>
                </ul>
                <p style="color:#333;line-height:1.7;font-size:15px;">
                  Looking forward to connecting!
                </p>
                <p style="color:#6b7280;font-size:14px;margin-top:24px;">
                  — Sriram Parthiban<br/>
                  <span style="color:#9ca3af;">AI Automation Specialist</span>
                </p>
              </div>
            `,
          }),
        });

        const emailData = await emailResp.json();
        if (!emailResp.ok) {
          console.error("Failed to send thank-you email:", emailData);
        } else {
          console.log("Thank-you email sent to:", extractedEmail);
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    // Also notify Sriram about the new lead via email
    if (RESEND_API_KEY && (extractedName || extractedEmail)) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Chat <onboarding@resend.dev>",
            to: ["sriramparthiban1970@gmail.com"],
            reply_to: extractedEmail || undefined,
            subject: `💬 New Chat Lead: ${extractedName || "Anonymous"} ${tag ? `— ${tag}` : ""}`,
            html: `
              <div style="font-family:system-ui;max-width:600px;margin:0 auto;padding:24px;">
                <h2 style="color:#7c3aed;">New Chat Lead</h2>
                <hr style="border:1px solid #e5e7eb;" />
                <p><strong>Name:</strong> ${extractedName || "Not provided"}</p>
                <p><strong>Email:</strong> ${extractedEmail || "Not provided"}</p>
                <p><strong>Phone:</strong> ${extractedPhone || "Not provided"}</p>
                <p><strong>Tag:</strong> ${tag || "N/A"}</p>
                <hr style="border:1px solid #e5e7eb;" />
                <p><strong>Summary:</strong></p>
                <p>${summary}</p>
                <p><strong>AI Response:</strong></p>
                <p>${aiResponseSummary}</p>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error("Failed to notify Sriram:", e);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("save-lead error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
