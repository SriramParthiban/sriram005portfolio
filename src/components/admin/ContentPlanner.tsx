import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, FileDown, Loader2, Hash, Quote, Target,
  Lightbulb, MessageSquareText, Type, Calendar, Globe, Mic
} from "lucide-react";

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content-plan`;

const ADM = {
  surface: "hsl(121, 25%, 8%)",
  surfaceBorder: "hsl(121, 20%, 16%)",
  accent: "#c0b87a",
  cream: "#f2e3bb",
  midGreen: "#427a43",
  darkGreen: "#005f02",
  mutedText: "hsl(53, 25%, 55%)",
  inputBg: "hsl(121, 20%, 7%)",
  inputBorder: "hsl(121, 18%, 18%)",
};

type ContentPlan = {
  subject: string;
  contentAngle: string;
  captions: string[];
  keywords: string[];
  hashtags: string[];
  hook: string;
  mainIdea: string;
  keyInsight: string;
  callToAction: string;
};

const POSTING_OPTIONS = ["Today", "Tomorrow", "This Week", "Next Week", "Custom Date"] as const;
const PLATFORMS = ["Instagram", "LinkedIn", "Twitter/X", "YouTube", "Other"] as const;
const TONES = ["Professional", "Storytelling", "Educational", "Personal", "Motivational", "Technical"] as const;

const inputClass =
  "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors"
  + " bg-[hsl(121,20%,7%)] border border-[hsl(121,18%,18%)] text-[#f2e3bb] placeholder:text-[hsl(53,25%,40%)] focus:border-[#427a43]";
const labelClass = "text-xs font-bold text-[#c0b87a] mb-1.5 block uppercase tracking-wider";
const sectionCard = "bg-[hsl(121,25%,8%)] border border-[hsl(121,20%,16%)] rounded-xl p-5";

const ContentPlanner = () => {
  const [postIdea, setPostIdea] = useState("");
  const [postingDay, setPostingDay] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<ContentPlan | null>(null);

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
    
    .header { text-align: center; margin-bottom: 45px; padding-bottom: 28px; border-bottom: 3px solid #005f02; }
    .header-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #427a43; margin-bottom: 10px; }
    .header-title { font-size: 26px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
    .header-meta { font-size: 13px; color: #888; margin-top: 6px; }
    .header-meta span { display: inline-block; margin: 0 10px; }

    .section { margin-bottom: 30px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #005f02; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e8f0e8; }
    .section-body { font-size: 14px; color: #333; }
    
    .subject-box { background: #f4f9f4; border-left: 4px solid #005f02; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .subject-box p { font-size: 18px; font-weight: 700; color: #1a1a2e; font-style: italic; }
    
    .angle-text { font-size: 14px; color: #333; line-height: 1.8; background: #fafafa; padding: 16px 20px; border-radius: 8px; border: 1px solid #eee; }
    
    .caption-block { background: #fafafa; border-radius: 8px; padding: 16px 20px; margin-bottom: 12px; border: 1px solid #eee; }
    .caption-num { font-size: 11px; font-weight: 700; color: #427a43; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .caption-text { font-size: 14px; color: #333; line-height: 1.7; white-space: pre-wrap; }
    
    .tag-container { display: flex; flex-wrap: wrap; gap: 8px; }
    .keyword-tag { background: #e8f0e8; color: #005f02; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .hashtag-tag { background: #f0ede4; color: #8a7a30; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    
    .structure-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .structure-card { background: #fafafa; border-radius: 8px; padding: 16px; border: 1px solid #eee; }
    .structure-label { font-size: 11px; font-weight: 700; color: #427a43; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .structure-text { font-size: 14px; color: #333; line-height: 1.6; }
    
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e8f0e8; text-align: center; }
    .footer-name { font-size: 16px; font-weight: 700; color: #005f02; font-style: italic; font-family: Georgia, serif; }
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
    <div class="section-title">Caption Suggestions</div>
    ${plan.captions.map((c, i) => `
      <div class="caption-block">
        <div class="caption-num">Option ${i + 1}</div>
        <div class="caption-text">${c.replace(/\n/g, "<br/>")}</div>
      </div>
    `).join("")}
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
          placeholder='e.g. "How I automated my mom\'s portfolio dashboard using AI"'
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
            Generating Content Plan...
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

            {/* Captions */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-3">
                <Quote className="h-4 w-4" style={{ color: ADM.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ADM.accent }}>Caption Suggestions</span>
              </div>
              <div className="space-y-3">
                {plan.captions.map((caption, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{ background: ADM.inputBg, border: `1px solid ${ADM.inputBorder}` }}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: ADM.midGreen }}>
                      Option {i + 1}
                    </span>
                    <p className="text-sm whitespace-pre-wrap" style={{ color: ADM.cream }}>{caption}</p>
                  </div>
                ))}
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
    </motion.div>
  );
};

export default ContentPlanner;
