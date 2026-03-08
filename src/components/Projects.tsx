import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projectsData";

const Projects = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showProof, setShowProof] = useState(false);

  const goTo = (idx: number) => {
    if (idx === active) return;
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
    setShowProof(false);
  };

  const next = () => goTo((active + 1) % projects.length);
  const prev = () => goTo((active - 1 + projects.length) % projects.length);

  const p = projects[active];
  const Icon = p.icon;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  return (
    <section id="projects" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">Portfolio</p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            Key Projects
          </h2>
        </FadeInSection>

        <div className="mt-10 sm:mt-14">
          {/* Project selector */}
          <div className="flex items-center gap-2 mb-8">
            <button onClick={prev} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
              {projects.map((proj, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-display font-semibold transition-all duration-400 ${
                      isActive
                        ? "bg-primary text-white shadow-[0_0_24px_-4px_hsl(var(--primary)/0.3)]"
                        : "bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {proj.title}
                    {isActive && (
                      <motion.div
                        layoutId="project-pill"
                        className="absolute inset-0 rounded-full bg-primary -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <button onClick={next} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Counter */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs font-mono text-muted-foreground/50">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === active ? "w-6 bg-primary" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="relative min-h-[320px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className={`h-1 bg-gradient-to-r ${p.color}`} />
                <div className="p-5 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} p-[1px]`}>
                      <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-card transition-all duration-300 group-hover:bg-transparent">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-colors group-hover:text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-snug">{p.fullTitle}</h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {p.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="border border-border bg-muted text-muted-foreground text-xs font-medium transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {p.proofImage && (
                      <button
                        onClick={() => setShowProof(!showProof)}
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-accent bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-md min-h-[44px]"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {showProof ? "Hide Output" : "See It in Action"}
                      </button>
                    )}
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md min-h-[44px]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Read Case Study
                    </Link>
                  </div>

                  <AnimatePresence>
                    {showProof && p.proofImage && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-3">
                          <div className="overflow-hidden rounded-xl border border-border bg-muted/50">
                            <div className="border-b border-border bg-accent/5 px-4 py-2">
                              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.proofLabel}</span>
                            </div>
                            <img src={p.proofImage} alt={`${p.fullTitle} - proof`} className="w-full" loading="lazy" />
                          </div>
                          {p.extraImages.map((img) => (
                            <div key={img.label} className="overflow-hidden rounded-xl border border-border bg-muted/50">
                              <div className="border-b border-border bg-primary/5 px-4 py-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-primary">📎 {img.label}</span>
                              </div>
                              <img src={img.src} alt={img.label} className="w-full" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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