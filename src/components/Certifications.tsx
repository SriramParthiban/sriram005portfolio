import { Award, ExternalLink } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";

const certs = [
  { name: "Supply Chain Operations", platform: "Udemy" },
  { name: "SQL for Data Science", platform: "UC Davis (Coursera)" },
  { name: "Data Analytics & Power BI", platform: "PrepInsta" },
  { name: "TensorFlow for Deep Learning", platform: "Udemy" },
];

const Certifications = () => (
  <section id="certifications" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-0 right-20 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-[#7C3AED]/6 blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-20 -left-20 h-[125px] w-[125px] md:h-[250px] md:w-[250px] rounded-full bg-[#06B6D4]/5 blur-[60px] md:blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    {/* Desktop: </> watermark + cyan orbs */}
    <div className="pointer-events-none absolute bottom-16 left-6 text-8xl font-display font-bold text-white/[0.04] select-none hidden md:block">&lt;/&gt;</div>
    <div className="pointer-events-none absolute top-10 left-10 h-[80px] w-[80px] rounded-full bg-[#06B6D4]/10 blur-[50px] hidden md:block" />
    <div className="pointer-events-none absolute bottom-10 right-10 h-[80px] w-[80px] rounded-full bg-[#06B6D4]/10 blur-[50px] hidden md:block" />

    {/* Mobile: gradient accent line + drifting orb + corner flourish */}
    <div className="pointer-events-none absolute top-14 right-4 h-16 w-[1.5px] rounded-full bg-gradient-to-b from-[#7C3AED]/20 via-[#06B6D4]/15 to-transparent animate-[pulseFade_4s_ease-in-out_infinite_0.5s] md:hidden" />
    <div className="pointer-events-none absolute bottom-24 left-5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#06B6D4]/15 to-[#7C3AED]/10 blur-[2px] animate-drift md:hidden" />
    <div className="pointer-events-none absolute bottom-12 right-3 h-7 w-7 rounded-tr-xl border-t border-r border-[#06B6D4]/12 animate-border-glow md:hidden" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Credentials</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
          Professional <span className="gradient-text">Certifications</span>
        </h2>
      </FadeInSection>

      <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certs.map((c, idx) => (
          <FadeInSection key={c.name} delay={idx * 120}>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-white/8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-white">
                  <Award className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display font-bold text-white">{c.name}</p>
                  <p className="mt-1 text-xs font-medium text-white/40">{c.platform}</p>
                </div>
                <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
