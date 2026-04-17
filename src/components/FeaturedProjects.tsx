import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import FadeInSection from "./FadeInSection";
import NodeCanvas from "./n8n/NodeCanvas";
import { projects } from "@/data/projectsData";

const FeaturedProjects = () => {
  const featured = projects.slice(0, 3);

  return (
    <section id="featured-projects" className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
                Featured Work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
                Systems shipped, problems solved
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group shrink-0"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <NodeCanvas className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((p, idx) => {
                const Icon = p.icon;
                const topMetric = p.beforeAfter[0];
                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link
                      to={`/projects/${p.slug}`}
                      className="group block h-full rounded-xl border border-border bg-card overflow-hidden shadow-md hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 will-change-transform"
                    >
                      {/* Node header (n8n-style) */}
                      <div className="bg-gradient-to-r from-primary/15 to-accent/10 px-4 py-2.5 flex items-center justify-between border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20">
                            <Icon className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            project_{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">live</span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <h3 className="text-base font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                          {p.description}
                        </p>

                        {/* Headline metric */}
                        {topMetric && (
                          <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 mb-4">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                              {topMetric.metric}
                            </p>
                            <p className="text-lg font-bold text-primary leading-tight">
                              {topMetric.after}
                            </p>
                          </div>
                        )}

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                          Read case study
                          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
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

export default FeaturedProjects;
