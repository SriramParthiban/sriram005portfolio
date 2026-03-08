import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Database, BarChart3, UserCheck, PartyPopper, RotateCcw } from "lucide-react";
import FadeInSection from "./FadeInSection";

const STAGES = [
  { id: "idle", label: "Submit a Lead", icon: Send, color: "hsl(var(--primary))" },
  { id: "running", label: "AI Processing", icon: Bot, color: "#06B6D4" },
  { id: "pipeline", label: "Lead Pipeline", icon: Database, color: "#F59E0B" },
  { id: "crm", label: "CRM Updated", icon: BarChart3, color: "#10B981" },
  { id: "dashboard", label: "Admin Dashboard", icon: UserCheck, color: "#8B5CF6" },
  { id: "done", label: "Client Notified 🎉", icon: PartyPopper, color: "#EC4899" },
];

const RunnerSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="drop-shadow-lg">
    <circle cx="16" cy="8" r="4" fill="hsl(var(--primary))" />
    <motion.g
      animate={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M16 12 L16 22" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 15 L10 19" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 15 L22 19" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 22 L11 30" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 22 L21 30" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    </motion.g>
  </svg>
);

const Playground = () => {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");

  useEffect(() => {
    if (!running || stage >= STAGES.length - 1) return;
    const timer = setTimeout(() => setStage((s) => s + 1), 1800);
    return () => clearTimeout(timer);
  }, [running, stage]);

  const handleSubmit = () => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setStage(1);
    setRunning(true);
  };

  const handleReset = () => {
    setStage(0);
    setRunning(false);
    setLeadName("");
    setLeadEmail("");
  };

  const isComplete = stage >= STAGES.length - 1;

  return (
    <section id="playground" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 h-[200px] w-[200px] md:h-[350px] md:w-[350px] rounded-full bg-primary/6 blur-[100px] md:blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[180px] w-[180px] md:h-[300px] md:w-[300px] rounded-full bg-accent/5 blur-[80px] md:blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-4xl">
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
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              See how a lead flows through an intelligent automation pipeline — from submission to happy client.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10">
            {/* Lead form */}
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-sm mx-auto mb-10"
                >
                  <p className="text-sm font-semibold text-white/70 mb-4 text-center">
                    ⚡ Submit a sample lead to trigger the automation
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Lead name..."
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Lead email..."
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!leadName.trim() || !leadEmail.trim()}
                      className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Enter the Lead
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pipeline visualization */}
            <div className="relative">
              {/* Desktop: horizontal pipeline */}
              <div className="hidden sm:flex items-start justify-between relative">
                {/* Connecting line */}
                <div className="absolute top-8 left-8 right-8 h-[2px] bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(stage / (STAGES.length - 1)) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                {/* Runner animation on the line */}
                {running && !isComplete && (
                  <motion.div
                    className="absolute top-[-4px] z-20"
                    animate={{
                      left: `${((stage) / (STAGES.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ marginLeft: "-16px" }}
                  >
                    <RunnerSVG />
                  </motion.div>
                )}

                {STAGES.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = idx <= stage && running;
                  const isCurrent = idx === stage && running;
                  return (
                    <div key={s.id} className="flex flex-col items-center relative z-10" style={{ width: `${100 / STAGES.length}%` }}>
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.2 : 1,
                          boxShadow: isCurrent ? `0 0 30px -5px ${s.color}` : "none",
                        }}
                        transition={{ duration: 0.4 }}
                        className={`h-16 w-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                          isActive
                            ? "border-white/30 bg-white/10"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                        style={isActive ? { borderColor: s.color, backgroundColor: `${s.color}15` } : {}}
                      >
                        <Icon
                          className="h-6 w-6 transition-colors duration-500"
                          style={{ color: isActive ? s.color : "rgba(255,255,255,0.25)" }}
                        />
                      </motion.div>
                      <p className={`mt-3 text-xs font-semibold text-center transition-colors duration-500 ${
                        isActive ? "text-white/90" : "text-white/30"
                      }`}>
                        {s.label}
                      </p>

                      {/* Pulse ring on current */}
                      {isCurrent && (
                        <motion.div
                          className="absolute top-0 h-16 w-16 rounded-2xl"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ borderColor: s.color, border: `2px solid ${s.color}` }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile: vertical pipeline */}
              <div className="sm:hidden space-y-4 relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-white/10">
                  <motion.div
                    className="w-full bg-gradient-to-b from-primary via-accent to-primary"
                    initial={{ height: "0%" }}
                    animate={{ height: `${(stage / (STAGES.length - 1)) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                {STAGES.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = idx <= stage && running;
                  const isCurrent = idx === stage && running;
                  return (
                    <div key={s.id} className="flex items-center gap-4 relative z-10">
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.15 : 1,
                          boxShadow: isCurrent ? `0 0 25px -5px ${s.color}` : "none",
                        }}
                        transition={{ duration: 0.4 }}
                        className={`h-14 w-14 shrink-0 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                          isActive ? "border-white/30 bg-white/10" : "border-white/10 bg-white/[0.03]"
                        }`}
                        style={isActive ? { borderColor: s.color, backgroundColor: `${s.color}15` } : {}}
                      >
                        <Icon
                          className="h-5 w-5 transition-colors duration-500"
                          style={{ color: isActive ? s.color : "rgba(255,255,255,0.25)" }}
                        />
                      </motion.div>
                      <div>
                        <p className={`text-sm font-semibold transition-colors duration-500 ${
                          isActive ? "text-white/90" : "text-white/30"
                        }`}>
                          {s.label}
                        </p>
                        {isCurrent && running && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs mt-0.5"
                            style={{ color: s.color }}
                          >
                            Processing...
                          </motion.p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completion message */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                    className="text-4xl mb-3"
                  >
                    🎉
                  </motion.div>
                  <p className="text-lg font-display font-bold text-foreground mb-1">
                    Automation Complete!
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="text-white/80 font-medium">{leadName}</span> ({leadEmail}) has been processed through the full pipeline.
                  </p>
                  <p className="text-xs text-white/40 mb-6">
                    Lead captured → AI processed → Pipeline updated → CRM synced → Dashboard live → Client notified
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Running status */}
            {running && !isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-white/50">
                  Processing <span className="text-white/80 font-medium">{leadName}</span>'s lead through the automation pipeline...
                </p>
              </motion.div>
            )}
          </div>
        </FadeInSection>

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
