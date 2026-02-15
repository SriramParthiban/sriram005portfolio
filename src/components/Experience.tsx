const experiences = [
  {
    title: "AI Automation Specialist",
    company: "Aspire Media Marketing",
    location: "Remote / Canada",
    period: "June 2024 – Present",
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
  <section id="experience" className="px-6 py-24">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Professional Experience</h2>
      <div className="mt-10 space-y-12">
        {experiences.map((exp) => (
          <article key={exp.title + exp.company}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
              <span className="text-sm text-muted-foreground">{exp.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {exp.company} · {exp.location}
            </p>
            <ul className="mt-4 space-y-2">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
