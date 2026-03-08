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

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    // Use AI to generate summary
    const summaryPrompt = `Analyze this conversation and return a JSON object with these fields:
- "summary": A 6-8 line summary of what the visitor wants, their needs, and intent (string)
- "ai_response_summary": A brief summary of what the AI assistant recommended or explained (string)
- "extracted_name": The visitor's name if mentioned, or null
- "extracted_email": The visitor's email if mentioned, or null
- "extracted_phone": The visitor's phone number if mentioned, or null
- "tag": A short custom tag (2-4 words max) describing the visitor's intent, e.g. "Website Development", "Hiring Inquiry", "Automation Consulting", "Data Analytics", "Partnership Proposal", "General Question", etc. Be specific to what they actually want. Return null if unclear.

Only extract info that was clearly provided. Return ONLY valid JSON, no markdown.

Conversation:
${messages.map((m: any) => `${m.role}: ${m.content}`).join("\n")}`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [{ role: "user", content: summaryPrompt }],
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
      const content = aiData.choices?.[0]?.message?.content || "";
      try {
        // Clean potential markdown wrapping
        const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);
        summary = parsed.summary || "";
        aiResponseSummary = parsed.ai_response_summary || "";
        if (parsed.extracted_name) extractedName = parsed.extracted_name;
        if (parsed.extracted_email) extractedEmail = parsed.extracted_email;
        if (parsed.extracted_phone) extractedPhone = parsed.extracted_phone;
      } catch {
        summary = content.slice(0, 500);
      }
    }

    // Save to database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await supabase.from("chat_leads").insert({
      name: extractedName,
      email: extractedEmail,
      phone: extractedPhone,
      summary,
      ai_response_summary: aiResponseSummary,
      full_conversation: messages,
    });

    if (error) {
      console.error("DB insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to save lead" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
