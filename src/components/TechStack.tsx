import FadeInSection from "./FadeInSection";
import { Card, CardContent } from "@/components/ui/card";

const tools = [
  {
    name: "GoHighLevel",
    shortName: "GHL",
    description: "All-in-one CRM & marketing automation platform",
    usage: "Building automated sales funnels, email sequences, and managing client pipelines",
    color: "#FF6B35",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="18" fill="currentColor" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">GHL</text>
      </svg>
    ),
  },
  {
    name: "n8n",
    shortName: "n8n",
    description: "Open-source workflow automation tool",
    usage: "Creating complex multi-step automations, API integrations, and data transformations",
    color: "#EA4B71",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="4" y="4" width="32" height="32" rx="8" fill="currentColor" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">n8n</text>
      </svg>
    ),
  },
  {
    name: "Make.com",
    shortName: "Make",
    description: "Visual integration and automation platform",
    usage: "Connecting apps and automating workflows with visual scenario builder",
    color: "#6D28D9",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="18" fill="currentColor" />
        <circle cx="14" cy="20" r="4" fill="white" />
        <circle cx="26" cy="20" r="4" fill="white" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    shortName: "Zapier",
    description: "No-code automation connecting 5000+ apps",
    usage: "Quick integrations between tools and simple trigger-based automations",
    color: "#FF4A00",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <path
          d="M20 4L36 20L20 36L4 20L20 4Z"
          fill="currentColor"
        />
        <circle cx="20" cy="20" r="6" fill="white" />
      </svg>
    ),
  },
  {
    name: "Power BI",
    shortName: "PBI",
    description: "Business intelligence and data visualization",
    usage: "Creating interactive dashboards, KPI tracking, and executive reporting",
    color: "#F2C811",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="6" y="20" width="8" height="14" rx="2" fill="currentColor" />
        <rect x="16" y="12" width="8" height="22" rx="2" fill="currentColor" />
        <rect x="26" y="6" width="8" height="28" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Python",
    shortName: "Python",
    description: "Programming language for data & automation",
    usage: "Building ETL pipelines, data analysis scripts, and custom automation tools",
    color: "#3776AB",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <path
          d="M20 4C12 4 12 8 12 8V12H20V14H8S4 14 4 22S8 30 8 30H12V26S12 22 16 22H24S28 22 28 18V8S28 4 20 4ZM16 7C17.1 7 18 7.9 18 9S17.1 11 16 11S14 10.1 14 9S14.9 7 16 7Z"
          fill="currentColor"
        />
        <path
          d="M20 36C28 36 28 32 28 32V28H20V26H32S36 26 36 18S32 10 32 10H28V14S28 18 24 18H16S12 18 12 22V32S12 36 20 36ZM24 33C22.9 33 22 32.1 22 31S22.9 29 24 29S26 29.9 26 31S25.1 33 24 33Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    name: "monday.com",
    shortName: "monday",
    description: "Work OS for project management",
    usage: "Managing projects, tracking tasks, and team collaboration workflows",
    color: "#FF3D57",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="10" cy="28" r="6" fill="currentColor" />
        <circle cx="20" cy="18" r="6" fill="currentColor" opacity="0.8" />
        <circle cx="30" cy="12" r="6" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "BigQuery",
    shortName: "BQ",
    description: "Google's serverless data warehouse",
    usage: "Running complex SQL queries on large datasets and building data pipelines",
    color: "#4285F4",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <path
          d="M20 4L6 12V28L20 36L34 28V12L20 4Z"
          fill="currentColor"
        />
        <path
          d="M20 12L12 16V24L20 28L28 24V16L20 12Z"
          fill="white"
          opacity="0.8"
        />
      </svg>
    ),
  },
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute -bottom-10 -left-20 h-[350px] w-[350px] rounded-full bg-accent/8 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
              <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">
                Tools & Tech
              </span>
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-accent to-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
              My <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The tools and technologies I use daily to build automation solutions and drive business growth.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tools.map((tool, idx) => (
            <FadeInSection key={tool.name} delay={100 + idx * 50}>
              <Card className="group relative h-full overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: tool.color }}
                />
                
                <CardContent className="p-5 sm:p-6">
                  {/* Icon */}
                  <div
                    className="mb-4 text-white/70 group-hover:text-white transition-colors"
                    style={{ color: tool.color }}
                  >
                    {tool.icon}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mb-3">
                    {tool.description}
                  </p>

                  {/* Usage */}
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                      How I use it
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.usage}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
