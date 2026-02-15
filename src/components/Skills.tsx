import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Target, Bot, Plug, LineChart, Code, Users } from "lucide-react";

const categories = [
  {
    title: "GTM & RevOps",
    icon: Target,
    skills: ["Lead Qualification", "Pipeline Tracking", "KPI Management", "Process Optimization"],
  },
  {
    title: "Automation & AI",
    icon: Bot,
    skills: ["n8n", "Zapier", "Make.com", "AI Agents", "Workflow Orchestration"],
  },
  {
    title: "APIs & Integrations",
    icon: Plug,
    skills: ["REST APIs", "Webhooks", "ETL Pipelines", "System Integrations"],
  },
  {
    title: "Data & Analytics",
    icon: LineChart,
    skills: ["Python", "SQL", "Power BI", "Looker Studio", "BigQuery", "Advanced Excel"],
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "JavaScript", "SQL"],
  },
  {
    title: "Consulting",
    icon: Users,
    skills: ["Requirements Gathering", "Solution Design", "Stakeholder Communication", "Documentation"],
  },
];

const Skills = () => (
  <section id="skills" className="px-6 py-28">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Expertise</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Technical Skills</h2>
      </FadeInSection>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <FadeInSection key={cat.title} delay={idx * 80}>
              <div className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs font-normal">
                      {s}
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

export default Skills;
