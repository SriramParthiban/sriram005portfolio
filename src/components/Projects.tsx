import FadeInSection from "./FadeInSection";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projectsData";
import coralSunlight from "@/assets/coral-sunlight.webp";

const Projects = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (idx: number) => {
    if (idx === active) return;
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const next = () => goTo((active + 1) % projects.length);
  const prev = () => goTo((active - 1 + projects.length) % projects.length);

  const p = projects[active];
  const Icon = p.icon;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  // Pick 3 key before/after metrics to show
  const topMetrics = p.beforeAfter.slice(0, 3);

  return (
    <section id="projects" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={coralSunlight} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/40" />
      </div>
      <div className="relative mx-auto max-w-4xl">
        <FadeInSection>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Portfolio</p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            Key Projects
          </h2>
          <p className="mt-3 text-sm text-muted-foreground/70 max-w-md">
            A few things I've built that I'm proud of — real problems, real impact.
          </p>
        </FadeInSection>

        <div className="mt-10 sm:mt-14">
          {/* Project selector */}
          <div className="flex items-center gap-3 mb-10 rounded-xl bg-card/90 backdrop-blur-sm border border-border/40 px-3 py-2 shadow-sm">
            <button onClick={prev} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex-1 flex items-center justify-center gap-1 flex-wrap">
              {projects.map((proj, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground/60 hover:text-foreground/80"
                    }`}
                  >
                    {proj.title}
                    {isActive && (
                      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary/60" />
                    )}
                  </button>
                );
              })}
            </div>
            <button onClick={next} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Card */}
          <div className="relative">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden rounded-2xl border border-border/40 bg-card/95 backdrop-blur-sm shadow-sm"
              >
                {/* Header */}
                <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/80">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50 block">
                        Project {String(active + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-snug">
                        {p.fullTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* The Story: Problem → Solution flow */}
                <div className="px-6 sm:px-8 pb-6">
                  {/* Problem */}
                  <div className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive/60 mb-2">The Problem</p>
                    <p className="text-sm leading-relaxed text-muted-foreground/80">
                      {p.problemStatement.split('.').slice(0, 2).join('.') + '.'}
                    </p>
                  </div>

                  {/* Architecture Flow — visual pipeline */}
                  <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-3">How It Works</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {p.architectureSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className="group relative">
                            <div className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs font-medium text-foreground/80 transition-all hover:bg-primary/10 hover:border-primary/20 cursor-default">
                              {step.label}
                            </div>
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-card border border-border shadow-lg text-[11px] text-muted-foreground leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
                              {step.detail}
                            </div>
                          </div>
                          {idx < p.architectureSteps.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-primary/30 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Before → After metrics */}
                  <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/70 mb-3">The Results</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {topMetrics.map((m, idx) => (
                        <div key={idx} className="rounded-xl border border-border/60 bg-background/60 p-3.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-2">{m.metric}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground/40 line-through">{m.before}</span>
                            <ArrowRight className="h-3 w-3 text-primary/50" />
                            <span className="text-sm font-bold text-primary">{m.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Takeaway */}
                  <div className="mb-5 rounded-xl bg-primary/[0.03] border border-primary/10 p-4">
                    <div className="flex gap-3">
                      <Quote className="h-4 w-4 text-primary/30 shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed text-foreground/70 italic">
                        {p.keyTakeaway}
                      </p>
                    </div>
                  </div>

                  {/* Tech + CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border/30">
                    <p className="text-xs text-muted-foreground/50">
                      <span className="font-medium text-muted-foreground/70">Built with </span>
                      {p.tech.join(" · ")}
                    </p>
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link shrink-0"
                    >
                      Read full case study
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
