import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Zap, BarChart3, Database, Mail, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import dentbooksProof from "@/assets/dentbooks-email-proof.png";
import multichannelDashboard from "@/assets/multichannel-dashboard.png";
import kpiDashboard from "@/assets/kpi-tracking-dashboard.png";
import dataIntegrationWorkflow from "@/assets/data-integration-workflow.png";
import ghlWorkflowOverview from "@/assets/ghl-workflow-overview.png";
import ghlWorkflowBranches from "@/assets/ghl-workflow-branches.png";
import ghlEmailCompose from "@/assets/ghl-email-compose.png";
import ghlPipelineStages from "@/assets/ghl-pipeline-stages.png";

const projects = [
  {
    title: "Multi-Channel Customer Requirements Automation Platform",
    description: "AI-powered discovery and qualification system automating customer requirements gathering across voice, chat, and SMS channels. Built using Lovable.",
    metrics: ["Reduced documentation time by 70%", "99% data accuracy", "1,000+ interactions/day", "Real-time CRM sync"],
    tech: ["AI Agents", "n8n", "REST APIs", "CRM Integration", "NLP", "Lovable"],
    icon: Zap,
    accentColor: "from-primary to-primary/60",
    proofImage: multichannelDashboard,
    proofLabel: "✅ Live Dashboard — Final Output",
    extraImages: [],
  },
  {
    title: "Automated KPI Tracking & Call Optimization Engine",
    description: "Real-time performance monitoring system with automated anomaly detection and call quality optimization.",
    metrics: ["Call completion: 67% → 97%", "Invalid leads reduced by 90%", "15+ hours/week saved", "Real-time dashboards"],
    tech: ["Python", "SQL", "Power BI", "Automation", "Analytics"],
    icon: BarChart3,
    accentColor: "from-accent to-accent/60",
    proofImage: kpiDashboard,
    proofLabel: "✅ Live Dashboard — Call Center Performance",
    extraImages: [],
  },
  {
    title: "Intelligent Data Integration System",
    description: "End-to-end data pipeline collecting via GoHighLevel and n8n webhooks, validating and syncing to monday.com with intelligent routing and real-time alerting.",
    metrics: ["Errors reduced by 80%", "Improved SLA compliance", "Real-time alerting", "Zero-touch processing"],
    tech: ["n8n", "monday.com", "GoHighLevel", "Webhooks", "Data Validation", "ETL"],
    icon: Database,
    accentColor: "from-primary to-accent",
    proofImage: dataIntegrationWorkflow,
    proofLabel: "✅ Live Workflow — n8n Automation Pipeline",
    extraImages: [],
  },
  {
    title: "GoHighLevel Email Automation Workflow",
    description: "Automated lead nurturing pipeline that triggers personalized email sequences when new opportunities or form submissions arrive.",
    metrics: ["Instant lead response time", "Automated booking link delivery", "Trigger-based email sequences", "Zero manual follow-up needed"],
    tech: ["GoHighLevel", "Email Automation", "Workflows", "Lead Nurturing", "CRM"],
    icon: Mail,
    accentColor: "from-accent to-primary",
    proofImage: dentbooksProof,
    proofLabel: "✅ Live Output — Automated Email Delivered",
    extraImages: [
      { src: ghlWorkflowOverview, label: "Full Workflow Overview" },
      { src: ghlWorkflowBranches, label: "Condition-Based Branching Logic" },
      { src: ghlEmailCompose, label: "Personalized Email Template" },
      { src: ghlPipelineStages, label: "Pipeline Stage Management" },
    ],
  },
];

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showProof, setShowProof] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goTo = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
    setShowProof(null);
  };

  const next = useCallback(() => goTo((currentSlide + 1) % projects.length), [currentSlide]);
  const prev = useCallback(() => goTo((currentSlide - 1 + projects.length) % projects.length), [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setTouchStart(null);
  };

  const p = projects[currentSlide];
  const Icon = p.icon;
  const isProofOpen = showProof === p.title;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
  };

  return (
    <section id="projects" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 h-[350px] w-[350px] rounded-full bg-[#06B6D4]/6 blur-[120px]" />
        <div className="absolute -bottom-20 right-0 h-[300px] w-[300px] rounded-full bg-[#7C3AED]/8 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Desktop: </> watermark + cyan orbs */}
      <div className="pointer-events-none absolute top-20 right-10 text-8xl font-display font-bold text-white/[0.04] select-none hidden md:block">&lt;/&gt;</div>
      <div className="pointer-events-none absolute top-10 left-10 h-[120px] w-[120px] rounded-full bg-[#06B6D4]/10 blur-[60px] hidden md:block" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[120px] w-[120px] rounded-full bg-[#06B6D4]/10 blur-[60px] hidden md:block" />

      {/* Mobile: shimmer line + gradient orbs + corner brackets */}
      <div className="pointer-events-none absolute top-24 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent animate-shimmer md:hidden" />
      <div className="pointer-events-none absolute top-[30%] left-3 h-4 w-4 rounded-full bg-gradient-to-br from-[#06B6D4]/15 to-[#7C3AED]/10 blur-[3px] animate-drift md:hidden" />
      <div className="pointer-events-none absolute bottom-[20%] right-4 h-3 w-3 rounded-full bg-gradient-to-br from-[#7C3AED]/15 to-[#06B6D4]/10 blur-[2px] animate-[drift_7s_ease-in-out_infinite_1s] md:hidden" />
      <div className="pointer-events-none absolute top-16 right-3 h-8 w-8 rounded-tr-xl border-t border-r border-[#06B6D4]/12 animate-border-glow md:hidden" />
      <div className="pointer-events-none absolute bottom-16 left-3 h-8 w-8 rounded-bl-xl border-b border-l border-[#7C3AED]/12 animate-[borderGlow_4s_ease-in-out_infinite_2s] md:hidden" />

      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
            Key <span className="gradient-text">Projects</span>
          </h2>
        </FadeInSection>

        {/* Slideshow */}
        <div className="mt-10 sm:mt-14 relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Navigation arrows */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 sm:-left-12">
            <button
              onClick={prev}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 sm:-right-12">
            <button
              onClick={next}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Slide content */}
          <div className="overflow-hidden min-h-[400px] px-6 sm:px-0">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[hsl(0_0%_7%)] backdrop-blur-sm p-5 sm:p-6 md:p-8 transition-all duration-500 hover:border-primary/30"
                style={{ boxShadow: "0 0 40px -10px hsl(var(--primary) / 0.08)" }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accentColor}`} />

                <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accentColor} p-[1px]`}>
                    <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[hsl(0_0%_7%)] transition-all duration-300 group-hover:bg-transparent">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-display font-bold leading-snug text-white sm:text-lg">{p.title}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/50">{p.description}</p>
                  </div>
                </div>

                <div className="relative mt-5 sm:mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:pl-[76px]">
                  {p.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/50">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-5 sm:mt-6 flex flex-wrap gap-2 sm:pl-[76px]">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border border-white/10 bg-white/5 text-white/60 text-xs font-medium transition-all duration-300 hover:border-primary/30 hover:bg-primary/15 hover:text-white"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {p.proofImage && (
                  <div className="relative mt-5 sm:mt-6 sm:pl-[76px]">
                    <button
                      onClick={() => setShowProof(isProofOpen ? null : p.title)}
                      className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/15 hover:border-accent/40 hover:text-white min-h-[44px]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isProofOpen ? "Hide Output" : "See It in Action"}
                    </button>
                  </div>
                )}

                <AnimatePresence>
                  {isProofOpen && p.proofImage && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="relative overflow-hidden sm:pl-[76px]"
                    >
                      <div className="mt-6 space-y-4">
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                          <div className="border-b border-white/10 bg-accent/5 px-4 py-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                              {p.proofLabel}
                            </span>
                          </div>
                          <img src={p.proofImage} alt={`${p.title} - proof of work`} className="w-full" loading="lazy" />
                        </div>
                        {p.extraImages.map((img) => (
                          <div key={img.label} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            <div className="border-b border-white/10 bg-primary/5 px-4 py-2">
                              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                📎 {img.label}
                              </span>
                            </div>
                            <img src={img.src} alt={img.label} className="w-full" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-primary shadow-[0_0_12px_-2px_hsl(var(--primary)/0.5)]"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
