import FadeInSection from "./FadeInSection";
import { Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import expAiAutomation from "@/assets/exp-ai-automation.png";
import expDataAnalyst from "@/assets/exp-data-analyst.png";

const experiences = [
  {
    title: "AI Automation Specialist",
    company: "Aspire Media Marketing",
    location: "Remote / Canada",
    period: "June 2024 – Present",
    current: true,
    illustration: expAiAutomation,
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
    illustration: expDataAnalyst,
    bullets: [
      "Processed and analyzed 500,000+ records using BigQuery and SQL, building robust data pipelines for marketing and operations teams.",
      "Reduced average query execution time by 80% through schema optimization and indexing strategies.",
      "Built interactive Power BI dashboards that improved decision-making speed by 50% across leadership teams.",
      "Improved demand forecasting accuracy by 25% using statistical models and trend analysis.",
      "Delivered actionable reporting frameworks that became standard tooling for the analytics function.",
    ],
  },
];
const tapeStyle = "absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-16 bg-gradient-to-b from-white/20 to-white/5 rounded-sm backdrop-blur-sm border border-white/10 z-10";

const Experience = () => (
  <section id="experience" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
    {/* Background effects */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-20 -right-20 h-[175px] w-[175px] md:h-[350px] md:w-[350px] rounded-full bg-primary/6 blur-[80px] md:blur-[120px]" />
      <div className="absolute -bottom-20 left-0 h-[125px] w-[125px] md:h-[250px] md:w-[250px] rounded-full bg-accent/5 blur-[60px] md:blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    <div className="relative mx-auto max-w-4xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Career</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
          Professional <span className="gradient-text">Experience</span>
        </h2>
      </FadeInSection>

      {/* Timeline */}
      <div className="relative mt-14 sm:mt-20">
        {/* Glowing vertical line — left on mobile, center on desktop */}
        <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
        <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/10 blur-[4px]" />

        <div className="space-y-16 sm:space-y-20">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <FadeInSection key={exp.title + exp.company} delay={idx * 200}>
                <div className="relative">
                  {/* Timeline node — glowing dot */}
                  <div className="absolute left-4 sm:left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className={`h-4 w-4 rounded-full border-2 ${exp.current ? "border-primary bg-primary/40" : "border-muted-foreground/30 bg-muted/30"} shadow-[0_0_12px_2px_hsl(var(--primary)/0.3)]`} />
                    {exp.current && <div className="absolute inset-0 h-4 w-4 rounded-full bg-primary/30 animate-ping" />}
                  </div>

                  {/* Desktop: card + illustration side by side */}
                  <div className="ml-12 sm:ml-0 sm:flex sm:items-center">
                    {/* Card */}
                    <div className={`sm:w-[calc(50%-40px)] ${isLeft ? "sm:order-1" : "sm:order-2 sm:ml-auto"}`}>
                      <motion.div
                        whileHover={{ rotate: isLeft ? -1 : 1, y: -6, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative rounded-sm bg-white/[0.07] border border-white/15 p-4 sm:p-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_2px_8px_-2px_rgba(0,0,0,0.3)]"
                        style={{ transform: `rotate(${isLeft ? -0.5 : 0.5}deg)` }}
                      >
                        <div className={tapeStyle} />
                        {exp.current && (
                          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            Currently Working
                          </span>
                        )}
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 text-primary">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-display font-bold text-foreground">{exp.title}</h3>
                            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                              {exp.company} · {exp.location}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-right">
                          <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-[11px] font-bold tracking-wide text-primary/80 italic">
                            {exp.period}
                          </span>
                        </div>
                        <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        <ul className="space-y-2">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/50" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Pixel art illustration — desktop only */}
                    <div className={`hidden sm:flex sm:w-[calc(50%-40px)] items-center justify-center ${isLeft ? "sm:order-2 sm:ml-auto" : "sm:order-1"}`}>
                      <motion.img
                        src={exp.illustration}
                        alt={`${exp.title} pixel art illustration`}
                        className="w-48 md:w-56 lg:w-64 h-auto object-contain drop-shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.06, y: -6 }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
