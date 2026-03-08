import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpeg";
import mountainFog from "@/assets/mountain-fog.jpg";

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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-20">
      {/* Nature background image */}
      <div className="absolute inset-0">
        <img 
          src={natureWaterfall} 
          alt="" 
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/35" />
      </div>

      <motion.div
        className="relative mx-auto max-w-5xl w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
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
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10 blur-xl" />
              <img
                src={profilePhoto}
                alt="Sriram Parthiban"
                className="relative h-36 w-36 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full object-cover ring-4 ring-primary/20 shadow-[0_0_60px_-10px_hsl(var(--primary)/0.2)]"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <motion.h1 variants={item} className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance" style={{ color: '#1a1a1a', textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)' }}>
              Sriram{" "}
              <span className="gradient-text-warm" style={{ textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)' }}>Parthiban</span>
            </motion.h1>

            {/* Role animation */}
            <motion.div variants={item} className="mt-4 h-8 sm:h-9 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-base sm:text-lg md:text-xl font-bold font-display italic" style={{ color: '#2a2a2a', textShadow: '0 0 16px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)' }}
                >
                  {roles[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={item} className="mt-5 max-w-xl text-sm sm:text-base leading-[1.8] font-semibold" style={{ color: '#1a1a1a', textShadow: '0 0 14px rgba(255,255,255,0.9), 0 0 28px rgba(255,255,255,0.5)' }}>
              Designing intelligent automation systems that generate qualified pipeline,
              optimize GTM workflows, and build scalable AI-driven operations.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <Button size="lg" className="glow-md font-semibold text-[0.9rem] px-6 sm:px-7 py-6 transition-all duration-300 hover:glow-lg min-h-[44px]" asChild>
                <a href="#experience">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  View Experience
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-semibold text-[0.9rem] px-6 sm:px-7 py-6 transition-all duration-300 min-h-[44px]" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </motion.div>

            <motion.p variants={item} className="mt-6 text-xs font-bold tracking-wide" style={{ color: '#333', textShadow: '0 0 12px rgba(255,255,255,0.9)' }}>
              AI-First · Data-Driven · Results-Oriented
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;