import FadeInSection from "./FadeInSection";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projectsData";
import coralSunlight from "@/assets/coral-sunlight.webp";

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
      <div className="absolute inset-0">
        <img src={coralSunlight} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/40" />
      </div>
      <div className="relative mx-auto max-w-3xl">
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
          {/* Project selector — simple text tabs */}
          <div className="flex items-center gap-2 mb-10">
            <button onClick={prev} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex-1 flex items-center justify-center gap-1 flex-wrap">
              {projects.map((proj, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`relative px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-foreground bg-card/80 shadow-sm border border-border/50"
                        : "text-muted-foreground/60 hover:text-foreground/80"
                    }`}
                  >
                    {proj.title}
                  </button>
                );
              })}
            </div>
            <button onClick={next} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
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
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/95 backdrop-blur-sm"
              >
                <div className="p-6 sm:p-8">
                  {/* Simple icon + title */}
                  <div className="flex items-center gap-3 mb-1">
                    <Icon className="h-5 w-5 text-primary/70" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
                      Project {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-snug mt-2">
                    {p.fullTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80 max-w-xl">
                    {p.description}
                  </p>

                  {/* Divider */}
                  <div className="my-5 h-px bg-border/40" />

                  {/* Metrics as simple list */}
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {p.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-2 text-sm text-foreground/70">
                        <span className="text-primary/60">→</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech as plain text */}
                  <p className="mt-5 text-xs text-muted-foreground/50">
                    <span className="font-medium text-muted-foreground/70">Built with </span>
                    {p.tech.join(" · ")}
                  </p>

                  {/* Actions — understated */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      Read case study
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                    {p.proofImage && (
                      <button
                        onClick={() => setShowProof(!showProof)}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                      >
                        {showProof ? "Hide preview" : "See it in action"}
                      </button>
                    )}
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