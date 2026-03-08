import FadeInSection from "./FadeInSection";
import { Target, Bot, Plug, LineChart, Code, Users } from "lucide-react";
import { motion } from "framer-motion";

const noteColors = [
  { bg: "#FEF3C7", text: "#92400E", badge: "#FDE68A", badgeText: "#78350F" }, // yellow
  { bg: "#FCE7F3", text: "#9D174D", badge: "#FBCFE8", badgeText: "#831843" }, // pink
  { bg: "#D1FAE5", text: "#065F46", badge: "#A7F3D0", badgeText: "#064E3B" }, // green
  { bg: "#DBEAFE", text: "#1E40AF", badge: "#BFDBFE", badgeText: "#1E3A8A" }, // blue
  { bg: "#EDE9FE", text: "#5B21B6", badge: "#DDD6FE", badgeText: "#4C1D95" }, // purple
  { bg: "#FFEDD5", text: "#9A3412", badge: "#FED7AA", badgeText: "#7C2D12" }, // orange
];

const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 2.8];

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

    <div className="relative mx-auto max-w-4xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Expertise</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
          Technical <span className="gradient-text">Skills</span>
        </h2>
      </FadeInSection>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const color = noteColors[idx];
          const rotation = rotations[idx];
          return (
            <FadeInSection key={cat.title} delay={idx * 100}>
              <motion.div
                initial={{ rotate: rotation * 0.3 }}
                whileInView={{ rotate: rotation }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.03, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative cursor-default"
                style={{
                  background: color.bg,
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
                }}
              >
                {/* Tape strip */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] w-12 h-5 rounded-sm z-10"
                  style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(2px)", border: "1px solid rgba(255,255,255,0.3)" }}
                />

                {/* Notebook lines */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 13px, #000 13px, #000 14px)" }}
                />

                {/* Folded corner shadow */}
                <div
                  className="absolute bottom-0 right-0 w-5 h-5"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.08) 50%)`,
                  }}
                />

                <div className="relative p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ background: `${color.badge}`, color: color.text }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-sm font-bold tracking-wide" style={{ color: color.text }}>
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border"
                        style={{
                          background: color.badge,
                          color: color.badgeText,
                          borderColor: `${color.badgeText}20`,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
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
