import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
    <section className="dark-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px] animate-float-slow" />
      </div>

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Profile photo */}
        <motion.div variants={item} className="mb-6 flex justify-center">
          <div className="relative">
            <img src={profilePhoto} alt="Sriram Parthiban" className="h-28 w-28 rounded-full object-cover ring-4 ring-primary/20 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]" />
          </div>
        </motion.div>

        <motion.h1 variants={item} className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl text-balance">
          Sriram{" "}
          <span className="gradient-text-warm">Parthiban</span>
        </motion.h1>

        {/* Typing role animation */}
        <motion.div variants={item} className="mt-5 h-8 sm:h-9 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIdx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-lg font-semibold text-white/60 sm:text-xl font-display"
            >
              {roles[roleIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-white/50">
          Designing intelligent automation systems that generate qualified pipeline,
          optimize GTM workflows, and build scalable AI-driven operations.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="glow-md font-semibold text-[0.9rem] px-7 py-6 transition-all duration-300 hover:glow-lg" asChild>
            <a href="#experience">
              <ArrowDown className="mr-2 h-4 w-4" />
              View Experience
            </a>
          </Button>
          <Button size="lg" className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-semibold text-[0.9rem] px-7 py-6 transition-all duration-300" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </motion.div>

        {/* Micro trust */}
        <motion.p variants={item} className="mt-8 text-xs font-medium text-white/30 tracking-wide">
          AI-First · Data-Driven · Results-Oriented
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium tracking-widest text-white/30 uppercase">Scroll</span>
          <div className="h-8 w-5 rounded-full border-2 border-white/20 p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
