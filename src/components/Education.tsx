import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const coursework = ["Machine Learning", "Supply Chain Operations", "Statistical Forecasting", "Business Analytics"];

const Education = () => (
  <section id="education" className="relative px-6 py-20 sm:py-24 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3 text-center">Education</p>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-center">
          Academic Background
        </h2>
      </FadeInSection>

      <FadeInSection delay={200}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mt-12 rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Top row: icon + degree */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-accent/15 dark:bg-accent/20 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-snug">
                B.Tech in Artificial Intelligence &amp; Data Science
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  St. Joseph's Institute of Technology
                </span>
              </div>
            </div>
          </div>

          {/* CGPA badge */}
          <div className="mt-5 ml-[4.75rem]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 dark:bg-accent/25 px-4 py-1.5 text-sm font-bold text-accent">
              CGPA: 7.56
            </span>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-border" />

          {/* Coursework */}
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-sm font-display font-semibold text-foreground">Relevant Coursework</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {coursework.map((c) => (
              <Badge
                key={c}
                variant="secondary"
                className="bg-secondary dark:bg-secondary border border-border text-secondary-foreground text-xs font-medium px-3 py-1"
              >
                {c}
              </Badge>
            ))}
          </div>
        </motion.div>
      </FadeInSection>
    </div>
  </section>
);

export default Education;
