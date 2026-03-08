import FadeInSection from "./FadeInSection";
import { Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import expAiAutomation from "@/assets/exp-ai-automation.png";
import expDataAnalyst from "@/assets/exp-data-analyst.png";
import forestCanopy from "@/assets/forest-canopy.jpg";

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
      "Performed cross-channel performance analysis across Google Ads, Meta Ads, and organic content — identifying high-ROI patterns that informed budget reallocation decisions.",
      "Built automated reporting dashboards in Power BI and Looker Studio, reducing manual reporting time by over 60%.",
      "Designed and maintained ETL pipelines for marketing data consolidation from 5+ platforms into a unified analytics layer.",
      "Developed predictive models for campaign performance forecasting using Python and scikit-learn.",
    ],
  },
];

const tapeStyle = "absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-amber-100/70 to-amber-200/50 border border-amber-300/30 rounded-sm z-10 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.1)]";

const Experience = () => (
  <section id="experience" className="relative px-4 sm:px-6 py-28 sm:py-36 overflow-hidden">
    {/* Forest canopy background */}
    <div className="absolute inset-0">
      <img src={forestCanopy} alt="" className="h-full w-full object-cover opacity-[0.08]" loading="lazy" />
      <div className="absolute inset-0 bg-background/92" />
    </div>

    <div className="relative mx-auto max-w-4xl">
      <FadeInSection>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
          Professional Experience
        </h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />
      </FadeInSection>

      {/* Timeline */}
      <div className="relative mt-14 sm:mt-20">
        <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />

        <div className="space-y-16 sm:space-y-20">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <FadeInSection key={exp.title + exp.company} delay={idx * 200}>
                <div className="relative">
                  <div className="absolute left-4 sm:left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className={`h-4 w-4 rounded-full border-2 ${exp.current ? "border-primary bg-primary/30" : "border-muted-foreground/30 bg-muted/30"} shadow-[0_0_12px_2px_hsl(var(--primary)/0.2)]`} />
                    {exp.current && <div className="absolute inset-0 h-4 w-4 rounded-full bg-primary/20 animate-ping" />}
                  </div>

                  <div className="ml-12 sm:ml-0 sm:flex sm:items-center">
                    <div className={`sm:w-[calc(50%-40px)] ${isLeft ? "sm:order-1" : "sm:order-2 sm:ml-auto"}`}>
                      <motion.div
                        whileHover={{ rotate: isLeft ? -1 : 1, y: -6, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative rounded-sm bg-card border border-border p-4 sm:p-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08),0_2px_8px_-2px_rgba(0,0,0,0.04)]"
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
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
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
                        <div className="my-3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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

                    <div className={`hidden sm:flex sm:w-[calc(50%-40px)] items-center justify-center ${isLeft ? "sm:order-2 sm:ml-auto" : "sm:order-1"}`}>
                      <motion.img
                        src={exp.illustration}
                        alt={`${exp.title} pixel art illustration`}
                        className="w-48 md:w-56 lg:w-64 h-auto object-contain drop-shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
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