import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const coursework = ["Machine Learning", "Supply Chain Operations", "Statistical Forecasting", "Business Analytics"];

const Education = () => (
  <section id="education" className="relative px-6 py-20 sm:py-24 overflow-hidden">
    {/* Layered organic background */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-muted/30 to-primary/5 dark:from-accent/10 dark:via-muted/20 dark:to-primary/10" />
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/10 dark:bg-accent/15 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-primary/8 dark:bg-primary/12 blur-[100px]" />
    </div>

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">Education</p>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Academic Background
        </h2>
      </FadeInSection>

      <FadeInSection delay={200}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="group relative mt-12"
        >
          {/* Building roof / pediment */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Triangular pediment */}
            <div
              className="w-[85%] sm:w-[80%] h-0 border-l-[40px] sm:border-l-[60px] border-r-[40px] sm:border-r-[60px] border-b-[30px] sm:border-b-[40px] border-l-transparent border-r-transparent border-b-primary/20 dark:border-b-primary/30"
            />
            {/* Pediment accent line */}
            <div className="w-[85%] sm:w-[80%] h-1.5 bg-accent/60 dark:bg-accent/50" />
          </div>

          {/* Building columns + body */}
          <div className="relative flex">
            {/* Left column */}
            <div className="hidden sm:flex flex-col items-center w-10">
              <div className="w-8 h-3 bg-primary/15 dark:bg-primary/25 rounded-t-sm" />
              <div className="flex-1 w-5 bg-gradient-to-b from-primary/12 to-primary/8 dark:from-primary/20 dark:to-primary/12" />
              <div className="w-8 h-3 bg-primary/15 dark:bg-primary/25 rounded-b-sm" />
            </div>

            {/* Main building body */}
            <div className="flex-1 relative border-x-2 border-primary/15 dark:border-primary/25 bg-card dark:bg-card px-6 sm:px-10 py-8 sm:py-10">
              {/* Subtle brick texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 28px,
                    hsl(var(--primary) / 0.15) 28px,
                    hsl(var(--primary) / 0.15) 29px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 60px,
                    hsl(var(--primary) / 0.1) 60px,
                    hsl(var(--primary) / 0.1) 61px
                  )`
                }}
              />

              {/* Graduation icon */}
              <div className="absolute top-4 right-4 sm:right-6">
                <div className="relative h-12 w-12 rounded-full bg-accent/20 dark:bg-accent/30 flex items-center justify-center border border-accent/30 dark:border-accent/40">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Institution</span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground pr-16 leading-snug">
                  B.Tech in Artificial Intelligence &amp; Data Science
                </h3>

                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  St. Joseph's Institute of Technology
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/15 dark:bg-accent/20 px-3.5 py-1 text-xs font-bold text-accent">
                  CGPA: 7.56
                </span>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <span className="text-sm font-display font-semibold text-foreground">Relevant Coursework</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <Badge
                      key={c}
                      variant="secondary"
                      className="bg-secondary dark:bg-secondary border border-border text-secondary-foreground text-xs font-medium"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="hidden sm:flex flex-col items-center w-10">
              <div className="w-8 h-3 bg-primary/15 dark:bg-primary/25 rounded-t-sm" />
              <div className="flex-1 w-5 bg-gradient-to-b from-primary/12 to-primary/8 dark:from-primary/20 dark:to-primary/12" />
              <div className="w-8 h-3 bg-primary/15 dark:bg-primary/25 rounded-b-sm" />
            </div>
          </div>

          {/* Building base / steps */}
          <div className="flex flex-col items-center">
            <div className="w-full h-2 bg-primary/15 dark:bg-primary/25" />
            <div className="w-[104%] h-2 bg-primary/10 dark:bg-primary/18 rounded-b-sm" />
            <div className="w-[108%] h-1.5 bg-primary/6 dark:bg-primary/12 rounded-b-md" />
          </div>
        </motion.div>
      </FadeInSection>
    </div>
  </section>
);

export default Education;
