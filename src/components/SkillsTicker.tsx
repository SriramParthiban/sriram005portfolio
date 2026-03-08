const items = [
  "AI Agents", "n8n", "Python", "SQL", "Power BI", "BigQuery",
  "REST APIs", "Zapier", "Make.com", "ETL Pipelines", "CRM Integration",
  "Webhooks", "NLP", "Looker Studio", "JavaScript", "Workflow Orchestration",
];

const SkillsTicker = () => (
  <div className="relative overflow-hidden border-y border-white/5 bg-[hsl(155_30%_5%)] py-4">
    <div className="flex animate-ticker whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="mx-4 inline-flex items-center gap-2 text-sm font-medium text-white/40 sm:mx-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default SkillsTicker;