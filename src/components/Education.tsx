import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const coursework = ["Machine Learning", "Supply Chain Operations", "Statistical Forecasting", "Business Analytics"];

const Education = () => (
  <section id="education" className="relative px-6 py-32">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Education</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl">
          Academic <span className="gradient-text">Background</span>
        </h2>
      </FadeInSection>

      <FadeInSection delay={200}>
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="group relative mt-12 overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 card-hover sm:p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-foreground">
                B.Tech in Artificial Intelligence & Data Science
              </h3>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                St. Joseph's Institute of Technology
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent">
                CGPA: 7.56
              </span>
            </div>
          </div>

          <div className="relative mt-8 sm:pl-[76px]">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-display font-semibold text-foreground">Relevant Coursework</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {coursework.map((c) => (
                <Badge key={c} variant="secondary" className="bg-secondary/60 border border-border/30 text-xs font-medium">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </FadeInSection>
    </div>
  </section>
);

export default Education;
