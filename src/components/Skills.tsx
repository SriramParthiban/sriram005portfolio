import FadeInSection from "./FadeInSection";
import { Cpu, Workflow, Plug, LineChart, Code, Users } from "lucide-react";
import { motion } from "framer-motion";
import fernCloseup from "@/assets/fern-closeup.jpg";

const noteColors = [
  { bg: "#FEF3C7", text: "#78350F", badge: "#FDE68A", badgeText: "#92400E" },
  { bg: "#D1FAE5", text: "#064E3B", badge: "#A7F3D0", badgeText: "#065F46" },
  { bg: "#DBEAFE", text: "#1E3A5F", badge: "#BFDBFE", badgeText: "#1E40AF" },
  { bg: "#FCE7F3", text: "#831843", badge: "#FBCFE8", badgeText: "#9D174D" },
  { bg: "#E0E7FF", text: "#312E81", badge: "#C7D2FE", badgeText: "#3730A3" },
  { bg: "#FEE2E2", text: "#7F1D1D", badge: "#FECACA", badgeText: "#991B1B" },
];

const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.5];

const categories = [
  { title: "AI & Automation", icon: Cpu, skills: ["AI Voice Agents", "AI Chat Agents", "SMS Automation", "AI Workflows", "NLP/LLMs"] },
  { title: "Workflow Platforms", icon: Workflow, skills: ["n8n", "Make.com", "Zapier", "GoHighLevel"] },
  { title: "APIs & Integrations", icon: Plug, skills: ["REST APIs", "Webhooks", "ETL Pipelines", "System Integrations"] },
  { title: "Data & Analytics", icon: LineChart, skills: ["Python", "SQL", "Power BI", "Looker Studio", "BigQuery", "Advanced Excel"] },
  { title: "Programming", icon: Code, skills: ["Python", "JavaScript", "SQL"] },
  { title: "Consulting", icon: Users, skills: ["Requirements Gathering", "Solution Design", "Stakeholder Communication", "Documentation"] },
];

const Skills = () => (
  <section id="skills" className="relative px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
    <div className="absolute inset-0">
      <img src={fernCloseup} alt="" className="h-full w-full object-cover opacity-[0.2]" loading="lazy" />
      <div className="absolute inset-0 bg-background/80" />
    </div>

    <div className="relative mx-auto max-w-5xl">
      <FadeInSection>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
          Technical Skills
        </h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-lg">The tools and expertise I bring to every project.</p>
      </FadeInSection>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                whileHover={{ y: -6, scale: 1.03, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative cursor-default"
                style={{
                  background: color.bg,
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
                  marginTop: idx % 3 === 1 ? "1.5rem" : idx % 3 === 2 ? "0.75rem" : "0",
                }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] w-12 h-5 rounded-sm z-10"
                  style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(2px)", border: "1px solid rgba(255,255,255,0.3)" }}
                />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 13px, #000 13px, #000 14px)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-5 h-5"
                  style={{ background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.08) 50%)` }}
                />
                <div className="relative p-5 sm:p-6">
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