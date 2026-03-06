import FadeInSection from "./FadeInSection";
import { Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
  <section id="experience" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-20 -right-20 h-[175px] w-[175px] md:h-[350px] md:w-[350px] rounded-full bg-[#7C3AED]/6 blur-[80px] md:blur-[120px]" />
      <div className="absolute -bottom-20 left-0 h-[125px] w-[125px] md:h-[250px] md:w-[250px] rounded-full bg-[#06B6D4]/5 blur-[60px] md:blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    {/* Desktop: floating squares */}
    <div className="pointer-events-none absolute top-[25%] right-[5%] h-2 w-2 rotate-45 border border-[#7C3AED]/15 animate-[floatSlow_6s_ease-in-out_infinite] hidden md:block" />
    <div className="pointer-events-none absolute bottom-[30%] left-[5%] h-2 w-2 rotate-45 border border-[#7C3AED]/15 animate-[floatSlow_7s_ease-in-out_infinite_1s] hidden md:block" />

    {/* Mobile: horizontal shimmer line + drifting orbs */}
    <div className="pointer-events-none absolute top-20 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent animate-shimmer md:hidden" />
    <div className="pointer-events-none absolute bottom-28 right-5 h-3 w-3 rounded-full bg-gradient-to-br from-[#7C3AED]/15 to-[#06B6D4]/10 blur-[2px] animate-drift md:hidden" />
    <div className="pointer-events-none absolute top-[40%] left-3 h-6 w-6 rounded-br-lg border-b border-r border-[#06B6D4]/12 animate-border-glow md:hidden" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Career</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
          Professional <span className="gradient-text">Experience</span>
        </h2>
      </FadeInSection>

      <div className="relative mt-10 sm:mt-14">
        <div className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent sm:block" />

        <div className="space-y-8 sm:space-y-10">
          {experiences.map((exp, idx) => (
            <FadeInSection key={exp.title + exp.company} delay={idx * 200}>
              <article className="relative sm:pl-14">
                <div className="absolute left-[11px] top-2 hidden h-[18px] w-[18px] items-center justify-center sm:flex">
                  <div className={`h-3 w-3 rounded-full border-2 ${exp.current ? "border-primary bg-primary/30" : "border-white/20 bg-white/5"}`} />
                  {exp.current && <div className="absolute h-3 w-3 rounded-full bg-primary/30 animate-ping" />}
                </div>

                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 md:p-8 transition-all duration-500 hover:border-primary/20 hover:bg-white/8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {exp.current && (
                    <span className="relative mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      Currently Working
                    </span>
                  )}

                  <div className="relative flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary/80 group-hover:text-white">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-base sm:text-lg font-display font-bold text-white">{exp.title}</h3>
                        <span className="shrink-0 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-white/70">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-white/50">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                  </div>

                  <ul className="relative mt-5 sm:mt-6 space-y-3 sm:pl-16">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-xs sm:text-sm leading-relaxed text-white/50">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary/50" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
