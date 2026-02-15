import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Zap, BarChart3, Database } from "lucide-react";

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
    gradient: "from-primary/10 to-accent/10",
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
    gradient: "from-accent/10 to-primary/10",
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
    gradient: "from-primary/10 to-primary/5",
  },
];

const Projects = () => (
  <section id="projects" className="bg-secondary/30 px-6 py-28">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Portfolio</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Key Projects</h2>
      </FadeInSection>

      <div className="mt-12 space-y-6">
        {projects.map((p, idx) => {
          const Icon = p.icon;
          return (
            <FadeInSection key={p.title} delay={idx * 120}>
              <div className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient}`}>
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 pl-16">
                  {p.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 pl-16">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border border-border/40 bg-secondary/80 text-xs font-medium transition-colors group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </div>
  </section>
);

export default Projects;
