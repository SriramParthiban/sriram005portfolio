import { useRef, useState } from "react";
import FadeInSection from "./FadeInSection";
import { ChevronLeft, ChevronRight, Play, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import fernDetail from "@/assets/fern-detail.jpg";

const testimonials = [
  {
    name: "Dean Meader",
    role: "CEO",
    company: "Aspire Media Marketing",
    quote:
      "Sriram consistently demonstrates an exceptional ability to translate complex automation requirements into elegant, high-performance solutions. His work on our AI-driven outbound systems was transformative — reducing qualification time while significantly improving pipeline quality. He's not just a builder, he's a strategic thinker who connects technical execution with real business outcomes.",
    rating: 5,
    videoUrl: "/videos/testimonial-1.mp4",
  },
  {
    name: "Jesiha",
    role: "Program Director",
    company: "Wonkrew",
    quote:
      "What sets Sriram apart is his analytical rigor combined with genuine curiosity. During his time with our team, he didn't just analyze data — he uncovered insights that directly influenced our campaign strategy. His automated dashboards saved our team hours of manual work every week.",
    rating: 5,
    videoUrl: null,
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
    <section id="testimonials" className="relative px-4 sm:px-6 py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={fernDetail} alt="" className="h-full w-full object-cover opacity-[0.07]" loading="lazy" />
        <div className="absolute inset-0 bg-muted/80" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            What People Say
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Real feedback from real collaborators.</p>
        </FadeInSection>

        <FadeInSection>
          <div className="relative mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm"
              >
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                  <Quote className="h-10 w-10 sm:h-14 sm:w-14 text-primary/10" />
                </div>

                <div className="relative">
                  {t.videoUrl && (
                    <div
                      className="mb-6 aspect-video w-full max-w-md mx-auto rounded-xl overflow-hidden bg-muted border border-border cursor-pointer relative"
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
                        <div className="absolute inset-0 bg-foreground/30 flex flex-col items-center justify-center gap-2">
                          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                            <Play className="h-6 w-6 text-primary ml-1" />
                          </div>
                          <span className="text-xs text-white/80">Watch testimonial</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[hsl(40,80%,55%)] text-[hsl(40,80%,55%)]" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground italic">
                    "{t.quote}"
                  </p>

                  <div className="mt-6 sm:mt-8 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-foreground font-bold text-sm">
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
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all min-h-[44px] min-w-[44px]"
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
                        : "w-2 bg-border hover:bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all min-h-[44px] min-w-[44px]"
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