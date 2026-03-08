import { ReactNode } from "react";
import {
  StickyNote, CalloutBox, StatsCard, ProConList,
  NumberHighlight, StepCard, SectionDivider,
} from "@/components/blog/BlogComponents";

type BlogSection = {
  slug: string;
  content: ReactNode;
};

/* ───────────── BLOG 1: n8n ───────────── */
const N8nContent = () => (
  <div className="space-y-2">
    <h2>The Automation Landscape Is Shifting</h2>
    <p>
      Most businesses start with <strong>Zapier</strong> or <strong>Make</strong> — they're easy, visual, 
      and get you automated in minutes. But as operations scale, cracks appear fast.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
      {["Rate limits", "Limited logic", "Expensive pricing", "Zero data control"].map((issue) => (
        <div key={issue} className="bg-[hsl(0,30%,14%)] border border-[hsl(0,30%,25%)] rounded-xl p-5 text-center">
          <span className="text-red-400 text-2xl">✕</span>
          <p className="text-sm text-white/70 mt-2 font-medium">{issue}</p>
        </div>
      ))}
    </div>

    <StickyNote color="purple" rotate={-1}>
      <strong>💡 That's where n8n changes the game.</strong> An open-source, self-hostable workflow engine 
      built for teams who've outgrown the basics.
    </StickyNote>

    <SectionDivider />

    <h2>What Makes n8n Different?</h2>

    <div className="space-y-6 my-8">
      <StepCard number={1} title="Self-Hosted, Full Control" description="Your customer data never leaves your servers. Non-negotiable for healthcare, finance, and enterprise." />
      <StepCard number={2} title="Complex Branching & Error Handling" description="IF/ELSE branches, switch nodes, error workflows, sub-workflows — all native. Handle 15+ scenarios in one pipeline." />
      <StepCard number={3} title="Code When You Need It" description="Drop in JavaScript or Python at any node. Transform payloads, run regex, call custom APIs — 5 lines, done." />
      <StepCard number={4} title="Cost Efficiency at Scale" description="Zapier charges $400+/month for 50K tasks. n8n self-hosted? Free. Even their cloud is a fraction of the cost." />
    </div>

    <h3>Pricing Comparison</h3>
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border border-[hsl(270,15%,18%)] rounded-xl overflow-hidden">
        <thead className="bg-[hsl(270,15%,14%)]">
          <tr>
            <th className="text-left py-3 px-4 text-foreground font-semibold border-b border-[hsl(270,15%,20%)]">Platform</th>
            <th className="text-left py-3 px-4 text-foreground font-semibold border-b border-[hsl(270,15%,20%)]">50K tasks/mo</th>
            <th className="text-left py-3 px-4 text-foreground font-semibold border-b border-[hsl(270,15%,20%)]">Self-hosted?</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[hsl(270,15%,15%)]">
            <td className="py-3 px-4 text-muted-foreground">Zapier</td>
            <td className="py-3 px-4 text-red-400">~$400+/mo</td>
            <td className="py-3 px-4 text-red-400">❌</td>
          </tr>
          <tr className="border-b border-[hsl(270,15%,15%)]">
            <td className="py-3 px-4 text-muted-foreground">Make</td>
            <td className="py-3 px-4 text-red-400">~$200+/mo</td>
            <td className="py-3 px-4 text-red-400">❌</td>
          </tr>
          <tr>
            <td className="py-3 px-4 text-foreground font-medium">n8n</td>
            <td className="py-3 px-4 text-[hsl(145,60%,50%)] font-bold">$0</td>
            <td className="py-3 px-4 text-[hsl(145,60%,50%)]">✅</td>
          </tr>
        </tbody>
      </table>
    </div>

    <SectionDivider />

    <h2>Real-World: Multi-Channel Lead Pipeline</h2>
    <p>I built this for a dental marketing agency — <strong>3,000+ leads/month</strong> on a single n8n instance:</p>

    <div className="space-y-4 my-8">
      <StepCard number={1} title="📥 Capture" description="Facebook Ads, Google Ads, and website forms — all via webhooks into one pipeline." />
      <StepCard number={2} title="🔍 Enrich" description="Clearbit + custom API lookups to fill in company, location, and budget data." />
      <StepCard number={3} title="🔀 Route" description="Smart routing based on location, service interest, and lead score to different GHL pipelines." />
      <StepCard number={4} title="📲 Nurture" description="SMS within 2 min, email within 10, voicemail drop within 30. All automated." />
      <StepCard number={5} title="📊 Track" description="Push conversion events to a PostgreSQL-powered KPI dashboard in real-time." />
    </div>

    <div className="flex justify-center my-8">
      <NumberHighlight number="99.8%" label="Uptime on a single instance" color="green" />
    </div>

    <SectionDivider />

    <h2>Should You Switch?</h2>

    <ProConList
      pros={[
        "You're hitting rate limits on Zapier/Make",
        "Need conditional logic beyond simple filters",
        "Data must stay on-premise or region-locked",
        "Want version-controlled workflows (Git support!)",
        "Need webhook-driven, real-time processing",
      ]}
      cons={[
        "You have < 1,000 tasks/month (Zapier is fine)",
        "Workflows are simple A → B chains",
        "You don't need custom code at all",
        "No technical team to manage self-hosting",
      ]}
    />

    <SectionDivider />

    <h2>Getting Started</h2>

    <CalloutBox emoji="🚀" title="Quick Start Path" variant="tip">
      <ol className="list-decimal list-inside space-y-1.5 mt-2">
        <li>Spin up n8n on <strong>Railway</strong> or <strong>Docker</strong></li>
        <li>Connect to your existing tools via API keys</li>
        <li>Replace your most expensive Zapier workflows first</li>
        <li>See ROI within the <strong>first week</strong></li>
      </ol>
    </CalloutBox>

    <StickyNote color="green" rotate={0.5}>
      <strong>Automation isn't about replacing people — it's about giving them superpowers.</strong> n8n is the tool that makes that possible at scale.
    </StickyNote>
  </div>
);

/* ───────────── BLOG 2: KPI Dashboards ───────────── */
const KPIDashboardContent = () => (
  <div className="space-y-0">
    <h2>The Dashboard Problem</h2>

    <div className="flex justify-center my-8">
      <NumberHighlight number="80%" label="of dashboards abandoned within 90 days" color="amber" />
    </div>

    <p>
      Not because the data is wrong — but because they answer <strong>questions nobody is asking.</strong>
    </p>

    <StickyNote color="yellow" rotate={-0.5}>
      I've built KPI systems for marketing agencies, SaaS companies, and service businesses. 
      The ones that <strong>stick</strong> all share the same principles.
    </StickyNote>

    <SectionDivider />

    <h2>Principle 1: Decision-First Design</h2>
    <p>Before writing a single SQL query, ask: <strong>"What decision will this metric change?"</strong></p>

    <div className="grid sm:grid-cols-2 gap-4 my-8">
      <div className="bg-[hsl(0,30%,12%)] border border-[hsl(0,30%,22%)] rounded-xl p-5">
        <p className="text-red-400 text-xs font-bold mb-2">❌ BAD</p>
        <p className="text-sm text-foreground/70">"Let's track website traffic"</p>
        <p className="text-[11px] text-muted-foreground mt-1 italic">So what? What do you DO with that number?</p>
      </div>
      <div className="bg-[hsl(145,25%,12%)] border border-[hsl(145,30%,22%)] rounded-xl p-5">
        <p className="text-[hsl(145,60%,50%)] text-xs font-bold mb-2">✅ GOOD</p>
        <p className="text-sm text-foreground/70">"Track CPL by channel to shift ad budget weekly"</p>
        <p className="text-[11px] text-muted-foreground mt-1 italic">Clear decision → clear action</p>
      </div>
    </div>

    <CalloutBox emoji="📝" title="The Golden Rule" variant="info">
      Every metric on your dashboard should map to a <strong>specific action</strong> someone can take. 
      If it doesn't drive a decision, it's decoration.
    </CalloutBox>

    <SectionDivider />

    <h2>Principle 2: The Pipeline IS the Product</h2>
    <p>A beautiful dashboard means nothing if the data is stale, duplicated, or wrong.</p>

    <div className="bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-xl p-6 my-8">
      <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">My Standard Architecture</p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {["Source (API/Webhook)", "→", "n8n (Transform)", "→", "PostgreSQL (Store)", "→", "Looker/Power BI"].map((part, i) => (
          part === "→" ? (
            <span key={i} className="text-primary text-lg">→</span>
          ) : (
            <span key={i} className="bg-[hsl(270,20%,15%)] border border-[hsl(270,25%,22%)] rounded-lg px-3 py-1.5 text-foreground/80">
              {part}
            </span>
          )
        ))}
      </div>
    </div>

    <div className="grid sm:grid-cols-2 gap-4 my-8">
      <div className="bg-[hsl(210,30%,10%)] border border-[hsl(210,30%,20%)] rounded-xl p-5">
        <p className="text-[hsl(210,70%,60%)] font-semibold text-sm mb-3">🐘 Why PostgreSQL?</p>
        <ul className="space-y-2 text-sm text-foreground/70">
          <li>✅ Complex joins for multi-source data</li>
          <li>✅ Materialized views for pre-computed KPIs</li>
          <li>✅ Scales to <strong>millions of rows</strong></li>
          <li>✅ Free and open-source</li>
        </ul>
      </div>
      <div className="bg-[hsl(25,30%,10%)] border border-[hsl(25,30%,20%)] rounded-xl p-5">
        <p className="text-[hsl(25,80%,60%)] font-semibold text-sm mb-3">⚙️ Why n8n for ETL?</p>
        <ul className="space-y-2 text-sm text-foreground/70">
          <li>✅ Scheduled pulls from APIs</li>
          <li>✅ Real-time webhook ingestion</li>
          <li>✅ Built-in error handling</li>
          <li>✅ Visual pipeline monitoring</li>
        </ul>
      </div>
    </div>

    <SectionDivider />

    <h2>Principle 3: The 5-Metric Rule</h2>

    <StickyNote color="pink" rotate={0.5}>
      <strong>🚨 No dashboard should have more than 5 primary KPIs visible at once.</strong> 
      Everything else is a drill-down. If you can't fit it on one screen, you're tracking too much.
    </StickyNote>

    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-8">
      {[
        { label: "Cost Per Lead", desc: "Spending efficiently?" },
        { label: "Speed to Lead", desc: "Responding fast?" },
        { label: "Booking Rate", desc: "Converting?" },
        { label: "Show Rate", desc: "Showing up?" },
        { label: "Revenue/Lead", desc: "True ROI?" },
      ].map((m) => (
        <div key={m.label} className="bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-lg p-3 text-center">
          <p className="text-primary text-xs font-bold">{m.label}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{m.desc}</p>
        </div>
      ))}
    </div>

    <SectionDivider />

    <h2>Principle 4: Automate the Alerts</h2>

    <CalloutBox emoji="💡" title="The best dashboard is one you don't have to look at." variant="tip">
      Set up automated alerts that <strong>push</strong> insights to you instead of waiting for you to check.
    </CalloutBox>

    <div className="space-y-3 my-8">
      {[
        { trigger: "CPL spikes above threshold", action: "Slack notification → ad manager", icon: "📈" },
        { trigger: "Booking rate drops below 20%", action: "Email → sales team lead", icon: "📉" },
        { trigger: "Pipeline crosses monthly target", action: "Celebration message → team", icon: "🎉" },
      ].map((alert) => (
        <div key={alert.trigger} className="flex items-center gap-4 bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-xl p-4">
          <span className="text-2xl flex-shrink-0">{alert.icon}</span>
          <div>
            <p className="text-sm text-foreground font-medium">{alert.trigger}</p>
            <p className="text-xs text-primary mt-0.5">{alert.action}</p>
          </div>
        </div>
      ))}
    </div>

    <SectionDivider />

    <h2>The Business Impact</h2>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
      <StatsCard label="Reporting" before="6 hrs/week" after="Real-time" />
      <StatsCard label="Time Saved" before="0" after="24 hrs/mo" change="+100%" />
      <StatsCard label="Ad Waste Found" before="Hidden" after="$3K/mo" change="Week 1" />
      <StatsCard label="Speed to Lead" before="45 min" after="3 min" change="93% faster" />
    </div>

    <StickyNote color="blue" rotate={-0.5}>
      <strong>You don't need enterprise tools.</strong> PostgreSQL + n8n + Looker Studio (free) can power dashboards 
      that rival anything built with six-figure BI platforms. The secret isn't the tool — it's the thinking behind what you measure.
    </StickyNote>
  </div>
);

/* ───────────── BLOG 3: GHL Playbook ───────────── */
const GHLPlaybookContent = () => (
  <div className="space-y-0">
    <h2>Why Most GHL Setups Underperform</h2>
    <p>
      GoHighLevel is incredibly powerful — but most agencies use about <strong>20%</strong> of its capabilities.
    </p>

    <StickyNote color="orange" rotate={-0.5}>
      They set up a basic pipeline, maybe a follow-up email, and call it "automated." 
      <strong> Real automation means the system thinks for you.</strong>
    </StickyNote>

    <SectionDivider />

    <h2>The Speed-to-Lead Framework</h2>

    <div className="grid sm:grid-cols-2 gap-4 my-8">
      <div className="flex flex-col items-center justify-center bg-[hsl(0,40%,12%)] border border-[hsl(0,30%,22%)] rounded-xl p-6">
        <p className="text-3xl font-bold text-red-400">47 hrs</p>
        <p className="text-xs text-muted-foreground mt-1">Average response time</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-[hsl(145,30%,12%)] border border-[hsl(145,30%,22%)] rounded-xl p-6">
        <p className="text-3xl font-bold text-[hsl(145,60%,50%)]">5 min</p>
        <p className="text-xs text-muted-foreground mt-1">= 21x more likely to qualify</p>
      </div>
    </div>

    <h3>My 3-Touch Sequence (Under 10 Min)</h3>

    <div className="space-y-4 my-8">
      <div className="bg-[hsl(145,25%,10%)] border border-[hsl(145,30%,20%)] rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg">✉️</span>
          <p className="font-semibold text-foreground text-sm">Touch 1 — Instant SMS (0-2 min)</p>
        </div>
        <div className="bg-[hsl(145,15%,8%)] rounded-lg p-3 text-sm text-foreground/70 italic border border-[hsl(145,20%,15%)]">
          "Hey {'{{'}first_name{'}}'},  thanks for reaching out about {'{{'}service{'}}'}! I'm {'{{'}agent_name{'}}'} — when's a good time to chat today?"
        </div>
      </div>

      <div className="bg-[hsl(210,25%,10%)] border border-[hsl(210,30%,20%)] rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg">📞</span>
          <p className="font-semibold text-foreground text-sm">Touch 2 — Voicemail Drop (2-5 min)</p>
        </div>
        <p className="text-sm text-foreground/70">Only if no reply to SMS. Pre-recorded personal message — feels human, is automated.</p>
      </div>

      <div className="bg-[hsl(270,25%,10%)] border border-[hsl(270,30%,20%)] rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg">📧</span>
          <p className="font-semibold text-foreground text-sm">Touch 3 — Email with Value (5-10 min)</p>
        </div>
        <p className="text-sm text-foreground/70">Case study or relevant resource. Subject: <em>"{'{{'}first_name{'}}'}, here's how we helped [similar business]"</em></p>
      </div>
    </div>

    <div className="flex justify-center my-8">
      <NumberHighlight number="35-45%" label="Response rate with this sequence" color="green" />
    </div>

    <SectionDivider />

    <h2>Pipeline Stage Automation</h2>

    <div className="space-y-4 my-8">
      {[
        {
          stage: "📥 New Lead",
          color: "bg-[hsl(210,25%,10%)] border-[hsl(210,30%,22%)]",
          actions: ["Assign to round-robin sales rep", "Trigger speed-to-lead sequence", "Create manual follow-up task for Day 2"],
        },
        {
          stage: "📅 Appointment Booked",
          color: "bg-[hsl(145,20%,10%)] border-[hsl(145,30%,20%)]",
          actions: ["Send confirmation SMS + email + calendar link", "Trigger reminder sequence (24h → 2h → 15min)", "Notify assigned rep via Slack"],
        },
        {
          stage: "😞 No Show",
          color: "bg-[hsl(35,30%,10%)] border-[hsl(35,35%,22%)]",
          actions: ["Re-engagement SMS with reschedule option", "24h wait → move to nurture campaign", "Track no-show rate in KPI dashboard"],
        },
        {
          stage: "🎉 Won",
          color: "bg-[hsl(270,20%,10%)] border-[hsl(270,25%,20%)]",
          actions: ["Trigger onboarding workflow", "Create project in Monday.com", "Update revenue tracking in PostgreSQL"],
        },
      ].map((s) => (
        <div key={s.stage} className={`${s.color} border rounded-xl p-5`}>
          <p className="font-semibold text-foreground text-sm mb-3">{s.stage}</p>
          <ul className="space-y-1.5">
            {s.actions.map((a, i) => (
              <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span> {a}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <SectionDivider />

    <h2>Conditional Branching</h2>

    <CalloutBox emoji="🧩" title="Not all leads are equal" variant="info">
      Personalize messaging based on where the lead came from. Facebook leads get casual, short-form content. 
      Google leads get professional, detail-oriented messaging.
    </CalloutBox>

    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border border-[hsl(270,15%,18%)] rounded-xl overflow-hidden">
        <thead className="bg-[hsl(270,15%,14%)]">
          <tr>
            <th className="text-left py-3 px-4 text-foreground font-semibold border-b border-[hsl(270,15%,20%)]">Source</th>
            <th className="text-left py-3 px-4 text-foreground font-semibold border-b border-[hsl(270,15%,20%)]">Style</th>
            <th className="text-left py-3 px-4 text-foreground font-semibold border-b border-[hsl(270,15%,20%)]">Include</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[hsl(270,15%,15%)]"><td className="py-3 px-4 text-muted-foreground">Facebook</td><td className="py-3 px-4 text-foreground/70">Casual, short-form</td><td className="py-3 px-4 text-foreground/70">Video testimonial</td></tr>
          <tr className="border-b border-[hsl(270,15%,15%)]"><td className="py-3 px-4 text-muted-foreground">Google</td><td className="py-3 px-4 text-foreground/70">Professional, detailed</td><td className="py-3 px-4 text-foreground/70">Case study PDF</td></tr>
          <tr className="border-b border-[hsl(270,15%,15%)]"><td className="py-3 px-4 text-muted-foreground">Referral</td><td className="py-3 px-4 text-foreground/70">Warm, personal</td><td className="py-3 px-4 text-foreground/70">Mutual connection</td></tr>
          <tr><td className="py-3 px-4 text-muted-foreground">Other</td><td className="py-3 px-4 text-foreground/70">Standard nurture</td><td className="py-3 px-4 text-foreground/70">General value</td></tr>
        </tbody>
      </table>
    </div>

    <SectionDivider />

    <h2>The Numbers Don't Lie</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">
      <StatsCard label="Speed to Lead" before="4+ hrs" after="< 3 min" change="98% faster" />
      <StatsCard label="Contact Rate" before="15%" after="45%" change="3x better" />
      <StatsCard label="Booking Rate" before="8%" after="22%" change="2.75x" />
      <StatsCard label="Show Rate" before="60%" after="82%" change="+22 pts" />
      <StatsCard label="Close Rate" before="12%" after="28%" change="2.3x" />
    </div>

    <StickyNote color="green" rotate={0.5}>
      <strong>GHL automation isn't about sending more messages</strong> — it's about sending the 
      <em> right message at the right time.</em> Build workflows that respond to behavior, 
      personalize based on data, and track everything.
    </StickyNote>
  </div>
);

/* ───────────── BLOG 4: AI Lead Qualification ───────────── */
const AILeadQualContent = () => (
  <div className="space-y-0">
    <h2>The Problem With Manual Qualification</h2>

    <div className="flex justify-center my-8">
      <NumberHighlight number="67%" label="of sales time wasted on bad leads" color="amber" />
    </div>

    <div className="grid grid-cols-3 gap-3 my-8">
      {[
        { icon: "🐌", label: "Slow", desc: "Hours to research each lead" },
        { icon: "🎲", label: "Inconsistent", desc: "Depends on who's reviewing" },
        { icon: "📉", label: "Unscalable", desc: "Breaks at 100+ leads/week" },
      ].map((item) => (
        <div key={item.label} className="bg-[hsl(0,25%,10%)] border border-[hsl(0,30%,20%)] rounded-xl p-4 text-center">
          <span className="text-2xl">{item.icon}</span>
          <p className="text-sm font-semibold text-foreground mt-2">{item.label}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{item.desc}</p>
        </div>
      ))}
    </div>

    <StickyNote color="purple" rotate={-0.5}>
      <strong>💡 What if your system could instantly say:</strong> "This is a hot prospect — call them NOW"? 
      That's exactly what I built.
    </StickyNote>

    <SectionDivider />

    <h2>The Architecture</h2>

    <div className="bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-xl p-6 my-8">
      <div className="flex flex-col items-center gap-2 text-sm">
        {[
          "📥 Incoming Lead (Webhook)",
          "⚙️ n8n Workflow",
          "🧠 AI Analysis (LLM API)",
          "🏷️ Score + Categorize",
          "🔀 Route to Pipeline Stage",
          "🚀 Trigger Sequence",
        ].map((step, i, arr) => (
          <div key={step} className="flex flex-col items-center">
            <span className="bg-[hsl(270,20%,15%)] border border-[hsl(270,25%,22%)] rounded-lg px-4 py-2 text-foreground/80">{step}</span>
            {i < arr.length - 1 && <span className="text-primary text-lg my-1">↓</span>}
          </div>
        ))}
      </div>
    </div>

    <SectionDivider />

    <h2>Step 1: Capture Everything</h2>
    <p>Not just name and email — I capture signals that predict intent:</p>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">
      {[
        { icon: "🌐", label: "Source", desc: "Where they came from" },
        { icon: "🖱️", label: "Behavior", desc: "Pages visited, time spent" },
        { icon: "📋", label: "Form Data", desc: "What they asked about" },
        { icon: "⏰", label: "Timing", desc: "Business hours = high intent" },
        { icon: "📱", label: "Device", desc: "Mobile ad ≠ desktop research" },
      ].map((s) => (
        <div key={s.label} className="bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-lg p-3">
          <span className="text-lg">{s.icon}</span>
          <p className="text-sm font-medium text-foreground mt-1">{s.label}</p>
          <p className="text-[11px] text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </div>

    <SectionDivider />

    <h2>Step 2: AI-Powered Scoring</h2>

    <CalloutBox emoji="🧠" title="The AI returns structured intelligence" variant="tip">
      <div className="bg-[hsl(270,10%,8%)] rounded-lg p-3 mt-2 text-xs font-mono border border-white/[0.06]">
        <p className="text-primary">{'{'}</p>
        <p className="ml-3 text-foreground/60">"score": <span className="text-[hsl(145,60%,50%)]">1-100</span>,</p>
        <p className="ml-3 text-foreground/60">"category": <span className="text-[hsl(35,80%,55%)]">"hot | warm | cold"</span>,</p>
        <p className="ml-3 text-foreground/60">"reasoning": <span className="text-[hsl(210,60%,60%)]">"brief explanation"</span>,</p>
        <p className="ml-3 text-foreground/60">"recommended_action": <span className="text-[hsl(270,60%,65%)]">"what to do"</span></p>
        <p className="text-primary">{'}'}</p>
      </div>
    </CalloutBox>

    <StickyNote color="yellow" rotate={0.5}>
      The AI catches patterns humans miss — like the correlation between <strong>specific word choices</strong> in form 
      submissions and actual close rates. After 3 months: <strong>87% accuracy.</strong>
    </StickyNote>

    <SectionDivider />

    <h2>Step 3: Intelligent Routing</h2>

    <div className="space-y-3 my-8">
      {[
        { range: "80-100", label: "🔥 Hot", color: "bg-[hsl(0,40%,12%)] border-[hsl(0,40%,25%)]", action: "Instant alert to senior rep + speed-to-lead + calendar link in first SMS" },
        { range: "50-79", label: "🟡 Warm", color: "bg-[hsl(45,35%,12%)] border-[hsl(45,40%,22%)]", action: "Standard nurture sequence + follow-up task within 4 hours" },
        { range: "20-49", label: "🔵 Cold", color: "bg-[hsl(210,30%,12%)] border-[hsl(210,35%,22%)]", action: "Long-term nurture campaign — weekly value emails for 90 days" },
        { range: "0-19", label: "⚪ Unqualified", color: "bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)]", action: "Tag and archive — zero sales resources wasted" },
      ].map((tier) => (
        <div key={tier.range} className={`${tier.color} border rounded-xl p-4 flex items-start gap-4`}>
          <div className="text-center flex-shrink-0 w-16">
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="text-lg font-bold text-foreground">{tier.range}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{tier.label}</p>
            <p className="text-sm text-foreground/70 mt-0.5">{tier.action}</p>
          </div>
        </div>
      ))}
    </div>

    <SectionDivider />

    <h2>The Tech Stack</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">
      {[
        { tool: "n8n", role: "Workflow Engine", why: "Complex branching, self-hosted" },
        { tool: "GPT API", role: "AI Scoring", why: "Best for unstructured text" },
        { tool: "GoHighLevel", role: "CRM", why: "Pipeline + sequences" },
        { tool: "PostgreSQL", role: "Database", why: "Score tracking + analytics" },
        { tool: "Looker Studio", role: "Dashboard", why: "Real-time accuracy metrics" },
        { tool: "Slack + SMS", role: "Notifications", why: "Instant hot lead alerts" },
      ].map((t) => (
        <div key={t.tool} className="bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-xl p-4">
          <p className="text-primary font-bold text-sm">{t.tool}</p>
          <p className="text-xs text-foreground/80 mt-0.5">{t.role}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{t.why}</p>
        </div>
      ))}
    </div>

    <SectionDivider />

    <h2>Results</h2>
    <p>For a B2B SaaS client running <strong>$15K/month</strong> in ads:</p>

    <div className="grid grid-cols-2 gap-3 my-8">
      <StatsCard label="Sales Efficiency" before="Baseline" after="+340%" change="🚀" />
      <StatsCard label="Hot Lead Response" before="2+ hours" after="47 seconds" change="99% faster" />
      <StatsCard label="Close Rate" before="8%" after="23%" change="2.9x" />
      <StatsCard label="Revenue Impact" before="—" after="+$42K/mo" change="Same ad spend" />
    </div>

    <SectionDivider />

    <h2>Build Your Own</h2>

    <div className="space-y-4 my-8">
      <StepCard number={1} title="Set up n8n" description="Create a workflow triggered by your lead form webhook." />
      <StepCard number={2} title="Add AI scoring" description="Pass lead data to any LLM API with a scoring prompt." />
      <StepCard number={3} title="Map to CRM" description="Use the score to set a custom field in your pipeline." />
      <StepCard number={4} title="Automate routing" description="Create pipeline automations based on score ranges." />
      <StepCard number={5} title="Track & refine" description="Review accuracy weekly — the system gets smarter over time." />
    </div>

    <StickyNote color="green" rotate={-0.5}>
      <strong>The future of sales isn't more outreach — it's smarter outreach.</strong> AI qualification makes that possible today. 
      Start simple, see ROI in week one.
    </StickyNote>
  </div>
);

export const blogContentMap: Record<string, ReactNode> = {
  "why-n8n-is-the-future-of-workflow-automation": <N8nContent />,
  "building-kpi-dashboards-that-drive-decisions": <KPIDashboardContent />,
  "gohighlevel-automation-playbook": <GHLPlaybookContent />,
  "ai-powered-lead-qualification-system": <AILeadQualContent />,
};
