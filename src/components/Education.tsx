import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const coursework = ["Machine Learning", "Supply Chain Operations", "Statistical Forecasting", "Business Analytics"];

const Education = () => (
  <section id="education" className="dark-section relative px-6 py-32 overflow-hidden">
    {/* Background */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/6 blur-[120px]" />
      <div className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-accent/5 blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

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

      {/* Diploma Scroll */}
      <FadeInSection delay={200}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="group relative mt-12"
        >
          {/* Top scroll roll */}
          <div className="relative z-10 h-5 rounded-t-full bg-gradient-to-b from-[hsl(35,30%,30%)] to-[hsl(35,25%,22%)] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)] border-x border-t border-[hsl(35,30%,35%)]" />

          {/* Parchment body */}
          <div
            className="relative border-x border-[hsl(35,20%,25%)] px-6 sm:px-10 py-8 sm:py-10"
            style={{
              background: "linear-gradient(180deg, hsl(35 20% 12%) 0%, hsl(35 15% 10%) 50%, hsl(35 20% 12%) 100%)",
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(35 20% 15% / 0.3) 3px, hsl(35 20% 15% / 0.3) 4px)",
            }}
          >
            {/* Subtle parchment grain */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

            {/* Ribbon/seal */}
            <div className="absolute top-4 right-6 sm:right-8">
              <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[hsl(0,65%,40%)] to-[hsl(0,50%,30%)] shadow-[0_4px_16px_-2px_rgba(139,0,0,0.4)] flex items-center justify-center border-2 border-[hsl(0,40%,45%)]">
                <GraduationCap className="h-6 w-6 text-[hsl(40,80%,85%)]" />
              </div>
              {/* Ribbon tails */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                <div className="h-5 w-2.5 bg-gradient-to-b from-[hsl(0,60%,38%)] to-[hsl(0,50%,28%)] rounded-b-sm -rotate-12" />
                <div className="h-5 w-2.5 bg-gradient-to-b from-[hsl(0,60%,38%)] to-[hsl(0,50%,28%)] rounded-b-sm rotate-12" />
              </div>
            </div>

            <div className="relative">
              <h3 className="text-lg sm:text-xl font-display font-bold text-[hsl(40,30%,75%)] pr-20">
                B.Tech in Artificial Intelligence & Data Science
              </h3>
              <p className="mt-2 text-sm font-medium text-[hsl(35,15%,50%)]">
                St. Joseph's Institute of Technology
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent">
                CGPA: 7.56
              </span>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-[hsl(40,40%,55%)]" />
                  <span className="text-sm font-display font-semibold text-[hsl(40,30%,70%)]">Relevant Coursework</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <Badge key={c} variant="secondary" className="bg-white/5 border border-[hsl(35,20%,25%)] text-[hsl(35,15%,55%)] text-xs font-medium">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom scroll roll */}
          <div className="relative z-10 h-5 rounded-b-full bg-gradient-to-t from-[hsl(35,30%,30%)] to-[hsl(35,25%,22%)] shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.4)] border-x border-b border-[hsl(35,30%,35%)]" />
        </motion.div>
      </FadeInSection>
    </div>
  </section>
);

export default Education;
