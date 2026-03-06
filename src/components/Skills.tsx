import { Badge } from "@/components/ui/badge";
import FadeInSection from "./FadeInSection";
import { Target, Bot, Plug, LineChart, Code, Users } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { title: "GTM & RevOps", icon: Target, skills: ["Lead Qualification", "Pipeline Tracking", "KPI Management", "Process Optimization"] },
  { title: "Automation & AI", icon: Bot, skills: ["n8n", "Zapier", "Make.com", "AI Agents", "Workflow Orchestration"] },
  { title: "APIs & Integrations", icon: Plug, skills: ["REST APIs", "Webhooks", "ETL Pipelines", "System Integrations"] },
  { title: "Data & Analytics", icon: LineChart, skills: ["Python", "SQL", "Power BI", "Looker Studio", "BigQuery", "Advanced Excel"] },
  { title: "Programming", icon: Code, skills: ["Python", "JavaScript", "SQL"] },
  { title: "Consulting", icon: Users, skills: ["Requirements Gathering", "Solution Design", "Stakeholder Communication", "Documentation"] },
];

const Skills = () => (
  <section id="skills" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 left-1/2 h-[200px] w-[200px] md:h-[400px] md:w-[400px] rounded-full bg-[#06B6D4]/6 blur-[80px] md:blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[125px] w-[125px] md:h-[250px] md:w-[250px] rounded-full bg-[#7C3AED]/6 blur-[60px] md:blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    {/* Decorative: circuit pattern SVG — hidden on mobile */}
    <svg className="pointer-events-none absolute inset-0 w-full h-full hidden md:block" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M50 0 v30 M50 70 v30 M0 50 h30 M70 50 h30" stroke="white" strokeWidth="0.5" opacity="0.05" fill="none" />
        <circle cx="50" cy="50" r="3" fill="none" stroke="white" strokeWidth="0.5" opacity="0.05" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>

    {/* Decorative: floating squares — hidden on mobile */}
    <div className="pointer-events-none absolute top-[30%] right-[5%] h-2 w-2 rotate-45 border border-[#7C3AED]/15 animate-[floatSlow_6s_ease-in-out_infinite] hidden md:block" />
    <div className="pointer-events-none absolute top-[60%] left-[8%] h-2 w-2 rotate-45 border border-[#7C3AED]/15 animate-[floatSlow_7s_ease-in-out_infinite_1s] hidden md:block" />
    <div className="pointer-events-none absolute bottom-[20%] right-[15%] h-2 w-2 rotate-45 border border-[#7C3AED]/15 animate-[floatSlow_5s_ease-in-out_infinite_0.5s] hidden md:block" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Expertise</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
          Technical <span className="gradient-text">Skills</span>
        </h2>
      </FadeInSection>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <FadeInSection key={cat.title} delay={idx * 100}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-white/8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/5 text-primary transition-all duration-500 group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-display font-bold text-white">{cat.title}</h3>
                </div>
                <div className="relative flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-white/5 border border-white/10 text-white/60 text-xs font-medium transition-all duration-300 group-hover:border-primary/15 group-hover:bg-primary/10 group-hover:text-primary">
                      {s}
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

export default Skills;
