import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Zap, BarChart3, Database, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dentbooksProof from "@/assets/dentbooks-email-proof.png";
import multichannelDashboard from "@/assets/multichannel-dashboard.png";
import kpiDashboard from "@/assets/kpi-tracking-dashboard.png";
import dataIntegrationWorkflow from "@/assets/data-integration-workflow.png";

const projects = [
  {
    title: "Multi-Channel Customer Requirements Automation Platform",
    description:
      "AI-powered discovery and qualification system automating customer requirements gathering across voice, chat, and SMS channels. Built using Lovable.",
    metrics: [
      "Reduced documentation time by 70%",
      "99% data accuracy",
      "1,000+ interactions/day",
      "Real-time CRM sync",
    ],
    tech: ["AI Agents", "n8n", "REST APIs", "CRM Integration", "NLP", "Lovable"],
    icon: Zap,
    accentColor: "from-primary to-primary/60",
    proofImage: multichannelDashboard,
    proofLabel: "✅ Live Dashboard — Final Output",
  },
  {
    title: "Automated KPI Tracking & Call Optimization Engine",
    description:
      "Real-time performance monitoring system with automated anomaly detection and call quality optimization.",
    metrics: [
      "Call completion: 67% → 97%",
      "Invalid leads reduced by 90%",
      "15+ hours/week saved",
      "Real-time dashboards",
    ],
    tech: ["Python", "SQL", "Power BI", "Automation", "Analytics"],
    icon: BarChart3,
    accentColor: "from-accent to-accent/60",
    proofImage: kpiDashboard,
    proofLabel: "✅ Live Dashboard — Call Center Performance",
  },
  {
    title: "Intelligent Data Integration System",
    description:
      "End-to-end data pipeline collecting via GoHighLevel and n8n webhooks, validating and syncing to monday.com with intelligent routing and real-time alerting.",
    metrics: [
      "Errors reduced by 80%",
      "Improved SLA compliance",
      "Real-time alerting",
      "Zero-touch processing",
    ],
    tech: ["n8n", "monday.com", "GoHighLevel", "Webhooks", "Data Validation", "ETL"],
    icon: Database,
    accentColor: "from-primary to-accent",
    proofImage: dataIntegrationWorkflow,
    proofLabel: "✅ Live Workflow — n8n Automation Pipeline",
  },
  {
    title: "GoHighLevel Email Automation Workflow",
    description:
      "Automated lead nurturing pipeline that triggers personalized email sequences when new opportunities or form submissions arrive — sending booking links and follow-ups based on configurable actions and lead status.",
    metrics: [
      "Instant lead response time",
      "Automated booking link delivery",
      "Trigger-based email sequences",
      "Zero manual follow-up needed",
    ],
    tech: ["GoHighLevel", "Email Automation", "Workflows", "Lead Nurturing", "CRM"],
    icon: Mail,
    accentColor: "from-accent to-primary",
    proofImage: dentbooksProof,
    proofLabel: "✅ Live Output — Automated Email Delivered",
  },
];

const Projects = () => {
  const [showProof, setShowProof] = useState<string | null>(null);

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />

      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Portfolio</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl">
            Key <span className="gradient-text">Projects</span>
          </h2>
        </FadeInSection>

        <div className="mt-14 space-y-6">
          {projects.map((p, idx) => {
            const Icon = p.icon;
            const isProofOpen = showProof === p.title;

            return (
              <FadeInSection key={p.title} delay={idx * 150}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 card-hover sm:p-8"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accentColor} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex items-start gap-5">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accentColor} p-[1px]`}>
                      <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-card transition-all duration-300 group-hover:bg-transparent">
                        <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-display font-bold leading-snug text-foreground sm:text-lg">{p.title}</h3>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  </div>

                  <div className="relative mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:pl-[76px]">
                    {p.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6 flex flex-wrap gap-2 sm:pl-[76px]">
                    {p.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="border border-border/30 bg-secondary/60 text-xs font-medium transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* See proof button */}
                  {p.proofImage && (
                    <div className="relative mt-6 sm:pl-[76px]">
                      <button
                        onClick={() => setShowProof(isProofOpen ? null : p.title)}
                        className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/10 hover:border-accent/40"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {isProofOpen ? "Hide Output" : "See It in Action"}
                      </button>
                    </div>
                  )}

                  {/* Inline proof image */}
                  <AnimatePresence>
                    {isProofOpen && p.proofImage && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative overflow-hidden sm:pl-[76px]"
                      >
                        <div className="mt-6 overflow-hidden rounded-xl border border-border/30 bg-card">
                          <div className="border-b border-border/30 bg-accent/5 px-4 py-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                              {p.proofLabel}
                            </span>
                          </div>
                          <img
                            src={p.proofImage}
                            alt={`${p.title} - proof of work`}
                            className="w-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
