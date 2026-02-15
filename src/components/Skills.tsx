const categories = [
  {
    title: "GTM & RevOps",
    skills: ["Lead Qualification", "Pipeline Tracking", "KPI Management", "Process Optimization"],
  },
  {
    title: "Automation & AI",
    skills: ["n8n", "Zapier", "Make.com", "AI Agents", "Workflow Orchestration"],
  },
  {
    title: "APIs & Integrations",
    skills: ["REST APIs", "Webhooks", "ETL Pipelines", "System Integrations"],
  },
  {
    title: "Data & Analytics",
    skills: ["Python", "SQL", "Power BI", "Looker Studio", "BigQuery", "Advanced Excel"],
  },
  {
    title: "Programming",
    skills: ["Python", "JavaScript", "SQL"],
  },
  {
    title: "Consulting",
    skills: ["Requirements Gathering", "Solution Design", "Stakeholder Communication", "Documentation"],
  },
];

const Skills = () => (
  <section id="skills" className="px-6 py-24">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Technical Skills</h2>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {cat.title}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {cat.skills.map((s) => (
                <li key={s} className="text-sm text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
