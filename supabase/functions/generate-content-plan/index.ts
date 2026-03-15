import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a content strategist who writes like a real human creator — someone who builds things and shares what they learn. You help transform a post idea into a structured content plan.

CRITICAL RULES:
- Every piece of text you generate MUST sound 100% human-written.
- NEVER use generic AI phrases like "In today's fast-paced world", "As technology evolves", "Let's dive in", "Here's the thing", "Game-changer", "Unlock the power of", "Leverage", "Harness".
- Write like a real person sharing something they genuinely experienced or learned.
- Be specific, authentic, and personal. Use casual but professional tone.
- Avoid buzzwords and corporate speak.

You will receive a JSON object with:
- postIdea (required): The main content idea
- platform (optional): Target social media platform
- tone (optional): Desired content tone
- notes (optional): Additional context

You MUST respond with a valid JSON object (no markdown, no code blocks) with these fields:
{
  "subject": "An attention-grabbing subject/hook line (1 sentence, must feel like a real person wrote it)",
  "contentAngle": "2-3 sentences explaining what the post is about, why it matters, and what value the audience gets",
  "content": "A single, well-written piece of content around 150 words. This should be ready-to-post quality — friendly, professional, and engaging. Match the tone if specified. Write it as if you're sharing something real with your audience.",
  "keywords": ["keyword1", "keyword2", ...up to 15],
  "hashtags": ["#hashtag1", "#hashtag2", ...10-15 hashtags],
  "hook": "Opening line that grabs attention",
  "mainIdea": "Core message in 1-2 sentences",
  "keyInsight": "The unique takeaway or lesson",
  "callToAction": "What you want the audience to do"
}

The "content" field is the main output — a single polished piece of content (~150 words). Make it feel real, like someone sharing their work, not marketing copy.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postIdea, platform, tone, notes } = await req.json();

    if (!postIdea || !postIdea.trim()) {
      return new Response(JSON.stringify({ error: "Post idea is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = JSON.stringify({
      postIdea,
      ...(platform && { platform }),
      ...(tone && { tone }),
      ...(notes && { notes }),
    });

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.85,
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || "";

    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    try {
      const parsed = JSON.parse(cleaned);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      console.error("Failed to parse AI response as JSON:", cleaned);
      return new Response(JSON.stringify({ error: "Failed to generate content plan. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("generate-content-plan error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
