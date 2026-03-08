import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, FolderKanban, Database, Monitor, PartyPopper, RotateCcw, CheckCircle2, HelpCircle } from "lucide-react";
import FadeInSection from "./FadeInSection";

/* ─── Stage Data ─── */
const STAGES = [
  {
    id: "captured",
    label: "Lead Captured",
    emoji: "📨",
    icon: Send,
    color: "rgba(124,111,255,0.85)",
    glow: "rgba(124,111,255,0.4)",
    explanation:
      "Your lead information has been received and entered into our system. We now have their name and email safely stored and ready for processing.",
    analogy: null,
  },
  {
    id: "ai",
    label: "AI Processing",
    emoji: "🤖",
    icon: Bot,
    color: "rgba(0,212,255,0.85)",
    glow: "rgba(0,212,255,0.4)",
    explanation:
      "Our smart system analyzes your lead in real time — checking their company, industry, and how well they match your ideal customer. It gives them a quality score from 0 to 100 so your team knows who to focus on first. All of this happens in the blink of an eye.",
    analogy: "Think of it like reading a resume and instantly knowing if they're the right fit.",
  },
  {
    id: "pipeline",
    label: "Pipeline Routing",
    emoji: "🗂️",
    icon: FolderKanban,
    color: "rgba(255,184,0,0.85)",
    glow: "rgba(255,184,0,0.4)",
    explanation:
      "Based on the analysis, the lead is instantly sent to the right place. High-quality leads go straight to your top salespeople. Others get a friendly follow-up email sequence. No manual work needed — it all happens automatically.",
    analogy: null,
  },
  {
    id: "crm",
    label: "CRM Updated",
    emoji: "📊",
    icon: Database,
    color: "rgba(0,232,122,0.85)",
    glow: "rgba(0,232,122,0.4)",
    explanation:
      "Your customer database gets updated automatically with all the details — name, email, quality score, and notes. Your entire team can see it in one place. Nothing gets lost or forgotten.",
    analogy: null,
  },
  {
    id: "dashboard",
    label: "Dashboard Live",
    emoji: "🖥️",
    icon: Monitor,
    color: "rgba(255,107,53,0.85)",
    glow: "rgba(255,107,53,0.4)",
    explanation:
      "Your team lead sees a real-time notification on their dashboard. They instantly know a new qualified lead has arrived, can see all the details, and can take action immediately. No delays, pure speed.",
    analogy: null,
  },
  {
    id: "done",
    label: "Client Happy 🎉",
    emoji: "🎉",
    icon: PartyPopper,
    color: "rgba(255,60,172,0.85)",
    glow: "rgba(255,60,172,0.4)",
    explanation:
      "Your customer receives a personalized welcome message. They feel valued because you responded fast and understood their needs. Quick, smart, and personal — that's how you win.",
    analogy: null,
  },
];

/* ─── CSS-only runner keyframes injected once ─── */
const RUNNER_STYLE_ID = "playground-runner-css";
function injectRunnerCSS() {
  if (document.getElementById(RUNNER_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = RUNNER_STYLE_ID;
  style.textContent = `
    @keyframes pg-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pg-legs {
      0% { d: path("M16 22 L11 30"); }
      50% { d: path("M16 22 L21 30"); }
      100% { d: path("M16 22 L11 30"); }
    }
    @keyframes pg-pulse-ring {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes pg-scan {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    @keyframes pg-orbit {
      0% { transform: rotate(0deg) translateX(24px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(24px) rotate(-360deg); }
    }
    @keyframes pg-confetti-fall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(80px) rotate(720deg); opacity: 0; }
    }
    @keyframes pg-check-pop {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .pg-runner {
      animation: pg-bounce 0.4s ease-in-out infinite;
    }
    .pg-pulse-ring {
      animation: pg-pulse-ring 1.5s ease-out infinite;
    }
    .pg-scan-line {
      animation: pg-scan 1.2s ease-in-out infinite;
    }
    .pg-orbit-dot {
      animation: pg-orbit 2s linear infinite;
    }
    .pg-confetti {
      animation: pg-confetti-fall 1.5s ease-out forwards;
    }
    .pg-check-pop {
      animation: pg-check-pop 0.4s ease-out forwards;
    }
    .pg-node-glow {
      transition: box-shadow 0.6s ease, border-color 0.6s ease, background-color 0.6s ease;
    }
    .pg-progress-fill {
      transition: width 1s ease-out, height 1s ease-out;
    }
  `;
  document.head.appendChild(style);
}

/* ─── Tooltip Component ─── */
const Tooltip = ({ text }: { text: string }) => {
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
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-black/90 border border-white/10 p-3 text-xs text-white/80 leading-relaxed shadow-xl">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
        </span>
      )}
    </span>
  );
};

/* ─── Runner SVG (CSS-animated) ─── */
const RunnerSVG = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="pg-runner drop-shadow-lg">
    <circle cx="16" cy="8" r="4" fill="hsl(250 75% 57%)" />
    <path d="M16 12 L16 22" stroke="hsl(250 75% 57%)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 15 L10 19" stroke="hsl(250 75% 57%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 15 L22 19" stroke="hsl(250 75% 57%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 22 L11 30" stroke="hsl(250 75% 57%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 22 L21 30" stroke="hsl(250 75% 57%)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ─── Confetti Burst (CSS-only) ─── */
const ConfettiBurst = () => {
  const colors = ["#7C6FFF", "#00D4FF", "#FFB800", "#00E87A", "#FF6B35", "#FF3CAC"];
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    color: colors[i % colors.length],
    left: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 0.5}s`,
    size: 4 + Math.random() * 6,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute top-0 rounded-full pg-confetti"
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

/* ─── AI Processing Visual ─── */
const AIVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full pg-orbit-dot"
        style={{
          backgroundColor: "rgba(0,212,255,0.7)",
          animationDelay: `${i * 0.66}s`,
        }}
      />
    ))}
    <div
      className="absolute w-full h-[2px] pg-scan-line"
      style={{ backgroundColor: "rgba(0,212,255,0.3)" }}
    />
  </div>
);

/* ─── Main Component ─── */
const Playground = () => {
  const [stage, setStage] = useState(-1); // -1 = form, 0..5 = stages
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Lazy-load via IntersectionObserver
  useEffect(() => {
    injectRunnerCSS();
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance stages
  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length - 1) return;
    const timer = setTimeout(() => setStage((s) => s + 1), 2200);
    return () => clearTimeout(timer);
  }, [stage]);

  const handleSubmit = useCallback(() => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setStage(0);
  }, [leadName, leadEmail]);

  const handleReset = useCallback(() => {
    setStage(-1);
    setLeadName("");
    setLeadEmail("");
    setHoveredStage(null);
  }, []);

  const isRunning = stage >= 0 && stage < STAGES.length - 1;
  const isComplete = stage >= STAGES.length - 1;

  // Which explanation to show
  const activeExplanation = hoveredStage !== null ? hoveredStage : (stage >= 0 ? stage : null);

  return (
    <section
      ref={sectionRef}
      id="playground"
      className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden"
    >
      {/* BG decorations */}
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
                <div className="max-w-sm mx-auto mb-10 animate-fade-in">
                  <p className="text-sm font-semibold text-white/60 mb-4 text-center">
                    ⚡ Submit a sample lead to trigger the automation
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_-4px_hsl(250_75%_57%/0.4)] transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_-4px_hsl(250_75%_57%/0.4)] transition-all"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!leadName.trim() || !leadEmail.trim()}
                      className="group w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.97] flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      Fire Lead
                    </button>
                  </div>
                </div>
              )}

              {/* ── Pipeline Visualization ── */}
              {stage >= 0 && (
                <div className="relative">

                  {/* === DESKTOP: Horizontal === */}
                  <div className="hidden md:block">
                    {/* Track line */}
                    <div className="relative mx-8 mb-6">
                      <div className="h-[3px] rounded-full bg-white/10" />
                      <div
                        className="absolute top-0 left-0 h-[3px] rounded-full pg-progress-fill"
                        style={{
                          width: `${(stage / (STAGES.length - 1)) * 100}%`,
                          background: `linear-gradient(90deg, ${STAGES[0].color}, ${STAGES[Math.min(stage, STAGES.length - 1)].color})`,
                        }}
                      />
                      {/* Runner */}
                      {isRunning && (
                        <div
                          className="absolute -top-[14px] z-20 pg-progress-fill"
                          style={{ left: `${(stage / (STAGES.length - 1)) * 100}%`, marginLeft: "-14px" }}
                        >
                          <RunnerSVG />
                        </div>
                      )}
                    </div>

                    {/* Nodes row */}
                    <div className="flex justify-between">
                      {STAGES.map((s, idx) => {
                        const Icon = s.icon;
                        const isActive = idx <= stage;
                        const isCurrent = idx === stage && isRunning;
                        const isPast = idx < stage;
                        return (
                          <div
                            key={s.id}
                            className="flex flex-col items-center cursor-pointer"
                            style={{ width: `${100 / STAGES.length}%` }}
                            onMouseEnter={() => setHoveredStage(idx)}
                            onMouseLeave={() => setHoveredStage(null)}
                            onClick={() => setHoveredStage(hoveredStage === idx ? null : idx)}
                          >
                            <div className="relative">
                              {/* Pulse ring */}
                              {isCurrent && (
                                <div
                                  className="absolute inset-0 rounded-2xl pg-pulse-ring"
                                  style={{ border: `2px solid ${s.color}` }}
                                />
                              )}
                              {/* Node */}
                              <div
                                className="h-14 w-14 lg:h-16 lg:w-16 rounded-2xl flex items-center justify-center border-2 pg-node-glow relative overflow-hidden"
                                style={{
                                  borderColor: isActive ? s.color : "rgba(255,255,255,0.1)",
                                  backgroundColor: isActive ? `${s.color.replace(/[\d.]+\)$/, "0.12)")}` : "rgba(255,255,255,0.02)",
                                  boxShadow: isCurrent ? `0 0 30px -5px ${s.glow}` : isActive ? `0 0 15px -5px ${s.glow}` : "none",
                                }}
                              >
                                {isCurrent && s.id === "ai" && <AIVisual />}
                                <Icon
                                  className="h-5 w-5 lg:h-6 lg:w-6 relative z-10 transition-colors duration-500"
                                  style={{ color: isActive ? s.color : "rgba(255,255,255,0.2)" }}
                                />
                              </div>
                              {/* Checkmark */}
                              {isPast && (
                                <div className="absolute -top-1 -right-1 pg-check-pop">
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

                  {/* === MOBILE: Vertical === */}
                  <div className="md:hidden relative">
                    {/* Vertical track */}
                    <div className="absolute left-7 top-7 bottom-7 w-[3px] rounded-full bg-white/10">
                      <div
                        className="w-full rounded-full pg-progress-fill"
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
                              {isPast && (
                                <div className="absolute -top-1 -right-1 pg-check-pop">
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
                              {(isCurrent || hoveredStage === idx) && (
                                <p className="text-xs text-white/50 mt-1 leading-relaxed animate-fade-in">
                                  {s.explanation}
                                </p>
                              )}
                              {isCurrent && (
                                <p className="text-[11px] mt-1 font-medium animate-fade-in" style={{ color: s.color }}>
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
                  <div className="hidden md:block mt-8 min-h-[100px]">
                    {activeExplanation !== null && (
                      <div
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 animate-fade-in"
                        style={{ borderColor: `${STAGES[activeExplanation].color.replace(/[\d.]+\)$/, "0.25)")}` }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl shrink-0">{STAGES[activeExplanation].emoji}</span>
                          <div>
                            <p className="text-sm font-semibold text-white/90 mb-1.5">
                              {STAGES[activeExplanation].label}
                              <Tooltip text={`Stage ${activeExplanation + 1} of ${STAGES.length} in the automation pipeline.`} />
                            </p>
                            <p className="text-sm text-white/60 leading-relaxed">
                              {STAGES[activeExplanation].explanation}
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
                    <div className="mt-6 text-center animate-fade-in">
                      <p className="text-sm text-white/40">
                        Processing <span className="text-white/70 font-medium">{leadName}</span>'s lead…
                        <span className="text-white/30 ml-2">Step {stage + 1} of {STAGES.length}</span>
                      </p>
                    </div>
                  )}

                  {/* ── Completion ── */}
                  {isComplete && (
                    <div className="relative mt-10 text-center animate-fade-in">
                      <ConfettiBurst />
                      <div className="text-5xl mb-3">🎉</div>
                      <p className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
                        Automation Complete!
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="text-white/80 font-medium">{leadName}</span> ({leadEmail}) has been processed through the full pipeline.
                      </p>
                      <p className="text-xs text-white/35 mb-6 max-w-md mx-auto">
                        Lead captured → AI analyzed → Routed to pipeline → CRM updated → Dashboard notified → Client happy
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
            This is a visual demo — no actual data is sent. Want this for your business?{" "}
            <a href="#contact" className="text-primary hover:underline">Let's talk!</a>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Playground;
