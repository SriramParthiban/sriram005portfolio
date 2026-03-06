import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { Sparkles, Brain, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Brain, text: "AI-First Thinking", desc: "Building systems that learn and scale" },
  { icon: TrendingUp, text: "Revenue Impact", desc: "$40K+ in cost prevention" },
  { icon: Sparkles, text: "Cross-Functional", desc: "Sales × Marketing × Ops alignment" },
];

const About = () => (
  <section id="about" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 right-0 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-[#7C3AED]/8 blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-0 -left-20 h-[125px] w-[125px] md:h-[250px] md:w-[250px] rounded-full bg-[#06B6D4]/6 blur-[60px] md:blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    {/* Desktop: curly braces watermark */}
    <div className="pointer-events-none absolute top-20 left-6 text-9xl font-display font-bold text-white/[0.05] select-none hidden md:block">{"{"}</div>
    <div className="pointer-events-none absolute bottom-20 right-6 text-9xl font-display font-bold text-white/[0.05] select-none hidden md:block">{"}"}</div>

    {/* Mobile: gradient accent lines + drifting orb */}
    <div className="pointer-events-none absolute top-16 right-4 h-24 w-[1.5px] rounded-full bg-gradient-to-b from-[#7C3AED]/25 via-[#06B6D4]/15 to-transparent animate-[pulseFade_5s_ease-in-out_infinite] md:hidden" />
    <div className="pointer-events-none absolute bottom-20 left-4 h-4 w-4 rounded-full bg-gradient-to-br from-[#7C3AED]/15 to-[#06B6D4]/10 blur-[3px] animate-drift md:hidden" />
    <div className="pointer-events-none absolute top-1/2 right-3 h-6 w-6 rounded-tl-lg border-t border-l border-[#7C3AED]/10 animate-border-glow md:hidden" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">About</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
          About <span className="gradient-text">Me</span>
        </h2>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="mt-10 space-y-5 text-sm sm:text-base leading-[1.9] text-white/60">
          <p>
            I architect intelligent automation systems at the intersection of{" "}
            <strong className="text-white font-semibold">AI, revenue operations, and go-to-market strategy</strong>.
            My work focuses on designing scalable outbound and qualification frameworks powered by AI agents—translating
            prospect signals into pipeline-ready opportunities with minimal manual overhead.
          </p>
          <p>
            With hands-on experience building systems that manage{" "}
            <strong className="text-white font-semibold">1,000+ daily interactions</strong>, I bring a deep understanding
            of workflow orchestration, CRM integration, and data-driven decision-making. I've designed KPI tracking engines,
            lead routing architectures, and spend monitoring systems that have prevented over{" "}
            <strong className="text-white font-semibold">$40,000</strong> in unnecessary costs.
          </p>
          <p>
            My approach is rooted in experimentation and cross-functional collaboration. I build feedback loops between
            sales, marketing, and operations teams—ensuring every automation decision is backed by real performance data.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection delay={300}>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.text}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-white/8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold text-white font-display">{h.text}</p>
                <p className="mt-1 text-xs text-white/40">{h.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default About;
