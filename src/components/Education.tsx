import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import coralDeep from "@/assets/coral-deep.jpg";

const coursework = ["Machine Learning", "Supply Chain Operations", "Statistical Forecasting", "Business Analytics"];

const Education = () => (
  <section id="education" className="relative px-6 py-20 sm:py-24 overflow-hidden">
    <div className="absolute inset-0 bg-muted/40 dark:bg-muted/20" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">Education</p>
        <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl">
          Academic Background
        </h2>
      </FadeInSection>

      <FadeInSection delay={200}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="group relative mt-12"
        >
          <div className="relative z-10 h-5 rounded-t-full bg-gradient-to-b from-[hsl(35,30%,70%)] to-[hsl(35,25%,60%)] shadow-sm border-x border-t border-[hsl(35,30%,75%)]" />

          <div
            className="relative border-x border-[hsl(35,25%,75%)] px-6 sm:px-10 py-8 sm:py-10"
            style={{
              background: "linear-gradient(180deg, hsl(35 25% 92%) 0%, hsl(35 20% 88%) 50%, hsl(35 25% 92%) 100%)",
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(35 20% 82% / 0.3) 3px, hsl(35 20% 82% / 0.3) 4px)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

            <div className="absolute top-4 right-6 sm:right-8">
              <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[hsl(0,55%,55%)] to-[hsl(0,45%,45%)] shadow-md flex items-center justify-center border-2 border-[hsl(0,40%,60%)]">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                <div className="h-5 w-2.5 bg-gradient-to-b from-[hsl(0,50%,52%)] to-[hsl(0,45%,42%)] rounded-b-sm -rotate-12" />
                <div className="h-5 w-2.5 bg-gradient-to-b from-[hsl(0,50%,52%)] to-[hsl(0,45%,42%)] rounded-b-sm rotate-12" />
              </div>
            </div>

            <div className="relative">
              <h3 className="text-lg sm:text-xl font-display font-bold text-[hsl(35,30%,25%)] pr-20">
                B.Tech in Artificial Intelligence & Data Science
              </h3>
              <p className="mt-2 text-sm font-medium text-[hsl(35,15%,40%)]">
                St. Joseph's Institute of Technology
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3.5 py-1 text-xs font-bold text-accent">
                CGPA: 7.56
              </span>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-[hsl(35,40%,40%)]" />
                  <span className="text-sm font-display font-semibold text-[hsl(35,25%,30%)]">Relevant Coursework</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <Badge key={c} variant="secondary" className="bg-[hsl(35,20%,85%)] border border-[hsl(35,20%,75%)] text-[hsl(35,15%,35%)] text-xs font-medium">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 h-5 rounded-b-full bg-gradient-to-t from-[hsl(35,30%,70%)] to-[hsl(35,25%,60%)] shadow-sm border-x border-b border-[hsl(35,30%,75%)]" />
        </motion.div>
      </FadeInSection>
    </div>
  </section>
);

export default Education;