import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, FileDown, Loader2, Hash, Quote, Target,
  Lightbulb, MessageSquareText, Type, Calendar, Globe, Mic,
  ChevronDown, ChevronUp, Trash2, Clock, History
} from "lucide-react";

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content-plan`;
const LEADS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-leads`;

const ADM = {
  surface: "hsl(220, 35%, 12%)",
  surfaceBorder: "hsl(220, 25%, 20%)",
  accent: "#FFA62B",
  cream: "#F8E6A0",
  midGreen: "#86C5FF",
  darkGreen: "#2E5AA7",
  mutedText: "hsl(46, 40%, 60%)",
  inputBg: "hsl(220, 30%, 9%)",
  inputBorder: "hsl(220, 22%, 22%)",
};

type ContentPlan = {
  subject: string;
  contentAngle: string;
  content: string;
  keywords: string[];
  hashtags: string[];
  hook: string;
  mainIdea: string;
  keyInsight: string;
  callToAction: string;
};

type SavedContentPlan = ContentPlan & {
  id: string;
  post_idea: string;
  platform: string | null;
  tone: string | null;
  posting_day: string | null;
  content_angle: string;
  main_idea: string;
  key_insight: string;
  call_to_action: string;
  notes: string | null;
  created_at: string;
};

const POSTING_OPTIONS = ["Today", "Tomorrow", "This Week", "Next Week", "Custom Date"] as const;
const PLATFORMS = ["Instagram", "LinkedIn", "Twitter/X", "YouTube", "Other"] as const;
const TONES = ["Professional", "Storytelling", "Educational", "Personal", "Motivational", "Technical"] as const;

const inputClass =
  "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
  + " bg-[hsl(220,30%,9%)] border border-[hsl(220,22%,22%)] text-[#F8E6A0] placeholder:text-[hsl(46,25%,40%)] focus:border-[#2E5AA7]";
const sectionCard = "bg-[hsl(220,35%,12%)] border border-[hsl(220,25%,20%)] rounded-xl p-5";

interface ContentPlannerProps {
  adminPassword: string;
}

const ContentPlanner = ({ adminPassword }: ContentPlannerProps) => {
  const [postIdea, setPostIdea] = useState("");
  const [postingDay, setPostingDay] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<ContentPlan | null>(null);

  const [history, setHistory] = useState<SavedContentPlan[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const resp = await fetch(LEADS_URL, {
        headers: { "x-admin-password": adminPassword },
      });
      const data = await resp.json();
      if (data.contentPlans) setHistory(data.contentPlans);
    } catch {} finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, [adminPassword]);

  const saveContentPlan = async (generated: ContentPlan) => {
    try {
      await fetch(LEADS_URL, {
        method: "POST",
        headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_content_plan",
          post_idea: postIdea.trim(),
          platform: platform || null,
          tone: tone || null,
          posting_day: getPostingDateLabel() || null,
          subject: generated.subject,
          content_angle: generated.contentAngle,
          content: generated.content,
          keywords: generated.keywords,
          hashtags: generated.hashtags,
          hook: generated.hook,
          main_idea: generated.mainIdea,
          key_insight: generated.keyInsight,
          call_to_action: generated.callToAction,
          notes: notes || null,
        }),
      });
      fetchHistory();
    } catch {}
  };

  const deleteContentPlan = async (id: string) => {
    if (!confirm("Delete this content plan?")) return;
    try {
      const resp = await fetch(LEADS_URL, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword, "Content-Type": "application/json" },
        body: JSON.stringify({ type: "content_plan", id }),
      });
      if (resp.ok) setHistory(history.filter((p) => p.id !== id));
    } catch {}
  };

  const handleGenerate = async () => {
    if (!postIdea.trim()) return;
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const resp = await fetch(GENERATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          postIdea: postIdea.trim(),
          ...(platform && { platform }),
          ...(tone && { tone }),
          ...(notes && { notes }),
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate content plan");
      }

      const data: ContentPlan = await resp.json();
      setPlan(data);
      saveContentPlan(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getPostingDateLabel = () => {
    if (!postingDay) return null;
    if (postingDay === "Custom Date") return customDate || null;
    return postingDay;
  };

  const handleDownloadPDF = () => {
    if (!plan) return;
    const postingLabel = getPostingDateLabel();

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Content Plan - ${postIdea.slice(0, 50)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a1a2e; padding: 50px; max-width: 850px; margin: 0 auto; line-height: 1.7; }
    .header { text-align: center; margin-bottom: 45px; padding-bottom: 28px; border-bottom: 3px solid #2E5AA7; }
    .header-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #2E5AA7; margin-bottom: 10px; }
    .header-title { font-size: 26px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
    .header-meta { font-size: 13px; color: #888; margin-top: 6px; }
    .header-meta span { display: inline-block; margin: 0 10px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #2E5AA7; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e0e8f0; }
    .subject-box { background: #f0f4fa; border-left: 4px solid #2E5AA7; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .subject-box p { font-size: 18px; font-weight: 700; color: #1a1a2e; font-style: italic; }
    .angle-text { font-size: 14px; color: #333; line-height: 1.8; background: #fafafa; padding: 16px 20px; border-radius: 8px; border: 1px solid #eee; }
    .content-block { background: #fafafa; border-radius: 8px; padding: 20px; margin-bottom: 12px; border: 1px solid #eee; }
    .content-text { font-size: 14px; color: #333; line-height: 1.8; white-space: pre-wrap; }
    .tag-container { display: flex; flex-wrap: wrap; gap: 8px; }
    .keyword-tag { background: #e0e8f0; color: #2E5AA7; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .hashtag-tag { background: #fff3e0; color: #c47a00; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .structure-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .structure-card { background: #fafafa; border-radius: 8px; padding: 16px; border: 1px solid #eee; }
    .structure-label { font-size: 11px; font-weight: 700; color: #2E5AA7; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .structure-text { font-size: 14px; color: #333; line-height: 1.6; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e0e8f0; text-align: center; }
    .footer-name { font-size: 16px; font-weight: 700; color: #2E5AA7; font-style: italic; font-family: Georgia, serif; }
    .footer-contact { font-size: 12px; color: #888; margin-top: 6px; }
    @media print { body { padding: 30px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-label">Content Plan</div>
    <div class="header-title">${postIdea}</div>
    <div class="header-meta">
      ${platform ? `<span>📱 ${platform}</span>` : ""}
      ${tone ? `<span>🎯 ${tone}</span>` : ""}
      ${postingLabel ? `<span>📅 ${postingLabel}</span>` : ""}
      <span>${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Generated Subject / Hook</div>
    <div class="subject-box"><p>${plan.subject}</p></div>
  </div>
  <div class="section">
    <div class="section-title">Content Angle</div>
    <div class="angle-text">${plan.contentAngle}</div>
  </div>
  <div class="section">
    <div class="section-title">Generated Content</div>
    <div class="content-block">
      <div class="content-text">${plan.content.replace(/\n/g, "<br/>")}</div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Keywords</div>
    <div class="tag-container">
      ${plan.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join("")}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Hashtags</div>
    <div class="tag-container">
      ${plan.hashtags.map(h => `<span class="hashtag-tag">${h}</span>`).join("")}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Content Structure</div>
    <div class="structure-grid">
      <div class="structure-card">
        <div class="structure-label">🪝 Hook</div>
        <div class="structure-text">${plan.hook}</div>
      </div>
      <div class="structure-card">
        <div class="structure-label">💡 Main Idea</div>
        <div class="structure-text">${plan.mainIdea}</div>
      </div>
      <div class="structure-card">
        <div class="structure-label">🔑 Key Insight</div>
        <div class="structure-text">${plan.keyInsight}</div>
      </div>
      <div class="structure-card">
        <div class="structure-label">📣 Call to Action</div>
        <div class="structure-text">${plan.callToAction}</div>
      </div>
    </div>
  </div>
  ${notes ? `
  <div class="section">
    <div class="section-title">Notes</div>
    <div class="angle-text">${notes.replace(/\n/g, "<br/>")}</div>
  </div>
  ` : ""}
  <div class="footer">
    <div class="footer-name">Sriram Parthiban</div>
    <div class="footer-contact">info@sriramparthiban.com • +91 93459 73779</div>
  </div>
</body>
</html>`);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  // Group history by date
  const groupedHistory = history.reduce<Record<string, SavedContentPlan[]>>((acc, plan) => {
    const date = new Date(plan.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    if (!acc[date]) acc[date] = [];
    acc[date].push(plan);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Post Idea (Required) */}
      <div className={sectionCard}>
        <div className="flex items-center gap-2 mb-3">
          <Type className="h-4 w-4" style={{ color: ADM.accent }} />
          <label className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>
            Post Idea / Title <span className="text-red-400">*</span>
          </label>
        </div>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          placeholder="e.g. How I automated my mom's portfolio dashboard using AI"
          value={postIdea}
          onChange={(e) => setPostIdea(e.target.value)}
        />
      </div>

      {/* Optional Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Posting Day */}
        <div className={sectionCard}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4" style={{ color: ADM.accent }} />
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>
              Posting Day
            </label>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {POSTING_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setPostingDay(postingDay === opt ? "" : opt)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                style={
                  postingDay === opt
                    ? { background: `${ADM.darkGreen}40`, color: ADM.accent, borderColor: `${ADM.darkGreen}80` }
                    : { background: "transparent", color: ADM.mutedText, borderColor: ADM.inputBorder }
                }
              >
                {opt}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {postingDay === "Custom Date" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <input
                  type="date"
                  className={inputClass + " mt-2"}
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Platform */}
        <div className={sectionCard}>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4" style={{ color: ADM.accent }} />
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>
              Platform
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(platform === p ? "" : p)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                style={
                  platform === p
                    ? { background: `${ADM.darkGreen}40`, color: ADM.accent, borderColor: `${ADM.darkGreen}80` }
                    : { background: "transparent", color: ADM.mutedText, borderColor: ADM.inputBorder }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Tone */}
        <div className={sectionCard}>
          <div className="flex items-center gap-2 mb-3">
            <Mic className="h-4 w-4" style={{ color: ADM.accent }} />
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>
              Content Tone
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(tone === t ? "" : t)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                style={
                  tone === t
                    ? { background: `${ADM.darkGreen}40`, color: ADM.accent, borderColor: `${ADM.darkGreen}80` }
                    : { background: "transparent", color: ADM.mutedText, borderColor: ADM.inputBorder }
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className={sectionCard}>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquareText className="h-4 w-4" style={{ color: ADM.accent }} />
          <label className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>
            Additional Notes
          </label>
        </div>
        <textarea
          className={`${inputClass} min-h-[60px] resize-y`}
          placeholder="Any extra context, references, or things you want included..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!postIdea.trim() || loading}
        className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40 flex items-center gap-2 justify-center"
        style={{ background: ADM.darkGreen, color: ADM.cream, boxShadow: `0 4px 20px ${ADM.darkGreen}80` }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Content...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Content Plan
          </>
        )}
      </button>

      {error && (
        <div className="rounded-xl p-4 text-sm font-medium text-red-400" style={{ background: "hsl(0, 30%, 10%)", border: "1px solid hsl(0, 30%, 20%)" }}>
          {error}
        </div>
      )}

      {/* Generated Plan Preview */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: ADM.cream }}>
                📋 Generated Content Plan
              </h3>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                style={{ background: ADM.darkGreen, color: ADM.cream }}
              >
                <FileDown className="h-4 w-4" />
                Download PDF
              </button>
            </div>

            {/* Subject */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4" style={{ color: ADM.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>Subject / Hook</span>
              </div>
              <p className="text-base font-bold italic" style={{ color: ADM.cream }}>{plan.subject}</p>
            </div>

            {/* Content Angle */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4" style={{ color: ADM.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>Content Angle</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: ADM.cream }}>{plan.contentAngle}</p>
            </div>

            {/* Generated Content */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-3">
                <Quote className="h-4 w-4" style={{ color: ADM.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>Generated Content</span>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: ADM.cream }}>{plan.content}</p>
              </div>
            </div>

            {/* Keywords */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-3">
                <Hash className="h-4 w-4" style={{ color: ADM.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>Keywords</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {plan.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${ADM.darkGreen}30`, color: ADM.accent, border: `1px solid ${ADM.darkGreen}50` }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-3">
                <Hash className="h-4 w-4" style={{ color: ADM.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>Hashtags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {plan.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${ADM.accent}18`, color: ADM.accent, border: `1px solid ${ADM.accent}30` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Structure */}
            <div className={sectionCard}>
              <span className="text-xs font-bold uppercase tracking-wider block mb-4" style={{ color: ADM.accent }}>
                Content Structure
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "🪝 Hook", text: plan.hook },
                  { label: "💡 Main Idea", text: plan.mainIdea },
                  { label: "🔑 Key Insight", text: plan.keyInsight },
                  { label: "📣 Call to Action", text: plan.callToAction },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: ADM.midGreen }}>
                      {item.label}
                    </span>
                    <p className="text-sm" style={{ color: ADM.cream }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Content Plan History ──────────────────────────── */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <History className="h-5 w-5" style={{ color: ADM.accent }} />
          <h3 className="text-lg font-bold" style={{ color: ADM.cream }}>Content Plan History</h3>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${ADM.darkGreen}30`, color: ADM.accent }}>
            {history.length}
          </span>
        </div>

        {historyLoading ? (
          <div className="flex items-center gap-2 py-8 justify-center" style={{ color: ADM.mutedText }}>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading history...</span>
          </div>
        ) : history.length === 0 ? (
          <div className={sectionCard + " text-center py-8"}>
            <p className="text-sm" style={{ color: ADM.mutedText }}>No content plans generated yet. Create one above!</p>
          </div>
        ) : (
          <div className="space-y-5">
            {Object.entries(groupedHistory).map(([date, plans]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-3.5 w-3.5" style={{ color: ADM.midGreen }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.midGreen }}>{date}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${ADM.midGreen}20`, color: ADM.midGreen }}>
                    {plans.length} plan{plans.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-2">
                  {plans.map((cp) => (
                    <div
                      key={cp.id}
                      className="rounded-xl overflow-hidden"
                      style={{ background: ADM.surface, border: `1px solid ${ADM.surfaceBorder}` }}
                    >
                      {/* Header row */}
                      <button
                        onClick={() => setExpandedHistoryId(expandedHistoryId === cp.id ? null : cp.id)}
                        className="w-full text-left px-5 py-3.5 flex items-center gap-3 transition-colors hover:brightness-110"
                        style={{ background: expandedHistoryId === cp.id ? "hsl(220, 25%, 16%)" : ADM.surface }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: ADM.cream }}>
                            {cp.post_idea}
                          </p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            {cp.platform && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${ADM.darkGreen}30`, color: ADM.midGreen }}>
                                📱 {cp.platform}
                              </span>
                            )}
                            {cp.tone && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${ADM.accent}15`, color: ADM.accent }}>
                                🎯 {cp.tone}
                              </span>
                            )}
                            {cp.posting_day && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${ADM.midGreen}15`, color: ADM.midGreen }}>
                                📅 {cp.posting_day}
                              </span>
                            )}
                            <span className="text-[10px]" style={{ color: ADM.mutedText }}>
                              {new Date(cp.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteContentPlan(cp.id); }}
                            className="h-7 w-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/20"
                            style={{ border: `1px solid ${ADM.surfaceBorder}` }}
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </button>
                          {expandedHistoryId === cp.id ? (
                            <ChevronUp className="h-4 w-4" style={{ color: ADM.mutedText }} />
                          ) : (
                            <ChevronDown className="h-4 w-4" style={{ color: ADM.mutedText }} />
                          )}
                        </div>
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {expandedHistoryId === cp.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-2 space-y-4" style={{ borderTop: `1px solid ${ADM.surfaceBorder}` }}>
                              {/* Subject */}
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: ADM.accent }}>Subject</span>
                                <p className="text-sm font-bold italic" style={{ color: ADM.cream }}>{cp.subject}</p>
                              </div>

                              {/* Content Angle */}
                              {cp.content_angle && (
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: ADM.accent }}>Angle</span>
                                  <p className="text-xs leading-relaxed" style={{ color: ADM.cream }}>{cp.content_angle}</p>
                                </div>
                              )}

                              {/* Content */}
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: ADM.accent }}>Content</span>
                                <div className="rounded-lg p-3" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                                  <p className="text-xs whitespace-pre-wrap leading-relaxed" style={{ color: ADM.cream }}>{cp.content}</p>
                                </div>
                              </div>

                              {/* Keywords + Hashtags */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: ADM.accent }}>Keywords</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(cp.keywords as string[]).map((kw, i) => (
                                      <span key={i} className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: `${ADM.darkGreen}30`, color: ADM.accent }}>
                                        {kw}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: ADM.accent }}>Hashtags</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {(cp.hashtags as string[]).map((tag, i) => (
                                      <span key={i} className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: `${ADM.accent}18`, color: ADM.accent }}>
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Structure */}
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { label: "🪝 Hook", text: cp.hook },
                                  { label: "💡 Main Idea", text: cp.main_idea },
                                  { label: "🔑 Key Insight", text: cp.key_insight },
                                  { label: "📣 CTA", text: cp.call_to_action },
                                ].map((item, i) => (
                                  <div key={i} className="rounded-lg p-3" style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}>
                                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: ADM.midGreen }}>{item.label}</span>
                                    <p className="text-[11px]" style={{ color: ADM.cream }}>{item.text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentPlanner;
