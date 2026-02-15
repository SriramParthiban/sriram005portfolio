import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const coursework = ["Machine Learning", "Supply Chain Operations", "Statistical Forecasting", "Business Analytics"];

const Education = () => (
  <section id="education" className="bg-secondary/30 px-6 py-28">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Education</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Education</h2>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                B.Tech in Artificial Intelligence & Data Science
              </h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                St. Joseph's Institute of Technology
              </p>
              <span className="mt-1 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                CGPA: 7.56
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 pl-16">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Relevant Coursework</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 pl-16">
            {coursework.map((c) => (
              <Badge key={c} variant="secondary" className="text-xs font-normal">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default Education;
