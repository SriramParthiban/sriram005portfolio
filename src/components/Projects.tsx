import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Zap, BarChart3, Database, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  const [showProof, setShowProof] = useState<string | null>(null);

  return (
    <section id="projects" className="dark-section relative px-6 py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 h-[350px] w-[350px] rounded-full bg-accent/6 blur-[120px]" />
        <div className="absolute -bottom-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Portfolio</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl">
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
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/20 hover:bg-white/8 sm:p-8"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accentColor} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex items-start gap-5">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accentColor} p-[1px]`}>
                      <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[hsl(0_0%_10%)] transition-all duration-300 group-hover:bg-transparent">
                        <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-display font-bold leading-snug text-white sm:text-lg">{p.title}</h3>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{p.description}</p>
                    </div>
                  </div>

                  <div className="relative mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:pl-[76px]">
                    {p.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-2.5 text-sm text-white/50">
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
                        className="border border-white/10 bg-white/5 text-white/60 text-xs font-medium transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

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

                  <AnimatePresence>
                    {isProofOpen && p.proofImage && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative overflow-hidden sm:pl-[76px]"
                      >
                        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                          <div className="border-b border-white/10 bg-accent/5 px-4 py-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                              {p.proofLabel}
                            </span>
                          </div>
                          <img src={p.proofImage} alt={`${p.title} - proof of work`} className="w-full" />
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
