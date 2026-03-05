import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Zap, BarChart3, Database, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Multi-Channel Customer Requirements Automation Platform",
    description:
      "AI-powered discovery and qualification system automating customer requirements gathering across voice, chat, and SMS channels.",
    metrics: [
      "Reduced documentation time by 70%",
      "99% data accuracy",
      "1,000+ interactions/day",
      "Real-time CRM sync",
    ],
    tech: ["AI Agents", "n8n", "REST APIs", "CRM Integration", "NLP"],
    icon: Zap,
    accentColor: "from-primary to-primary/60",
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
  },
  {
    title: "Intelligent Data Integration System",
    description:
      "End-to-end email-to-system automation pipeline with intelligent routing, validation, and real-time alerting.",
    metrics: [
      "Errors reduced by 80%",
      "Improved SLA compliance",
      "Real-time alerting",
      "Zero-touch processing",
    ],
    tech: ["ETL", "Webhooks", "Email Parsing", "Data Validation", "Monitoring"],
    icon: Database,
    accentColor: "from-primary to-accent",
  },
];

const Projects = () => (
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
          return (
            <FadeInSection key={p.title} delay={idx * 150}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 card-hover sm:p-8"
              >
                {/* Top gradient bar */}
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
              </motion.div>
            </FadeInSection>
          );
        })}
      </div>
    </div>
  </section>
);

export default Projects;
