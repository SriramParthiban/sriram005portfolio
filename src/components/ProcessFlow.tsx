import { motion } from "framer-motion";
import { Compass, Hammer, Bug, Flag } from "lucide-react";
import FadeInSection from "./FadeInSection";

const stops = [
  {
    icon: Compass,
    label: "Discover and Design",
    week: "week 1",
    desc: "We sit down, untangle the mess, sketch the workflow on paper before any code shows up.",
    deliverable: "a clear blueprint",
    aside: "this is where weeks get saved later",
  },
  {
    icon: Hammer,
    label: "Build",
    week: "week 1 to 3",
    desc: "Wiring APIs, writing the logic, breaking things on purpose so they hold up in the wild.",
    deliverable: "a working system",
    aside: "coffee count: classified",
  },
  {
    icon: Bug,
    label: "Test and Evaluate",
    week: "week 4",
    desc: "Edge cases, weird inputs, what-ifs. We try to break it before any of your users can.",
    deliverable: "a sturdy, tested build",
    aside: "if it bends, we fix it now",
  },
  {
    icon: Flag,
    label: "Deploy",
    week: "week 4 and beyond",
    desc: "Go live, watch the dashboards, train your team so they fully own it after I'm gone.",
    deliverable: "live + handover",
    aside: "the part everyone celebrates",
  },
];

const ProcessFlow = () => {
  return (
    <section
      id="process"
      className="relative px-4 sm:px-6 py-20 sm:py-28 overflow-hidden bg-secondary/20"
    >
      {/* Faint grid like surveyor paper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* corner compass scribble */}
      <svg
        aria-hidden
        viewBox="0 0 80 80"
        className="hidden md:block absolute top-10 right-10 w-20 h-20 text-accent/60"
      >
        <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 4" />
        <path d="M40 14 L44 40 L40 66 L36 40 Z" fill="currentColor" opacity="0.7" />
        <text x="40" y="11" textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="Caveat, cursive">N</text>
      </svg>

      <div className="relative mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-16">
            <p
              className="font-handwritten text-2xl sm:text-3xl text-primary mb-1"
              style={{ transform: "rotate(-2deg)" }}
            >
              the route I take
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
              From a messy idea
              <span className="relative inline-block mx-2">
                <span className="relative z-10">to a live system</span>
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
              Think of it less like a process diagram and more like a trail map —
              four honest stops between "what if" and "it's live".
            </p>
          </div>
        </FadeInSection>

        {/* === DESKTOP: trail map === */}
        <div className="hidden lg:block relative h-[760px]">
          {/* The winding path — threaded through every pin */}
          <svg
            aria-hidden
            viewBox="0 0 1200 760"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/*
              Anchors (cx, cy) it must pass through:
                start    ( 30, 700)
                pin 1    (225, 410)  top of card 1
                pin 2    (486, 320)  bottom of card 2
                pin 3    (813, 410)  top of card 3
                pin 4    (1074, 320) bottom of card 4
                end      (1170, 60)
            */}
            {/* shadow path */}
            <path
              d="M 30 700 C 100 700, 160 560, 225 410 S 400 220, 486 320 S 700 520, 813 410 S 970 220, 1074 320 S 1150 140, 1170 60"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeOpacity="0.08"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* dashed trail */}
            <path
              d="M 30 700 C 100 700, 160 560, 225 410 S 400 220, 486 320 S 700 520, 813 410 S 970 220, 1074 320 S 1150 140, 1170 60"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.75"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 10"
            />
          </svg>

          {/* Stops — alternating bottom / top so the trail can weave through */}
          {[
            { left: "4%", top: "56%", rotate: -2.4, pin: "top" },
            { left: "28%", top: "4%", rotate: 1.8, pin: "bottom" },
            { left: "52%", top: "56%", rotate: -1.6, pin: "top" },
            { left: "76%", top: "4%", rotate: 2.2, pin: "bottom" },
          ].map((pos, idx) => {
            const stop = stops[idx];
            const Icon = stop.icon;
            const pinTop = pos.pin === "top";
            return (
              <motion.div
                key={stop.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: idx * 0.18 }}
                whileHover={{ rotate: 0, y: -4 }}
                style={{ left: pos.left, top: pos.top, transform: `rotate(${pos.rotate}deg)` }}
                className="absolute w-[300px]"
              >
                {/* push-pin — top or bottom depending on where the trail meets it */}
                <div
                  aria-hidden
                  className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_2px_4px_rgba(0,0,0,0.4)] ring-2 ring-card z-10 ${
                    pinTop ? "-top-2" : "-bottom-2"
                  }`}
                />
                <div className="relative bg-card border border-border rounded-md p-6 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)]">
                  {/* stop number */}
                  <div
                    className="absolute -top-4 -left-3 font-handwritten text-3xl text-accent bg-card px-2 leading-none"
                    style={{ transform: "rotate(-8deg)" }}
                  >
                    stop 0{idx + 1}
                  </div>

                  <div className="flex items-center gap-3 mb-3 mt-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-primary/60 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className="font-handwritten text-xl text-foreground/80"
                      style={{ transform: "rotate(-1deg)" }}
                    >
                      {stop.week}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-2 leading-tight">
                    {stop.label}
                  </h3>
                  <p className="text-[15px] text-foreground/75 leading-relaxed mb-3">
                    {stop.desc}
                  </p>

                  <div className="flex items-baseline gap-2 pt-2 border-t border-dashed border-border">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">you get</span>
                    <span className="font-handwritten text-xl text-primary leading-none">
                      {stop.deliverable}
                    </span>
                  </div>

                  <p
                    className="font-handwritten text-lg text-foreground/70 mt-2 italic"
                    style={{ transform: "rotate(-0.6deg)" }}
                  >
                    ↳ {stop.aside}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Start label */}
          <div
            className="absolute font-handwritten text-2xl text-foreground/80"
            style={{ left: "0%", top: "95%", transform: "rotate(-4deg)" }}
          >
            ✱ you are here
          </div>
          {/* End flag */}
          <div
            className="absolute font-handwritten text-2xl text-primary"
            style={{ right: "0%", top: "1%", transform: "rotate(4deg)" }}
          >
            🏁 live system
          </div>
        </div>

        {/* === MOBILE / TABLET: vertical trail === */}
        <div className="lg:hidden relative">
          {/* vertical dashed trail */}
          <div
            aria-hidden
            className="absolute left-7 top-4 bottom-4 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, hsl(var(--primary) / 0.7) 0 6px, transparent 6px 14px)",
            }}
          />
          <div className="space-y-8">
            {stops.map((stop, idx) => {
              const Icon = stop.icon;
              const rot = idx % 2 === 0 ? -1.6 : 1.8;
              return (
                <FadeInSection key={stop.label} delay={idx * 90}>
                  <div className="relative pl-16">
                    {/* trail node */}
                    <div className="absolute left-4 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-card border-2 border-primary shadow-md">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 0 }}
                      style={{ transform: `rotate(${rot}deg)` }}
                      className="relative bg-card border border-border rounded-md p-4 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.3)]"
                    >
                      <div
                        className="absolute -top-3 right-3 font-handwritten text-xl text-accent bg-card px-1.5 leading-none"
                        style={{ transform: "rotate(6deg)" }}
                      >
                        stop 0{idx + 1}
                      </div>
                      <div className="flex items-baseline justify-between mb-1 gap-2">
                        <h3 className="text-lg font-display font-bold text-foreground">
                          {stop.label}
                        </h3>
                        <span className="font-handwritten text-base text-foreground/70 shrink-0">
                          {stop.week}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed mb-2">
                        {stop.desc}
                      </p>
                      <div className="flex items-baseline gap-1.5 pt-1.5 border-t border-dashed border-border">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">you get</span>
                        <span className="font-handwritten text-lg text-primary leading-none">
                          {stop.deliverable}
                        </span>
                      </div>
                      <p
                        className="font-handwritten text-base text-foreground/70 mt-1.5 italic"
                      >
                        ↳ {stop.aside}
                      </p>
                    </motion.div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>

        {/* Closing handwritten note */}
        <FadeInSection delay={400}>
          <div className="mt-14 lg:mt-10 flex justify-center">
            <p
              className="font-handwritten text-2xl text-foreground text-center"
              style={{ transform: "rotate(-1deg)" }}
            >
              that's the whole trail. four weeks, no fluff.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProcessFlow;
