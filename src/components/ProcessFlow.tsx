import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, CheckCircle2 } from "lucide-react";
import FadeInSection from "./FadeInSection";
import NodeCanvas from "./n8n/NodeCanvas";

const steps = [
  {
    icon: Search,
    label: "Discover",
    duration: "Week 1",
    desc: "Audit current systems, map pain points, define success metrics.",
    deliverable: "Strategy doc",
  },
  {
    icon: PenTool,
    label: "Design",
    duration: "Week 1-2",
    desc: "Architect the workflow, choose tools, prototype the flow.",
    deliverable: "Visual blueprint",
  },
  {
    icon: Code2,
    label: "Build",
    duration: "Week 2-4",
    desc: "Develop, integrate APIs, write logic, test edge cases.",
    deliverable: "Working system",
  },
  {
    icon: Rocket,
    label: "Deploy",
    duration: "Week 4+",
    desc: "Launch, monitor, iterate. Train your team to own it.",
    deliverable: "Live + handover",
  },
];

const ProcessFlow = () => {
  return (
    <section id="process" className="relative px-4 sm:px-6 py-20 sm:py-28 bg-secondary/20">
      <div className="mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
              From idea to live system
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              A transparent four-step workflow — no black boxes, no surprises.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <NodeCanvas className="p-6 sm:p-10">
            {/* Hand-drawn flow line (desktop) */}
            <div className="hidden lg:block absolute top-[38%] left-16 right-16 pointer-events-none" aria-hidden="true">
              <svg
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
                className="w-full h-10 overflow-visible"
              >
                <defs>
                  <filter id="rough-ink" x="-5%" y="-50%" width="110%" height="200%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
                    <feDisplacementMap in="SourceGraphic" scale="2.2" />
                  </filter>
                </defs>
                {/* Slightly wobbly hand-drawn path */}
                <path
                  d="M 5 22 C 130 14, 260 30, 380 19 S 640 11, 760 24 S 930 18, 995 21"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.45)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  filter="url(#rough-ink)"
                />
                {/* Faint second pass for ink-bleed feel */}
                <path
                  d="M 5 23 C 130 15, 260 31, 380 20 S 640 12, 760 25 S 930 19, 995 22"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.18)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#rough-ink)"
                />
              </svg>
              {/* Traveling ink dot */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary/80 shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    {/* Node */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/40 bg-card shadow-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-md">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                      {step.duration}
                    </p>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {step.label}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 max-w-[200px]">
                      {step.desc}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                      <span className="text-[10px] font-semibold text-primary">{step.deliverable}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </NodeCanvas>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProcessFlow;
