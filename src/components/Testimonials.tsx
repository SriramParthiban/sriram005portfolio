import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Play, Star } from "lucide-react";
import FadeInSection from "./FadeInSection";
import fernDetail from "@/assets/fern-detail.jpg";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Marcelo",
    role: "Director",
    company: "",
    quote: "Sriram transformed our entire lead pipeline. What used to take our team hours of manual work now runs on autopilot with 99% accuracy. The automation systems he built have genuinely changed how we operate.",
    rating: 5,
  },
  {
    name: "Rohit",
    role: "Operations Manager",
    company: "TechVentures Inc.",
    quote: "The KPI tracking system Sriram built saved us over $40K in wasted ad spend. His ability to combine data analytics with intelligent automation is rare and incredibly valuable.",
    rating: 5,
  },
  {
    name: "Nazir",
    role: "CEO",
    company: "GrowthStack",
    quote: "We needed someone who could bridge the gap between sales, marketing, and operations data. Sriram didn't just build dashboards — he built an entire intelligence layer for our business.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const next = () => { setCurrent((c) => (c + 1) % testimonials.length); setVideoPlaying(false); };
  const prev = () => { setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); setVideoPlaying(false); };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Bright leaves background */}
      <div className="absolute inset-0">
        <img src={fernDetail} alt="" className="h-full w-full object-cover opacity-[0.12]" loading="lazy" />
        <div className="absolute inset-0 bg-[hsl(155_25%_5%/0.92)]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
              What People Say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Real feedback from real collaborators.</p>
            <span className="font-handwritten text-base sm:text-lg text-primary/40 mt-2 inline-block" style={{ transform: "rotate(2deg)" }}>
              (not my mom, I swear 😄)
            </span>
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
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                  <Quote className="h-10 w-10 sm:h-14 sm:w-14 text-primary/10" />
                </div>

                <div className="relative">
                  {t.videoUrl && (
                    <div
                      className="mb-6 aspect-video w-full max-w-md mx-auto rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer relative"
                      onClick={() => {
                        if (vidRef.current) {
                          if (videoPlaying) { vidRef.current.pause(); } else { vidRef.current.play(); }
                          setVideoPlaying(!videoPlaying);
                        }
                      }}
                    >
                      <video
                        ref={vidRef}
                        src={t.videoUrl}
                        className="absolute inset-0 h-full w-full object-cover"
                        playsInline
                        preload="metadata"
                        onEnded={() => setVideoPlaying(false)}
                      />
                      {!videoPlaying && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                            <Play className="h-6 w-6 text-primary ml-1" />
                          </div>
                          <span className="text-xs text-white/40">Watch testimonial</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[hsl(40,80%,55%)] text-[hsl(40,80%,55%)]" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-white/70 italic">
                    "{t.quote}"
                  </p>

                  <div className="mt-6 sm:mt-8 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground text-sm sm:text-base">{t.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t.role}{t.company ? ` · ${t.company}` : ""}
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
