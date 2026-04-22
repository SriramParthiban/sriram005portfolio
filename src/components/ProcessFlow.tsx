import { motion } from "framer-motion";
import { Search, Code2, Rocket, FlaskConical } from "lucide-react";
import FadeInSection from "./FadeInSection";

const steps = [
  {
    icon: Search,
    label: "Discover and Design",
    duration: "Week 1",
    desc: "I sit with you, learn the mess, sketch the workflow on paper before touching any code.",
    deliverable: "a clear blueprint",
    note: "this is where we save weeks later",
    rotate: -2.2,
    accent: "hsl(152, 55%, 32%)",
  },
  {
    icon: Code2,
    label: "Build",
    duration: "Week 1 to 3",
    desc: "Wiring APIs, writing the logic, breaking things on purpose so they hold up in production.",
    deliverable: "a working system",
    note: "coffee count: classified",
    rotate: 1.8,
    accent: "hsl(38, 75%, 48%)",
  },
  {
    icon: FlaskConical,
    label: "Test and Evaluate",
    duration: "Week 4",
    desc: "Edge cases, weird inputs, what-ifs. We try to break it before your users ever can.",
    deliverable: "a tested, sturdy build",
    note: "if it bends, we fix it now",
    rotate: -1.4,
    accent: "hsl(152, 55%, 32%)",
  },
  {
    icon: Rocket,
    label: "Deploy",
    duration: "Week 4 and beyond",
    desc: "Go live, watch the dashboards, train your team so they own it long after I'm gone.",
    deliverable: "live + handover",
    note: "the part everyone celebrates",
    rotate: 2.4,
    accent: "hsl(38, 75%, 48%)",
  },
];

const ProcessFlow = () => {
  return (
    <section
      id="process"
      className="relative px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-secondary/20"
    >
      {/* Notebook paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 31px, hsl(var(--border)) 31px 32px)",
        }}
      />
      {/* Soft margin line, like a notebook */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-12 w-px bg-accent/30 hidden md:block"
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p
              className="font-handwritten text-2xl sm:text-3xl text-primary mb-1"
              style={{ transform: "rotate(-2deg)" }}
            >
              how it actually goes
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
              From a messy idea
              <span className="relative inline-block mx-2">
                <span className="relative z-10">to a live system</span>
                {/* hand-drawn underline */}
                <svg
                  aria-hidden
                  viewBox="0 0 220 12"
                  className="absolute left-0 -bottom-2 w-full h-3 text-accent"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7 Q 60 1, 120 6 T 218 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              No black boxes. No agency-speak. Just four honest weeks, drawn out
              the way I'd explain it on a whiteboard.
            </p>
          </div>
        </FadeInSection>

        {/* Cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <FadeInSection key={step.label} delay={idx * 90}>
                <motion.div
                  whileHover={{ rotate: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ transform: `rotate(${step.rotate}deg)` }}
                  className="relative"
                >
                  {/* Tape */}
                  <div
                    aria-hidden
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-accent/40 backdrop-blur-sm rounded-sm shadow-sm"
                    style={{ transform: "translateX(-50%) rotate(-3deg)" }}
                  />

                  {/* Card */}
                  <div className="relative bg-card border border-border/70 rounded-md p-5 pt-7 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]">
                    {/* Step number, scribbled */}
                    <div
                      className="absolute -top-4 -right-3 font-handwritten text-3xl text-accent"
                      style={{ transform: "rotate(8deg)" }}
                    >
                      {`0${idx + 1}.`}
                    </div>

                    {/* Icon + week */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed"
                        style={{
                          borderColor: step.accent,
                          color: step.accent,
                          backgroundColor: "hsl(var(--background))",
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className="font-handwritten text-lg text-muted-foreground"
                        style={{ transform: "rotate(-1deg)" }}
                      >
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {step.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {step.desc}
                    </p>

                    {/* Hand-drawn divider */}
                    <svg
                      aria-hidden
                      viewBox="0 0 200 6"
                      className="w-full h-2 text-border mb-3"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 3 Q 50 0, 100 3 T 198 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Deliverable */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        you get
                      </span>
                      <span
                        className="font-handwritten text-lg leading-none"
                        style={{ color: step.accent }}
                      >
                        {step.deliverable}
                      </span>
                    </div>

                    {/* Margin note */}
                    <p
                      className="font-handwritten text-sm text-muted-foreground/80 mt-3 italic"
                      style={{ transform: "rotate(-0.8deg)" }}
                    >
                      ↳ {step.note}
                    </p>
                  </div>
                </motion.div>
              </FadeInSection>
            );
          })}
        </div>

        {/* Closing handwritten note */}
        <FadeInSection delay={400}>
          <div className="mt-14 flex justify-center">
            <div className="relative max-w-md text-center">
              <svg
                aria-hidden
                viewBox="0 0 60 40"
                className="absolute -left-12 top-2 w-10 h-8 text-accent hidden sm:block"
              >
                <path
                  d="M5 35 Q 25 30, 40 15 L 38 22 M 40 15 L 33 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className="font-handwritten text-2xl text-foreground"
                style={{ transform: "rotate(-1.2deg)" }}
              >
                that's it. four weeks, no fluff.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Most projects ship in this window. Bigger ones get the same
                rhythm, just a couple more loops.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProcessFlow;
