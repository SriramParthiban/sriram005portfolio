import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Zap, BarChart3, Database, Mail, CheckCircle2, Paperclip } from "lucide-react";
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

const folderColors = [
  { tab: "bg-[hsl(250,80%,68%)]", tabText: "text-white", border: "border-[hsl(250,80%,68%)/0.3]" },
  { tab: "bg-[hsl(165,55%,48%)]", tabText: "text-white", border: "border-[hsl(165,55%,48%)/0.3]" },
  { tab: "bg-[hsl(35,85%,55%)]", tabText: "text-white", border: "border-[hsl(35,85%,55%)/0.3]" },
  { tab: "bg-[hsl(340,70%,55%)]", tabText: "text-white", border: "border-[hsl(340,70%,55%)/0.3]" },
];

const projects = [
  {
    title: "Multi-Channel Automation",
    fullTitle: "Multi-Channel Customer Requirements Automation Platform",
    description: "AI-powered discovery and qualification system automating customer requirements gathering across voice, chat, and SMS channels. Built using Lovable.",
    metrics: ["Reduced documentation time by 70%", "99% data accuracy", "1,000+ interactions/day", "Real-time CRM sync"],
    tech: ["AI Agents", "n8n", "REST APIs", "CRM Integration", "NLP", "Lovable"],
    icon: Zap,
    proofImage: multichannelDashboard,
    proofLabel: "✅ Live Dashboard — Final Output",
    extraImages: [],
  },
  {
    title: "KPI Tracking Engine",
    fullTitle: "Automated KPI Tracking & Call Optimization Engine",
    description: "Real-time performance monitoring system with automated anomaly detection and call quality optimization.",
    metrics: ["Call completion: 67% → 97%", "Invalid leads reduced by 90%", "15+ hours/week saved", "Real-time dashboards"],
    tech: ["Python", "SQL", "Power BI", "Automation", "Analytics"],
    icon: BarChart3,
    proofImage: kpiDashboard,
    proofLabel: "✅ Live Dashboard — Call Center Performance",
    extraImages: [],
  },
  {
    title: "Data Integration System",
    fullTitle: "Intelligent Data Integration System",
    description: "End-to-end data pipeline collecting via GoHighLevel and n8n webhooks, validating and syncing to monday.com with intelligent routing and real-time alerting.",
    metrics: ["Errors reduced by 80%", "Improved SLA compliance", "Real-time alerting", "Zero-touch processing"],
    tech: ["n8n", "monday.com", "GoHighLevel", "Webhooks", "Data Validation", "ETL"],
    icon: Database,
    proofImage: dataIntegrationWorkflow,
    proofLabel: "✅ Live Workflow — n8n Automation Pipeline",
    extraImages: [],
  },
  {
    title: "Email Automation",
    fullTitle: "GoHighLevel Email Automation Workflow",
    description: "Automated lead nurturing pipeline that triggers personalized email sequences when new opportunities or form submissions arrive.",
    metrics: ["Instant lead response time", "Automated booking link delivery", "Trigger-based email sequences", "Zero manual follow-up needed"],
    tech: ["GoHighLevel", "Email Automation", "Workflows", "Lead Nurturing", "CRM"],
    icon: Mail,
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
  const [openFolder, setOpenFolder] = useState<number | null>(0);

  return (
    <section id="projects" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
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
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            Key <span className="gradient-text">Projects</span>
          </h2>
        </FadeInSection>

        {/* Folder tabs */}
        <div className="mt-10 sm:mt-14">
          <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-none">
            {projects.map((p, idx) => {
              const color = folderColors[idx % folderColors.length];
              const isOpen = openFolder === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setOpenFolder(isOpen ? null : idx)}
                  className={`relative shrink-0 rounded-t-lg px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-display font-bold transition-all duration-300 border border-b-0 ${
                    isOpen
                      ? `${color.tab} ${color.tabText} shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.3)] z-10 -mb-px`
                      : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  {p.title}
                  {/* Folder notch */}
                  {isOpen && (
                    <div className="absolute -bottom-px left-0 right-0 h-px bg-white/[0.07]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Folder body */}
          <AnimatePresence mode="wait">
            {openFolder !== null && (
              <motion.div
                key={openFolder}
                initial={{ opacity: 0, y: 10, scaleY: 0.98 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative rounded-b-2xl rounded-tr-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, hsl(0 0% 100% / 0.03) 27px, hsl(0 0% 100% / 0.03) 28px)",
                }}
              >
                {/* Paper texture lines */}
                <div className="p-5 sm:p-8">
                  {(() => {
                    const p = projects[openFolder];
                    const Icon = p.icon;
                    const color = folderColors[openFolder % folderColors.length];
                    return (
                      <div>
                        {/* Header */}
                        <div className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color.tab} shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-display font-bold text-foreground">{p.fullTitle}</h3>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {p.metrics.map((m) => (
                            <div key={m} className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                              <span>{m}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech badges */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="border border-white/10 bg-white/5 text-muted-foreground text-xs font-medium transition-all duration-300 hover:border-primary/30 hover:bg-primary/15 hover:text-foreground"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        {/* Proof images — "paperclipped" */}
                        {p.proofImage && (
                          <div className="mt-6">
                            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-accent uppercase tracking-wider">
                              <Paperclip className="h-3.5 w-3.5 -rotate-45" />
                              Attached Proof
                            </div>
                            <div className="space-y-3">
                              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg">
                                <div className="border-b border-white/10 bg-accent/5 px-4 py-2">
                                  <span className="text-xs font-semibold text-accent">{p.proofLabel}</span>
                                </div>
                                <img src={p.proofImage} alt={`${p.fullTitle} - proof`} className="w-full" loading="lazy" />
                              </div>
                              {p.extraImages.map((img) => (
                                <div key={img.label} className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg">
                                  <div className="border-b border-white/10 bg-primary/5 px-4 py-2">
                                    <span className="text-xs font-semibold text-primary">📎 {img.label}</span>
                                  </div>
                                  <img src={img.src} alt={img.label} className="w-full" loading="lazy" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
