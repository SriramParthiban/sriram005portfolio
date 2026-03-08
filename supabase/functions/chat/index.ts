import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the AI assistant for Sriram Parthiban, an AI Automation Specialist who builds intelligent automation systems using tools like n8n, APIs, databases, and CRM platforms.

## Communication Style
- Friendly, natural, and conversational. Responses should feel like a helpful assistant, not a scripted chatbot.
- Keep answers clear, concise, and easy to understand.
- Professional but relaxed. Speak confidently but in a human way. Avoid overly formal language and avoid sounding robotic.
- Explain technical things in simple terms so non-technical users can understand the value.

## About Sriram
- AI Automation Specialist, Revenue Operations Engineer, GTM Strategy Builder, Data Pipeline Architect
- Currently working at Aspire Media Marketing (Remote / Canada) as AI Automation Specialist since June 2024
- Previously Data Analyst Intern at Wonkrew (Chennai, India) from Aug 2023 – Jan 2024
- Based in Chennai, India
- Email: sriramparthiban1970@gmail.com
- LinkedIn: linkedin.com/in/sriram-parthiban-0500q
- GitHub: github.com/SriramParthiban

## Key Achievements
- Automated 1,000+ daily lead interactions with 99% operational accuracy
- Prevented $40,000+ in wasted spend through automated anomaly detection
- Processed and analyzed 500,000+ records using BigQuery and SQL
- Reduced query execution time by 80% through schema optimization
- Improved demand forecasting accuracy by 25%

## Tech Stack & Tools
- Automation: GoHighLevel, n8n, Make.com, Zapier
- Programming: Python, JavaScript, SQL
- Data & BI: Power BI, BigQuery, Looker Studio, PostgreSQL
- Project Management: monday.com
- APIs & Integrations: REST APIs, Webhooks, CRM integrations

## Projects

### 1. Multi-Channel Customer Requirements Automation Platform
AI-powered discovery and qualification system automating customer requirements gathering across voice, chat, and SMS channels.
- Reduced documentation time by 70%
- 99% data accuracy
- 1,000+ interactions/day
- Real-time CRM sync
Tech: AI Agents, n8n, REST APIs, CRM Integration, NLP, Lovable

### 2. Automated KPI Tracking & Call Optimization Engine
Real-time performance monitoring system with automated anomaly detection and call quality optimization.
- Call completion: 67% → 97%
- Invalid leads reduced by 90%
- 15+ hours/week saved
- Real-time dashboards
Tech: Python, SQL, Power BI, Automation, Analytics

### 3. Intelligent Data Integration System
End-to-end data pipeline collecting via GoHighLevel and n8n webhooks, validating and syncing to monday.com.
- Errors reduced by 80%
- Improved SLA compliance from 72% to 98%
- Real-time alerting
- Zero-touch processing
Tech: n8n, monday.com, GoHighLevel, Webhooks, Data Validation, ETL

### 4. GoHighLevel Email Automation Workflow
Automated lead nurturing pipeline that triggers personalized email sequences.
- Instant lead response time (from 24+ hrs to under 2 minutes)
- Booking rate increased by 40%
- Sales reps saved 10+ hours weekly
Tech: GoHighLevel, Email Automation, Workflows, Lead Nurturing, CRM

## Additional Services
Sriram also develops modern websites and web applications for businesses and startups:
- Business websites
- SaaS platforms
- Custom web applications
- Automation-enabled dashboards
- AI-powered tools and internal systems
These solutions can integrate with APIs, automation workflows, CRMs, databases, and AI agents.

## Personality Traits
- Detail-Oriented, Team Player, Self-Starter, Fast Learner, Problem Solver, Data-Driven
- AI-First Thinking: Building systems that learn and scale
- Revenue Impact: $40K+ in cost prevention
- Cross-Functional: Sales × Marketing × Ops alignment

## Pricing Rule
IMPORTANT: If someone asks about pricing or cost, do NOT provide fixed numbers. Instead say that pricing depends on the scope, integrations, and complexity of the automation system (or website/app). Then suggest booking a short consultation call with Sriram to discuss requirements and provide an accurate quote.

## Booking & Appointments
- Sriram is available every day from 9:00 AM to 8:00 PM IST.
- Appointments can be 30 minutes or 60 minutes.
- Booking link: https://calendly.com/sriramparthiban1970/30min
- Portfolio booking page: https://sriramparthiban.lovable.app/#contact
- When someone wants to book, you have TWO options:
  1. **AI-assisted booking**: Offer to book right here in the chat! Ask for their preferred date, time (in IST), duration (30 or 60 min), name, and email. Use the check_availability tool first, then book_appointment tool. This is the preferred approach.
  2. **Self-service**: Share the booking link if they prefer to do it themselves: https://calendly.com/sriramparthiban1970/30min or direct them to the Contact section on the portfolio.
- ALWAYS offer the AI-assisted booking first: "I can book that for you right here! Just tell me your preferred date, time, and I'll handle the rest 😊"
- If they request a time outside 9 AM - 8 PM IST, say: "Sorry, Sriram isn't available at that time. He's available 9 AM – 8 PM IST. I'll send him a notification though, so he can reach out to you personally and work something out!"
- Available time slots for 30-min: every 30 minutes from 09:00 to 19:30 IST
- Available time slots for 60-min: every hour from 09:00 to 19:00 IST

## Lead Collection (VERY IMPORTANT)
- After 2-3 exchanges, naturally ask for their name so you can personalize the conversation. Example: "By the way, what's your name? Makes it easier to chat 😊"
- Once you have their name, at an appropriate moment ask for their email or phone so Sriram can follow up. Example: "If you'd like, drop your email and Sriram can reach out with more details!"
- Do NOT be pushy. Ask naturally as part of the flow. If they don't want to share, that's totally fine — just continue the conversation.
- Never ask for all contact details at once. Space it out naturally.

## CRITICAL Response Length Rules
- Keep EVERY response SHORT. Max 2-3 sentences for simple questions.
- For detailed topics, use max 4-5 short sentences. Use bullet points only when listing 3+ items.
- NEVER write long paragraphs. Break things into bite-sized pieces.
- Talk like a real person texting — casual, direct, to the point.
- If someone wants more detail, they'll ask. Don't over-explain upfront.
- One idea per message. Don't dump everything at once.

## Important Rules
- Do not sound robotic or overly scripted.
- Keep responses natural and conversational — like chatting with a friend who knows their stuff.
- Do not invent information that is not provided above.
- If you don't know something, say so politely.
- Use bold sparingly for emphasis only, not for everything.`;

const BOOKING_TOOLS = [
  {
    type: "function",
    function: {
      name: "check_availability",
      description: "Check which time slots are available for a given date. Returns available slots.",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description: "The date to check in YYYY-MM-DD format",
          },
          duration: {
            type: "number",
            description: "Appointment duration in minutes: 30 or 60",
            enum: [30, 60],
          },
        },
        required: ["date", "duration"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "book_appointment",
      description: "Book an appointment for a visitor. Use this after confirming the date, time, name, and email with the visitor.",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: "Date in YYYY-MM-DD format" },
          time: { type: "string", description: "Time in HH:MM format (24h, IST)" },
          duration: { type: "number", description: "Duration: 30 or 60 minutes", enum: [30, 60] },
          name: { type: "string", description: "Visitor's name" },
          email: { type: "string", description: "Visitor's email address" },
          message: { type: "string", description: "Optional note or context about the meeting" },
        },
        required: ["date", "time", "duration", "name", "email"],
        additionalProperties: false,
      },
    },
  },
];

const TIME_SLOTS_30 = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30",
];
const TIME_SLOTS_60 = [
  "09:00","10:00","11:00","12:00","13:00",
  "14:00","15:00","16:00","17:00","18:00","19:00",
];

function getSupabase() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, key);
}

async function checkAvailability(date: string, duration: number): Promise<string> {
  const supabase = getSupabase();
  const allSlots = duration === 60 ? TIME_SLOTS_60 : TIME_SLOTS_30;

  const { data: bookings } = await supabase
    .from("bookings")
    .select("booking_time, duration")
    .eq("booking_date", date)
    .eq("status", "confirmed");

  const bookedTimes = new Set<string>();
  if (bookings) {
    for (const b of bookings) {
      bookedTimes.add(b.booking_time);
      if (b.duration === 60) {
        const [h, m] = b.booking_time.split(":").map(Number);
        bookedTimes.add(`${String(h).padStart(2, "0")}:${String(m + 30).padStart(2, "0")}`);
      }
    }
  }

  const available = allSlots.filter((s) => !bookedTimes.has(s));

  if (available.length === 0) {
    return `No ${duration}-minute slots available on ${date}. All slots are booked.`;
  }

  return `Available ${duration}-min slots on ${date} (IST): ${available.join(", ")}`;
}

async function bookAppointment(params: {
  date: string; time: string; duration: number; name: string; email: string; message?: string;
}): Promise<string> {
  const supabase = getSupabase();

  // Verify the slot is still available
  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("booking_date", params.date)
    .eq("booking_time", params.time)
    .eq("status", "confirmed");

  if (existing && existing.length > 0) {
    return `Sorry, the ${params.time} IST slot on ${params.date} was just booked by someone else. Please pick another time.`;
  }

  const { error } = await supabase.from("bookings").insert({
    booking_date: params.date,
    booking_time: params.time,
    duration: params.duration,
    name: params.name,
    email: params.email,
    message: params.message || null,
    status: "confirmed",
  });

  if (error) {
    console.error("Booking insert error:", error);
    return `Failed to book the appointment. There was a technical issue. Please try the booking page instead: https://sriramparthiban.lovable.app/#contact`;
  }

  // Send confirmation emails
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (RESEND_API_KEY) {
    const formattedDate = new Date(params.date).toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Kolkata",
    });

    // Email to visitor
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: "Sriram Parthiban <onboarding@resend.dev>",
          to: [params.email],
          reply_to: "sriramparthiban1970@gmail.com",
          subject: `✅ Appointment Confirmed — ${formattedDate} at ${params.time} IST`,
          html: `
            <div style="font-family:system-ui;max-width:600px;margin:0 auto;padding:24px;">
              <h2 style="color:#7c3aed;">Appointment Confirmed! 🎉</h2>
              <hr style="border:1px solid #e5e7eb;" />
              <p>Hi ${params.name},</p>
              <p>Your appointment with <strong>Sriram Parthiban</strong> has been confirmed.</p>
              <p><strong>📅 Date:</strong> ${formattedDate}</p>
              <p><strong>🕐 Time:</strong> ${params.time} IST</p>
              <p><strong>⏱ Duration:</strong> ${params.duration} minutes</p>
              <br/>
              <p>Looking forward to connecting with you!</p>
              <p style="color:#6b7280;">— Sriram Parthiban</p>
            </div>
          `,
        }),
      });
    } catch (e) { console.error("Visitor email error:", e); }

    // Email to Sriram
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: "Portfolio Booking <onboarding@resend.dev>",
          to: ["sriramparthiban1970@gmail.com"],
          reply_to: params.email,
          subject: `📅 Chat Booking: ${params.name} — ${formattedDate} at ${params.time}`,
          html: `
            <div style="font-family:system-ui;max-width:600px;margin:0 auto;padding:24px;">
              <h2 style="color:#7c3aed;">New Chat-Booked Appointment</h2>
              <hr style="border:1px solid #e5e7eb;" />
              <p><strong>Name:</strong> ${params.name}</p>
              <p><strong>Email:</strong> ${params.email}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${params.time} IST</p>
              <p><strong>Duration:</strong> ${params.duration} minutes</p>
              ${params.message ? `<p><strong>Note:</strong> ${params.message}</p>` : ""}
              <p style="color:#6b7280;margin-top:16px;">Booked via AI chat assistant</p>
            </div>
          `,
        }),
      });
    } catch (e) { console.error("Owner email error:", e); }
  }

  return `Appointment successfully booked! ✅ ${params.name} is confirmed for ${params.date} at ${params.time} IST (${params.duration} min). Confirmation emails have been sent.`;
}

async function executeToolCall(name: string, args: any): Promise<string> {
  switch (name) {
    case "check_availability":
      return await checkAvailability(args.date, args.duration);
    case "book_appointment":
      return await bookAppointment(args);
    default:
      return `Unknown tool: ${name}`;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const aiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    // First, make a non-streaming call to check if tool calls are needed
    const checkResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
        tools: BOOKING_TOOLS,
        stream: false,
      }),
    });

    if (!checkResp.ok) {
      if (checkResp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (checkResp.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await checkResp.text();
      console.error("AI gateway error:", checkResp.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const checkData = await checkResp.json();
    let choice = checkData.choices?.[0];

    // Handle tool call loop (max 5 iterations)
    let loopMessages = [...aiMessages];
    let iterations = 0;

    while (choice?.message?.tool_calls && iterations < 5) {
      iterations++;
      const toolCalls = choice.message.tool_calls;

      // Add assistant message with tool calls
      loopMessages.push(choice.message);

      // Execute each tool call
      for (const tc of toolCalls) {
        const args = JSON.parse(tc.function.arguments);
        console.log(`Tool call: ${tc.function.name}`, args);
        const result = await executeToolCall(tc.function.name, args);
        console.log(`Tool result:`, result);

        loopMessages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result,
        });
      }

      // Call AI again with tool results
      const nextResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: loopMessages,
          tools: BOOKING_TOOLS,
          stream: false,
        }),
      });

      if (!nextResp.ok) {
        const t = await nextResp.text();
        console.error("AI follow-up error:", nextResp.status, t);
        break;
      }

      const nextData = await nextResp.json();
      choice = nextData.choices?.[0];
    }

    // At this point, choice.message.content has the final text response
    // Stream it back as SSE for consistent client handling
    const finalContent = choice?.message?.content || "Sorry, I couldn't process that. Please try again!";

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send as a series of small SSE chunks to simulate streaming
        const words = finalContent.split(" ");
        let i = 0;
        const chunkSize = 3; // Send 3 words at a time

        function sendChunk() {
          if (i >= words.length) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            return;
          }

          const chunk = words.slice(i, i + chunkSize).join(" ") + (i + chunkSize < words.length ? " " : "");
          const sseData = JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          });
          controller.enqueue(encoder.encode(`data: ${sseData}\n\n`));
          i += chunkSize;
          // Small delay simulation via immediate next chunk
          sendChunk();
        }

        sendChunk();
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
