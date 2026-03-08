import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { Sparkles, Brain, TrendingUp, Zap, Target, Users } from "lucide-react";
import natureTree from "@/assets/nature-tree.webp";

const highlights = [
  { icon: Brain, text: "AI-First Thinking", desc: "Building systems that learn and scale" },
  { icon: TrendingUp, text: "Revenue Impact", desc: "$40K+ in cost prevention" },
  { icon: Sparkles, text: "Cross-Functional", desc: "Sales × Marketing × Ops alignment" },
];

const leftNotes = [
  { label: "Detail-Oriented", icon: Target, rotate: -4, bg: "#4ADE80", text: "#064E3B", top: "8%" },
  { label: "Team Player", icon: Users, rotate: 3, bg: "#FBBF24", text: "#78350F", top: "40%" },
  { label: "Self-Starter", icon: Zap, rotate: -2, bg: "#86EFAC", text: "#065F46", top: "72%" },
];

const rightNotes = [
  { label: "Fast Learner", icon: Zap, rotate: 3, bg: "#FCD34D", text: "#713F12", top: "12%" },
  { label: "Problem Solver", icon: Brain, rotate: -3, bg: "#6EE7B7", text: "#064E3B", top: "46%" },
  { label: "Data-Driven", icon: TrendingUp, rotate: 2, bg: "#F59E0B", text: "#7C2D12", top: "76%" },
];

const StickyNote = ({
  note,
  side,
  idx,
}: {
  note: (typeof leftNotes)[0];
  side: "left" | "right";
  idx: number;
}) => {
  const Icon = note.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: note.rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
      className="absolute z-10"
      style={{ top: note.top, [side]: "0" }}
    >
      <div
        className="relative w-[90px] h-[90px] md:w-[100px] md:h-[100px] flex flex-col items-center justify-center gap-1.5 shadow-lg"
        style={{
          background: note.bg,
          borderRadius: "2px",
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 11px, #000 11px, #000 12px)",
        }} />
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 rounded-sm opacity-40"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2))" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[14px] h-[14px]"
          style={{
            background: `linear-gradient(135deg, ${note.bg}00 40%, rgba(0,0,0,0.15) 100%)`,
          }}
        />
        <Icon className="h-5 w-5 md:h-6 md:w-6 drop-shadow-sm" style={{ color: note.text }} />
        <span
          className="text-[9px] md:text-[10px] font-bold tracking-wide text-center leading-tight px-1"
          style={{ color: note.text, fontFamily: "'Nunito Sans', sans-serif" }}
        >
          {note.label}
        </span>
      </div>
    </motion.div>
  );
};

const About = () => (
  <section id="about" className="relative px-4 sm:px-6 py-20 sm:py-28 overflow-hidden">
    {/* Nature image background */}
    <div className="absolute inset-0 bg-muted/30" />

    {/* Left side sticky notes */}
    <div className="hidden lg:block absolute top-0 bottom-0 left-2 lg:left-8 xl:left-16 w-[110px]">
      {leftNotes.map((note, idx) => (
        <StickyNote key={note.label} note={note} side="left" idx={idx} />
      ))}
    </div>

    {/* Right side sticky notes */}
    <div className="hidden lg:block absolute top-0 bottom-0 right-2 lg:right-8 xl:right-16 w-[110px]">
      {rightNotes.map((note, idx) => (
        <StickyNote key={note.label} note={note} side="right" idx={idx} />
      ))}
    </div>

    {/* Mobile: horizontal scrollable sticky notes */}
    <div className="lg:hidden relative mx-auto max-w-3xl mb-6">
      <FadeInSection delay={50}>
        <div className="-mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-themed">
            {[...leftNotes, ...rightNotes].map((note, idx) => {
              const Icon = note.icon;
              return (
                <motion.div
                  key={note.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="flex-shrink-0"
                >
                  <div
                    className="relative w-[80px] h-[80px] flex flex-col items-center justify-center gap-1 shadow-lg"
                    style={{
                      background: note.bg,
                      borderRadius: "2px",
                      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                      transform: `rotate(${note.rotate}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 opacity-[0.06]" style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 9px, #000 9px, #000 10px)",
                    }} />
                    <Icon className="h-4 w-4" style={{ color: note.text }} />
                    <span
                      className="text-[8px] font-bold tracking-wide text-center leading-tight px-1"
                      style={{ color: note.text }}
                    >
                      {note.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeInSection>
    </div>

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">Who I Am</p>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
          About Me
        </h2>
      </FadeInSection>

      <FadeInSection delay={200}>
        <div className="mt-10 space-y-5 text-sm sm:text-base leading-[1.9] text-muted-foreground">
          <p>
            I architect intelligent automation systems at the intersection of{" "}
            <strong className="text-foreground font-semibold">AI, revenue operations, and go-to-market strategy</strong>.
            My work focuses on designing scalable outbound and qualification frameworks powered by AI agents—translating
            prospect signals into pipeline-ready opportunities with minimal manual overhead.
          </p>
          <p>
            With hands-on experience building systems that manage{" "}
            <strong className="text-foreground font-semibold">1,000+ daily interactions</strong>, I bring a deep understanding
            of workflow orchestration, CRM integration, and data-driven decision-making. I've designed KPI tracking engines,
            lead routing architectures, and spend monitoring systems that have prevented over{" "}
            <strong className="text-foreground font-semibold">$40,000</strong> in unnecessary costs.
          </p>
          <p>
            My approach is rooted in experimentation and cross-functional collaboration. I build feedback loops between
            sales, marketing, and operations teams—ensuring every automation decision is backed by real performance data.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection delay={350}>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.text}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold text-foreground font-display">{h.text}</p>
                <p className="mt-1 text-xs text-muted-foreground">{h.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default About;