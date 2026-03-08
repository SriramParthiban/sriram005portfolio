import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Play, Star } from "lucide-react";
import FadeInSection from "./FadeInSection";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  videoUrl?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Thompson",
    role: "Marketing Director",
    company: "Aspire Media",
    quote: "Sriram transformed our entire lead pipeline. What used to take our team hours of manual work now runs on autopilot with 99% accuracy. The automation systems he built have genuinely changed how we operate.",
    rating: 5,
    videoUrl: "/videos/testimonial-1.mp4",
  },
  {
    name: "Priya Nair",
    role: "Operations Manager",
    company: "TechVentures Inc.",
    quote: "The KPI tracking system Sriram built saved us over $40K in wasted ad spend. His ability to combine data analytics with intelligent automation is rare and incredibly valuable.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "CEO",
    company: "GrowthStack",
    quote: "We needed someone who could bridge the gap between sales, marketing, and operations data. Sriram didn't just build dashboards — he built an entire intelligence layer for our business.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 -left-20 h-[200px] w-[200px] md:h-[350px] md:w-[350px] rounded-full bg-primary/6 blur-[100px] md:blur-[140px]" />
        <div className="absolute bottom-10 right-0 h-[180px] w-[180px] md:h-[300px] md:w-[300px] rounded-full bg-accent/5 blur-[80px] md:blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
              <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">
                Testimonials
              </span>
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-accent to-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
              What People <span className="gradient-text">Say</span>
            </h2>
          </div>
        </FadeInSection>

        {/* Testimonial Card */}
        <FadeInSection>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                  <Quote className="h-10 w-10 sm:h-14 sm:w-14 text-primary/10" />
                </div>

                <div className="relative">
                  {/* Video placeholder */}
                  {t.videoUrl && (
                    <div className="mb-6 aspect-video w-full max-w-md mx-auto rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer group">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <Play className="h-6 w-6 text-primary ml-1" />
                        </div>
                        <span className="text-xs text-white/40">Watch testimonial</span>
                      </div>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[hsl(40,80%,55%)] text-[hsl(40,80%,55%)]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-base sm:text-lg leading-relaxed text-white/70 italic">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="mt-6 sm:mt-8 flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground text-sm sm:text-base">{t.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all min-h-[44px] min-w-[44px]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all duration-300 min-h-[8px] ${
                      idx === current
                        ? "w-8 bg-primary"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all min-h-[44px] min-w-[44px]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Testimonials;
