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
  <section id="certifications" className="relative px-6 py-32">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Credentials</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl">
          Professional <span className="gradient-text">Certifications</span>
        </h2>
      </FadeInSection>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certs.map((c, idx) => (
          <FadeInSection key={c.name} delay={idx * 120}>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground">
                  <Award className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display font-bold text-foreground">{c.name}</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{c.platform}</p>
                </div>
                <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
