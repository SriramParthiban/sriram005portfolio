import FadeInSection from "./FadeInSection";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "AI Automation Specialist",
    company: "Aspire Media Marketing",
    location: "Remote / Canada",
    period: "June 2024 – Present",
    current: true,
    bullets: [
      "Designed and deployed outbound & qualification automation systems using AI voice, chat, and SMS agents across multiple channels.",
      "Built discovery logic that translates prospect signals into AE-ready handoffs, reducing manual qualification overhead significantly.",
      "Automated 1,000+ daily lead interactions with 99% operational accuracy through intelligent workflow orchestration.",
      "Developed real-time KPI dashboards providing visibility into pipeline health, conversion rates, and team performance.",
      "Prevented $40,000+ in wasted spend through automated anomaly detection and proactive budget monitoring systems.",
      "Experimented with persona-based messaging strategies across verticals, driving measurable improvements in engagement and response rates.",
      "Established cross-functional feedback loops between sales, marketing, and ops—improving GTM decision quality and execution speed.",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "Wonkrew",
    location: "Chennai, India",
    period: "Aug 2023 – Jan 2024",
    current: false,
    bullets: [
      "Processed and analyzed 500,000+ records using BigQuery and SQL, building robust data pipelines for marketing and operations teams.",
      "Reduced average query execution time by 80% through schema optimization and indexing strategies.",
      "Built interactive Power BI dashboards that improved decision-making speed by 50% across leadership teams.",
      "Improved demand forecasting accuracy by 25% using statistical models and trend analysis.",
      "Delivered actionable reporting frameworks that became standard tooling for the analytics function.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="px-6 py-28">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Career</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Professional Experience</h2>
      </FadeInSection>

      <div className="mt-12 space-y-10">
        {experiences.map((exp, idx) => (
          <FadeInSection key={exp.title + exp.company} delay={idx * 150}>
            <article className="relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
              {exp.current && (
                <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground animate-pulse" />
                  Current
                </span>
              )}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-secondary-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {exp.company} · {exp.location}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 pl-14">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
