import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import profilePhoto from "@/assets/profile-photo.jpeg";

const roles = [
  "AI Automation Specialist",
  "Revenue Operations Engineer",
  "GTM Strategy Builder",
  "Data Pipeline Architect",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="dark-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-[200px] w-[200px] md:h-[400px] md:w-[400px] rounded-full bg-[#7C3AED]/10 blur-[80px] md:blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-[200px] w-[200px] md:h-[400px] md:w-[400px] rounded-full bg-[#06B6D4]/10 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] md:h-[500px] md:w-[500px] rounded-full bg-[#7C3AED]/20 blur-[100px] md:blur-[150px]" />
      </div>

      {/* Dotted grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />

      {/* Mobile: animated gradient accent lines + floating orbs */}
      <div className="pointer-events-none absolute top-[12%] left-4 h-16 w-[2px] rounded-full bg-gradient-to-b from-[#7C3AED]/30 to-transparent animate-[pulseFade_4s_ease-in-out_infinite] md:hidden" />
      <div className="pointer-events-none absolute top-[8%] right-6 h-20 w-[2px] rounded-full bg-gradient-to-b from-[#06B6D4]/25 to-transparent animate-[pulseFade_5s_ease-in-out_infinite_1s] md:hidden" />
      <div className="pointer-events-none absolute bottom-[15%] left-8 h-3 w-3 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/15 blur-[2px] animate-drift md:hidden" />
      <div className="pointer-events-none absolute bottom-[25%] right-6 h-2 w-2 rounded-full bg-[#06B6D4]/20 blur-[1px] animate-[drift_6s_ease-in-out_infinite_2s] md:hidden" />
      {/* Mobile: corner flourish */}
      <div className="pointer-events-none absolute top-20 right-4 h-8 w-8 rounded-tr-xl border-t border-r border-[#7C3AED]/15 animate-border-glow md:hidden" />
      <div className="pointer-events-none absolute bottom-24 left-4 h-8 w-8 rounded-bl-xl border-b border-l border-[#06B6D4]/15 animate-[borderGlow_4s_ease-in-out_infinite_2s] md:hidden" />

      {/* Desktop: floating dots */}
      <div className="pointer-events-none absolute top-[15%] right-[10%] h-1 w-1 rounded-full bg-[#7C3AED]/10 animate-[float_4s_ease-in-out_infinite] hidden md:block" />
      <div className="pointer-events-none absolute top-[20%] right-[15%] h-1 w-1 rounded-full bg-[#7C3AED]/10 animate-[float_5s_ease-in-out_infinite_0.5s] hidden md:block" />
      <div className="pointer-events-none absolute top-[12%] right-[20%] h-1 w-1 rounded-full bg-[#7C3AED]/10 animate-[float_3.5s_ease-in-out_infinite_1s] hidden md:block" />
      <div className="pointer-events-none absolute top-[18%] right-[8%] h-1 w-1 rounded-full bg-[#7C3AED]/10 animate-[float_4.5s_ease-in-out_infinite_0.3s] hidden md:block" />
      <div className="pointer-events-none absolute top-[25%] right-[12%] h-1 w-1 rounded-full bg-[#7C3AED]/10 animate-[float_5.5s_ease-in-out_infinite_0.8s] hidden md:block" />

      <motion.div
        className="relative mx-auto max-w-5xl w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge - centered */}
        <motion.div variants={item} className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:gap-16 lg:gap-20">
          {/* LEFT: Profile photo */}
          <motion.div variants={item} className="flex shrink-0 justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 blur-xl" />
              <img
                src={profilePhoto}
                alt="Sriram Parthiban"
                className="relative h-36 w-36 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full object-cover ring-4 ring-primary/25 shadow-[0_0_60px_-10px_hsl(var(--primary)/0.4)]"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <motion.h1 variants={item} className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance">
              Sriram{" "}
              <span className="gradient-text-warm">Parthiban</span>
            </motion.h1>

            {/* Typing role animation */}
            <motion.div variants={item} className="mt-4 h-8 sm:h-9 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-base sm:text-lg md:text-xl font-semibold text-white/60 font-display"
                >
                  {roles[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={item} className="mt-5 max-w-xl text-sm sm:text-base leading-[1.8] text-white/50">
              Designing intelligent automation systems that generate qualified pipeline,
              optimize GTM workflows, and build scalable AI-driven operations.
            </motion.p>

            {/* Video intro */}
            <motion.div variants={item} className="mt-6 w-full max-w-md">
              <div className="group relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm cursor-pointer">
                {/* Placeholder — replace src with your actual video URL */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="h-14 w-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]">
                    <svg className="h-5 w-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="text-xs text-white/40 font-medium">Watch my intro</span>
                </div>
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <Button size="lg" className="glow-md font-semibold text-[0.9rem] px-6 sm:px-7 py-6 transition-all duration-300 hover:glow-lg min-h-[44px]" asChild>
                <a href="#experience">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  View Experience
                </a>
              </Button>
              <Button size="lg" className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-semibold text-[0.9rem] px-6 sm:px-7 py-6 transition-all duration-300 min-h-[44px]" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </motion.div>

            <motion.p variants={item} className="mt-6 text-xs font-medium text-white/30 tracking-wide">
              AI-First · Data-Driven · Results-Oriented
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
