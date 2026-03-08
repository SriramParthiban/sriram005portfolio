import FadeInSection from "./FadeInSection";

const tools = [
  { name: "GoHighLevel", description: "All-in-one CRM & marketing automation platform", usage: "Building automated sales funnels, email sequences, and managing client pipelines", color: "#FF6B35", logo: "/logos/ghl.png" },
  { name: "n8n", description: "Open-source workflow automation tool", usage: "Creating complex multi-step automations, API integrations, and data transformations", color: "#EA4B71", logo: "/logos/n8n.svg" },
  { name: "Make.com", description: "Visual integration and automation platform", usage: "Connecting apps and automating workflows with visual scenario builder", color: "#2D8B5E", logo: "/logos/make.svg" },
  { name: "Zapier", description: "No-code automation connecting 5000+ apps", usage: "Quick integrations between tools and simple trigger-based automations", color: "#FF4A00", logo: "/logos/zapier.png" },
  { name: "JavaScript", description: "Web programming language for dynamic applications", usage: "Building interactive web apps, custom scripts, and frontend automation logic", color: "#F7DF1E", logo: "/logos/javascript.svg" },
  { name: "Python", description: "Programming language for data & automation", usage: "Building ETL pipelines, data analysis scripts, and custom automation tools", color: "#3776AB", logo: "/logos/python.svg" },
  { name: "SQL", description: "Structured query language for databases", usage: "Writing complex queries, data extraction, reporting, and database management", color: "#336791", logo: "/logos/postgresql.svg" },
  { name: "Power BI", description: "Business intelligence and data visualization", usage: "Creating interactive dashboards, KPI tracking, and executive reporting", color: "#F2C811", logo: "/logos/powerbi.svg" },
  { name: "monday.com", description: "Work OS for project management", usage: "Managing projects, tracking tasks, and team collaboration workflows", color: "#FF3D57", logo: "/logos/monday.png" },
  { name: "BigQuery", description: "Google's serverless data warehouse", usage: "Running complex SQL queries on large datasets and building data pipelines", color: "#4285F4", logo: "/logos/bigquery.svg" },
  { name: "Looker Studio", description: "Google's free data visualization & reporting tool", usage: "Building shareable dashboards, blending data sources, and client reporting", color: "#4285F4", logo: "/logos/looker.svg" },
  { name: "REST APIs", description: "Standard interface for web service communication", usage: "Integrating third-party services, building webhooks, and connecting platforms", color: "#00C7B7", logo: "" },
  { name: "PostgreSQL", description: "Powerful open-source relational database", usage: "Storing structured data, running analytics queries, and backend data management", color: "#4169E1", logo: "/logos/postgresql.svg" },
];

const row1Tools = tools.slice(0, 7);
const row2Tools = tools.slice(7, 13);

const ToolCard = ({ tool }: { tool: typeof tools[0] }) => (
  <div className="group relative flex-shrink-0 w-[200px] sm:w-[320px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]">
    <div className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: tool.color }} />
    <div className="p-5">
      <div className="mb-3 h-10 w-10 rounded-lg flex items-center justify-center overflow-hidden bg-white/10">
        {tool.logo ? (
          <img src={tool.logo} alt={tool.name} className="h-7 w-7 object-contain" />
        ) : (
          <div className="h-full w-full rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: tool.color }}>
            API
          </div>
        )}
      </div>
      <h3 className="text-base font-display font-bold text-foreground mb-1.5">{tool.name}</h3>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{tool.description}</p>
      <div className="pt-3 border-t border-white/10">
        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1 font-semibold">How I use it</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{tool.usage}</p>
      </div>
    </div>
  </div>
);

const TechStack = () => (
  <section id="tech-stack" className="dark-section relative py-24 sm:py-32 overflow-hidden">
    <div className="relative">
      <FadeInSection>
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            My Tech Stack
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use daily to build automation solutions and drive business growth.
          </p>
        </div>
      </FadeInSection>

      {/* Row 1 */}
      <div className="relative mb-6">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 z-10 bg-gradient-to-r from-[hsl(var(--dark-section))] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 z-10 bg-gradient-to-l from-[hsl(var(--dark-section))] to-transparent" />
        <div className="hidden sm:flex animate-ticker-row1 gap-6">
          {[...row1Tools, ...row1Tools, ...row1Tools, ...row1Tools].map((tool, i) => (
            <ToolCard key={`row1-${i}`} tool={tool} />
          ))}
        </div>
        <div className="flex sm:hidden animate-ticker-row1-mobile gap-4" style={{ width: 'max-content' }}>
          {row1Tools.map((tool, i) => (
            <ToolCard key={`m-row1-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 z-10 bg-gradient-to-r from-[hsl(var(--dark-section))] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 z-10 bg-gradient-to-l from-[hsl(var(--dark-section))] to-transparent" />
        <div className="hidden sm:flex animate-ticker-row2 gap-6">
          {[...row2Tools, ...row2Tools, ...row2Tools, ...row2Tools].map((tool, i) => (
            <ToolCard key={`row2-${i}`} tool={tool} />
          ))}
        </div>
        <div className="flex sm:hidden animate-ticker-row2-mobile gap-4" style={{ width: 'max-content' }}>
          {row2Tools.map((tool, i) => (
            <ToolCard key={`m-row2-${i}`} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TechStack;
