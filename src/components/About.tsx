import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { Sparkles, Brain, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Brain, text: "AI-First Thinking", desc: "Building systems that learn and scale" },
  { icon: TrendingUp, text: "Revenue Impact", desc: "$40K+ in cost prevention" },
  { icon: Sparkles, text: "Cross-Functional", desc: "Sales × Marketing × Ops alignment" },
];

const About = () => (
  <section id="about" className="relative px-6 py-32">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">About</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl">
          About <span className="gradient-text">Me</span>
        </h2>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="mt-10 space-y-5 text-base leading-[1.9] text-muted-foreground">
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

      <FadeInSection delay={300}>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.text}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm card-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground">
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
