import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, FolderKanban, Database, Monitor, PartyPopper, RotateCcw, CheckCircle2, HelpCircle } from "lucide-react";
import FadeInSection from "./FadeInSection";

/* ─── Stage Timing (ms) ─── */
const STAGE_DURATIONS = [1000, 3500, 1800, 1800, 1500, 0];

/* ─── Stage Data ─── */
const STAGES = [
  {
    id: "captured",
    label: "Lead Captured",
    emoji: "📨",
    icon: Send,
    color: "rgba(45,139,94,0.85)",
    glow: "rgba(45,139,94,0.4)",
    explanation: (name: string, email: string) =>
      `${name}'s lead information has been received and entered into our system. We now have ${email} safely stored and ready for processing.`,
    logMsg: (name: string, email: string) => `Lead captured: ${name} (${email})`,
    analogy: null,
  },
  {
    id: "ai",
    label: "AI Processing",
    emoji: "🤖",
    icon: Bot,
    color: "rgba(212,162,76,0.85)",
    glow: "rgba(212,162,76,0.4)",
    explanation: (name: string) =>
      `Our smart system is analyzing ${name}'s profile right now — checking their company, industry, and how well they match your ideal customer. It gives them a quality score from 0 to 100 so your team knows who to prioritize. This happens in seconds, not hours.`,
    logMsg: (name: string) => `AI processing complete for ${name}: Quality score 8.7/10`,
    analogy: "Think of it like reading someone's resume and instantly knowing if they're the right fit.",
  },
  {
    id: "pipeline",
    label: "Pipeline Routing",
    emoji: "🗂️",
    icon: FolderKanban,
    color: "rgba(245,158,11,0.85)",
    glow: "rgba(245,158,11,0.4)",
    explanation: (name: string) =>
      `Based on the analysis, ${name} is instantly routed to the correct sales pipeline. High-quality leads go straight to your top salespeople. Others get a friendly follow-up email sequence. No manual work needed — it all happens automatically.`,
    logMsg: (name: string) => `${name} routed to Enterprise Sales Pipeline`,
    analogy: null,
  },
  {
    id: "crm",
    label: "CRM Updated",
    emoji: "📊",
    icon: Database,
    color: "rgba(0,232,122,0.85)",
    glow: "rgba(0,232,122,0.4)",
    explanation: (name: string) =>
      `Your customer database now has a complete record for ${name} — including name, email, company, quality score, and notes. Your entire team can see it in one place. Nothing gets lost or forgotten.`,
    logMsg: (name: string) => `CRM record created for ${name} with enriched data`,
    analogy: null,
  },
  {
    id: "dashboard",
    label: "Admin Dashboard",
    emoji: "🖥️",
    icon: Monitor,
    color: "rgba(255,107,53,0.85)",
    glow: "rgba(255,107,53,0.4)",
    explanation: (name: string) =>
      `Your team lead sees a real-time notification on their dashboard. They instantly know ${name} has arrived as a qualified lead, can see all the details, and can take action immediately. No delays, pure speed.`,
    logMsg: () => `Admin notified — lead flagged for immediate action`,
    analogy: null,
  },
  {
    id: "done",
    label: "Client Notified",
    emoji: "🎉",
    icon: PartyPopper,
    color: "rgba(255,60,172,0.85)",
    glow: "rgba(255,60,172,0.4)",
    explanation: (name: string) =>
      `${name} receives a personalized welcome message. They feel valued because you responded fast and understood their needs. Quick, smart, and personal — that's how you win deals.`,
    logMsg: (name: string) => `Personalized welcome sent to ${name} — automation complete!`,
    analogy: null,
  },
];

/* ─── CSS keyframes injected once ─── */
const RUNNER_STYLE_ID = "playground-runner-css";
function injectRunnerCSS() {
  if (document.getElementById(RUNNER_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = RUNNER_STYLE_ID;
  style.textContent = `
    @keyframes pg-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes pg-stride{0%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}100%{transform:rotate(-12deg)}}
    @keyframes pg-pulse-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.5);opacity:0}}
    @keyframes pg-scan{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
    @keyframes pg-orbit{0%{transform:rotate(0deg) translateX(22px) rotate(0deg)}100%{transform:rotate(360deg) translateX(22px) rotate(-360deg)}}
    @keyframes pg-confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100px) rotate(720deg);opacity:0}}
    @keyframes pg-check{0%{transform:scale(0);opacity:0}60%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:1}}
    @keyframes pg-wave{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}
    @keyframes pg-fade-in{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:translateY(0)}}
    .pg-runner{animation:pg-bounce .4s ease-in-out infinite}
    .pg-stride{animation:pg-stride .35s ease-in-out infinite}
    .pg-pulse-ring{animation:pg-pulse-ring 1.5s ease-out infinite}
    .pg-scan-line{animation:pg-scan 1.2s ease-in-out infinite}
    .pg-orbit-dot{animation:pg-orbit 2s linear infinite}
    .pg-confetti{animation:pg-confetti 1.8s ease-out forwards}
    .pg-check{animation:pg-check .4s ease-out forwards}
    .pg-node-glow{transition:box-shadow .6s ease,border-color .6s ease,background-color .6s ease}
    .pg-progress{transition:width 1s ease-out,height 1s ease-out,left 1s ease-out}
    .pg-fade-in{animation:pg-fade-in .4s ease-out forwards}
    .pg-wave-bar{animation:pg-wave 1s ease-in-out infinite}
    .pg-pulse-glow{animation:pg-pulse-ring 2s ease-in-out infinite}
    .pg-log-scroll::-webkit-scrollbar{width:6px}
    .pg-log-scroll::-webkit-scrollbar-track{background:hsl(250 75% 57% / 0.08);border-radius:999px}
    .pg-log-scroll::-webkit-scrollbar-thumb{background:hsl(250 75% 57% / 0.35);border-radius:999px}
    .pg-log-scroll::-webkit-scrollbar-thumb:hover{background:hsl(250 75% 57% / 0.55)}
    .pg-log-scroll{scrollbar-width:thin;scrollbar-color:hsl(250 75% 57% / 0.35) hsl(250 75% 57% / 0.08)}
  `;
  document.head.appendChild(style);
}

/* ─── Tooltip ─── */
const InfoTip = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-white/30 hover:text-white/60 transition-colors"
        aria-label="More info"
      >
        <HelpCircle className="h-3.5 w-3.5 inline" />
      </button>
      {open && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 rounded-lg bg-black/95 border border-white/10 p-3 text-xs text-white/80 leading-relaxed shadow-2xl">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/95" />
        </span>
      )}
    </span>
  );
};

/* ─── Runner: Cute pixel-art robot ─── */
const RunnerSVG = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none" className="pg-runner drop-shadow-[0_0_8px_hsl(250_75%_57%/0.6)]">
    {/* Antenna */}
    <rect x="15" y="0" width="2" height="4" rx="1" fill="hsl(250 75% 70%)" />
    <circle cx="16" cy="0" r="2" fill="hsl(250 75% 80%)" className="pg-pulse-glow" />
    {/* Head */}
    <rect x="8" y="4" width="16" height="12" rx="3" fill="hsl(250 75% 57%)" />
    {/* Visor / eyes */}
    <rect x="10" y="7" width="12" height="5" rx="2" fill="hsl(250 40% 20%)" />
    <rect x="11" y="8" width="4" height="3" rx="1" fill="#00D4FF" opacity="0.9" />
    <rect x="17" y="8" width="4" height="3" rx="1" fill="#00D4FF" opacity="0.9" />
    {/* Body */}
    <rect x="9" y="17" width="14" height="10" rx="2" fill="hsl(250 60% 50%)" />
    <rect x="12" y="19" width="8" height="3" rx="1" fill="hsl(250 75% 70%)" opacity="0.5" />
    {/* chest light */}
    <circle cx="16" cy="23" r="1.5" fill="#7C3AED" className="pg-pulse-glow" />
    {/* Left arm */}
    <g className="pg-stride" style={{ transformOrigin: "10px 19px" }}>
      <rect x="4" y="18" width="5" height="8" rx="2" fill="hsl(250 55% 45%)" />
    </g>
    {/* Right arm */}
    <g className="pg-stride" style={{ transformOrigin: "22px 19px", animationDirection: "reverse" }}>
      <rect x="23" y="18" width="5" height="8" rx="2" fill="hsl(250 55% 45%)" />
    </g>
    {/* Left leg */}
    <g className="pg-stride" style={{ transformOrigin: "12px 27px", animationDirection: "reverse" }}>
      <rect x="10" y="27" width="5" height="7" rx="2" fill="hsl(250 50% 40%)" />
    </g>
    {/* Right leg */}
    <g className="pg-stride" style={{ transformOrigin: "20px 27px" }}>
      <rect x="17" y="27" width="5" height="7" rx="2" fill="hsl(250 50% 40%)" />
    </g>
  </svg>
);

/* ─── AI Processing Visual ─── */
const AIVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full pg-orbit-dot"
        style={{ backgroundColor: "rgba(0,212,255,0.7)", animationDelay: `${i * 0.66}s` }}
      />
    ))}
    <div className="absolute w-full h-[2px] pg-scan-line" style={{ backgroundColor: "rgba(0,212,255,0.3)" }} />
  </div>
);

/* ─── AI Wave Bars ─── */
const AIWaveBars = () => (
  <div className="flex items-end gap-[3px] h-4" aria-hidden>
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-[3px] rounded-full pg-wave-bar"
        style={{
          height: "100%",
          backgroundColor: "rgba(0,212,255,0.6)",
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

/* ─── Confetti Burst ─── */
const ConfettiBurst = () => {
  const colors = ["#7C6FFF", "#00D4FF", "#FFB800", "#00E87A", "#FF6B35", "#FF3CAC"];
  const pieces = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      color: colors[i % colors.length],
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 0.6}s`,
      size: 4 + Math.random() * 7,
      rotate: Math.random() > 0.5,
    }))
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {pieces.current.map((p, i) => (
        <div
          key={i}
          className={`absolute top-0 pg-confetti ${p.rotate ? "rounded-sm" : "rounded-full"}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Activity Log Entry ─── */
interface LogEntry {
  time: string;
  message: string;
  color: string;
}

/* ─── Main Component ─── */
const Playground = () => {
  const [stage, setStage] = useState(-1);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activityLog, setActivityLog] = useState<LogEntry[]>([]);
  const [elapsedSec, setElapsedSec] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerStartRef = useRef<number>(0);

  // Lazy-load via IntersectionObserver
  useEffect(() => {
    injectRunnerCSS();
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance stages with variable timing
  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length - 1) return;
    const duration = STAGE_DURATIONS[stage];
    const timer = setTimeout(() => setStage((s) => s + 1), duration);
    return () => clearTimeout(timer);
  }, [stage]);

  // Elapsed time counter — stops when animation completes
  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length - 1) return;
    if (stage === 0) timerStartRef.current = Date.now();
    const interval = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - timerStartRef.current) / 1000));
    }, 200);
    return () => clearInterval(interval);
  }, [stage]);

  // Add log entry when stage changes
  useEffect(() => {
    if (stage < 0) return;
    const s = STAGES[stage];
    const seconds = stage === 0 ? 0 : Math.floor((Date.now() - timerStartRef.current) / 1000);
    const time = `00:${String(seconds).padStart(2, "0")}`;
    const msg = s.logMsg(leadName, leadEmail);
    setActivityLog((prev) => [...prev, { time, message: msg, color: s.color }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const handleSubmit = useCallback(() => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setActivityLog([]);
    setElapsedSec(0);
    setStage(0);
  }, [leadName, leadEmail]);

  const handleReset = useCallback(() => {
    setStage(-1);
    setLeadName("");
    setLeadEmail("");
    setLeadCompany("");
    setHoveredStage(null);
    setActivityLog([]);
    setElapsedSec(0);
  }, []);

  const isRunning = stage >= 0 && stage < STAGES.length - 1;
  const isComplete = stage >= STAGES.length - 1;
  const activeExplanation = hoveredStage !== null ? hoveredStage : (stage >= 0 ? stage : null);

  return (
    <section
      ref={sectionRef}
      id="playground"
      className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden"
    >
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-20 left-0 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-[200px] w-[200px] md:h-[350px] md:w-[350px] rounded-full bg-accent/4 blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.015)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
              <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">
                Interactive Demo
              </span>
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-accent to-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
              Automation <span className="gradient-text">Playground</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Watch how a single lead flows through an intelligent automation system — from submission to a happy client. No tech jargon, just results.
            </p>
          </div>
        </FadeInSection>

        {isVisible && (
          <FadeInSection>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-8 lg:p-10">

              {/* ── Lead Form ── */}
              {stage === -1 && (
                <div className="max-w-sm mx-auto mb-8 pg-fade-in">
                  <p className="text-sm font-semibold text-white/60 mb-4 text-center">
                    ⚡ Submit a sample lead to trigger the automation
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="pg-name" className="sr-only">Full Name</label>
                      <input
                        id="pg-name"
                        type="text"
                        placeholder="Full Name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_-4px_hsl(250_75%_57%/0.4)] transition-all"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="pg-email" className="sr-only">Email Address</label>
                      <input
                        id="pg-email"
                        type="email"
                        placeholder="Email Address"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_-4px_hsl(250_75%_57%/0.4)] transition-all"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="pg-company" className="sr-only">Company Name (optional)</label>
                      <input
                        id="pg-company"
                        type="text"
                        placeholder="Company Name (optional)"
                        value={leadCompany}
                        onChange={(e) => setLeadCompany(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_-4px_hsl(250_75%_57%/0.4)] transition-all"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!leadName.trim() || !leadEmail.trim()}
                      className="group w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 hover:shadow-[0_0_20px_-4px_hsl(250_75%_57%/0.5)] active:scale-[0.97] flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      Fire Lead
                    </button>
                  </div>
                </div>
              )}

              {/* ── Pipeline Visualization ── */}
              {stage >= 0 && (
                <div className="relative pg-fade-in">

                  {/* ═══ DESKTOP: Horizontal ═══ */}
                  <div className="hidden md:block">
                    {/* Track */}
                    <div className="relative mx-8 mb-8">
                      <div className="h-[3px] rounded-full bg-white/10" />
                      <div
                        className="absolute top-0 left-0 h-[3px] rounded-full pg-progress"
                        style={{
                          width: `${(stage / (STAGES.length - 1)) * 100}%`,
                          background: `linear-gradient(90deg, ${STAGES[0].color}, ${STAGES[Math.min(stage, STAGES.length - 1)].color})`,
                        }}
                      />
                      {/* Runner */}
                      {isRunning && (
                        <div
                          className="absolute -top-[20px] z-20 pg-progress"
                          style={{ left: `${(stage / (STAGES.length - 1)) * 100}%`, marginLeft: "-18px" }}
                        >
                          <RunnerSVG />
                        </div>
                      )}
                    </div>

                    {/* Nodes */}
                    <div className="flex justify-between">
                      {STAGES.map((s, idx) => {
                        const Icon = s.icon;
                        const isActive = idx <= stage;
                        const isCurrent = idx === stage && isRunning;
                        const isPast = idx < stage;
                        const isLast = idx === STAGES.length - 1;
                        return (
                          <div
                            key={s.id}
                            className="flex flex-col items-center cursor-pointer group/node"
                            style={{ width: `${100 / STAGES.length}%` }}
                            onMouseEnter={() => setHoveredStage(idx)}
                            onMouseLeave={() => setHoveredStage(null)}
                            onClick={() => setHoveredStage(hoveredStage === idx ? null : idx)}
                            role="button"
                            tabIndex={0}
                            aria-label={`${s.label}: ${isActive ? "completed" : "pending"}`}
                          >
                            <div className="relative">
                              {isCurrent && (
                                <div
                                  className="absolute inset-0 rounded-2xl pg-pulse-ring"
                                  style={{ border: `2px solid ${s.color}` }}
                                />
                              )}
                              <div
                                className="h-14 w-14 lg:h-16 lg:w-16 rounded-2xl flex items-center justify-center border-2 pg-node-glow relative overflow-hidden group-hover/node:brightness-110"
                                style={{
                                  borderColor: isActive ? s.color : "rgba(255,255,255,0.1)",
                                  backgroundColor: isActive ? `${s.color.replace(/[\d.]+\)$/, "0.12)")}` : "rgba(255,255,255,0.02)",
                                  boxShadow: isCurrent
                                    ? `0 0 30px -5px ${s.glow}`
                                    : isActive
                                    ? `0 0 15px -5px ${s.glow}`
                                    : "none",
                                }}
                              >
                                {isCurrent && s.id === "ai" && <AIVisual />}
                                <Icon
                                  className="h-5 w-5 lg:h-6 lg:w-6 relative z-10 transition-colors duration-500"
                                  style={{ color: isActive ? s.color : "rgba(255,255,255,0.2)" }}
                                />
                              </div>
                              {/* Checkmark on past + completed final stage */}
                              {(isPast || (isLast && isComplete)) && (
                                <div className="absolute -top-1 -right-1 pg-check">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                                </div>
                              )}
                            </div>
                            <p
                              className="mt-2 text-[11px] lg:text-xs font-semibold text-center transition-colors duration-500"
                              style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)" }}
                            >
                              {s.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ═══ MOBILE: Vertical ═══ */}
                  <div className="md:hidden relative">
                    <div className="absolute left-7 top-7 bottom-7 w-[3px] rounded-full bg-white/10">
                      <div
                        className="w-full rounded-full pg-progress"
                        style={{
                          height: `${(stage / (STAGES.length - 1)) * 100}%`,
                          background: `linear-gradient(180deg, ${STAGES[0].color}, ${STAGES[Math.min(stage, STAGES.length - 1)].color})`,
                        }}
                      />
                    </div>

                    <div className="space-y-5">
                      {STAGES.map((s, idx) => {
                        const Icon = s.icon;
                        const isActive = idx <= stage;
                        const isCurrent = idx === stage && isRunning;
                        const isPast = idx < stage;
                        const isLast = idx === STAGES.length - 1;
                        return (
                          <div
                            key={s.id}
                            className="flex items-start gap-4 relative z-10"
                            onClick={() => setHoveredStage(hoveredStage === idx ? null : idx)}
                          >
                            <div className="relative shrink-0">
                              {isCurrent && (
                                <div
                                  className="absolute inset-0 rounded-xl pg-pulse-ring"
                                  style={{ border: `2px solid ${s.color}` }}
                                />
                              )}
                              <div
                                className="h-14 w-14 rounded-xl flex items-center justify-center border-2 pg-node-glow relative overflow-hidden"
                                style={{
                                  borderColor: isActive ? s.color : "rgba(255,255,255,0.1)",
                                  backgroundColor: isActive ? `${s.color.replace(/[\d.]+\)$/, "0.12)")}` : "rgba(255,255,255,0.02)",
                                  boxShadow: isCurrent ? `0 0 25px -5px ${s.glow}` : "none",
                                }}
                              >
                                {isCurrent && s.id === "ai" && <AIVisual />}
                                <Icon
                                  className="h-5 w-5 relative z-10 transition-colors duration-500"
                                  style={{ color: isActive ? s.color : "rgba(255,255,255,0.2)" }}
                                />
                              </div>
                              {(isPast || (isLast && isComplete)) && (
                                <div className="absolute -top-1 -right-1 pg-check">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                                </div>
                              )}
                            </div>
                            <div className="pt-1 flex-1 min-w-0">
                              <p
                                className="text-sm font-semibold transition-colors duration-500"
                                style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}
                              >
                                {s.emoji} {s.label}
                              </p>
                              {(isCurrent || hoveredStage === idx) && isActive && (
                                <p className="text-xs text-white/50 mt-1 leading-relaxed pg-fade-in">
                                  {s.explanation(leadName, leadEmail)}
                                </p>
                              )}
                              {isCurrent && s.id === "ai" && (
                                <div className="mt-2">
                                  <AIWaveBars />
                                </div>
                              )}
                              {isCurrent && s.id !== "ai" && (
                                <p className="text-[11px] mt-1 font-medium pg-fade-in" style={{ color: s.color }}>
                                  Processing…
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Explanation Panel (Desktop) ── */}
                  <div className="hidden md:block mt-8 min-h-[110px]">
                    {activeExplanation !== null && (
                      <div
                        key={activeExplanation}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 pg-fade-in"
                        style={{ borderColor: `${STAGES[activeExplanation].color.replace(/[\d.]+\)$/, "0.25)")}` }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl shrink-0">{STAGES[activeExplanation].emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white/90 mb-1.5 flex items-center gap-2">
                              {STAGES[activeExplanation].label}
                              <InfoTip text={`Stage ${activeExplanation + 1} of ${STAGES.length}. Each stage runs automatically — no manual steps needed.`} />
                              {activeExplanation === 1 && stage === 1 && isRunning && <AIWaveBars />}
                            </p>
                            <p className="text-sm text-white/60 leading-relaxed">
                              {STAGES[activeExplanation].explanation(leadName, leadEmail)}
                            </p>
                            {STAGES[activeExplanation].analogy && (
                              <p className="text-xs text-white/40 mt-2 italic">
                                💡 {STAGES[activeExplanation].analogy}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Running Status ── */}
                  {isRunning && (
                    <div className="mt-6 text-center pg-fade-in">
                      <p className="text-sm text-white/40">
                        Processing <span className="text-white/70 font-medium">{leadName}</span>
                        {leadCompany ? ` from ${leadCompany}` : ""}…
                        <span className="text-white/25 ml-2">Step {stage + 1}/{STAGES.length} · {elapsedSec}s</span>
                      </p>
                    </div>
                  )}

                  {/* ── Live Activity Log ── */}
                  {activityLog.length > 0 && (
                    <div className="mt-6 rounded-lg border border-white/8 bg-black/20 p-4 max-h-[180px] overflow-y-auto pg-log-scroll">
                      <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2 font-semibold">Live Activity Log</p>
                      <div className="space-y-1.5">
                        {activityLog.map((entry, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs pg-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                            <span className="text-white/25 font-mono shrink-0">{entry.time}</span>
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: entry.color }} />
                            <span className="text-white/55">{entry.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Completion ── */}
                  {isComplete && (
                    <div className="relative mt-10 text-center pg-fade-in">
                      <ConfettiBurst />
                      <div className="text-5xl mb-3">🎉</div>
                      <p className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
                        Automation Complete!
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="text-white/80 font-medium">{leadName}</span>
                        {leadCompany ? ` from ${leadCompany}` : ""} ({leadEmail}) has been processed in {elapsedSec} seconds.
                      </p>
                      <p className="text-xs text-white/35 mb-6 max-w-lg mx-auto">
                        Lead captured → AI scored → Routed to pipeline → CRM updated → Dashboard notified → Client welcomed
                      </p>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white/70 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all active:scale-[0.97]"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FadeInSection>
        )}

        <FadeInSection>
          <p className="mt-8 text-center text-xs text-white/30">
            This is a visual demo — no actual data is sent or stored. Want this for your business?{" "}
            <a href="#contact" className="text-primary hover:underline">Let's talk!</a>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Playground;
