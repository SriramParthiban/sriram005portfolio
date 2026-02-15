import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  },
];

const Projects = () => (
  <section id="projects" className="px-6 py-24">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Key Projects</h2>
      <div className="mt-10 space-y-6">
        {projects.map((p) => (
          <Card key={p.title} className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold leading-snug">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {p.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    {m}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
