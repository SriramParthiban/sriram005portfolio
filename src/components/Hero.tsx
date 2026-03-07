import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpeg";
import PixelArtCanvas from "./PixelArtCanvas";

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
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-20"
      style={{ background: '#0d0f1a' }}
    >
      {/* Grid texture background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full blur-[120px] md:blur-[180px]" style={{ background: 'rgba(139,92,246,0.15)' }} />
        <div className="absolute bottom-1/4 left-1/6 h-[200px] w-[200px] md:h-[350px] md:w-[350px] rounded-full blur-[100px] md:blur-[140px]" style={{ background: 'rgba(45,212,191,0.1)' }} />
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* DESKTOP: Photo (left) | Content (center) | Pixel Art (right) */}
        <div className="hidden md:grid items-center" style={{ gridTemplateColumns: '210px 1fr 210px', gap: '2.5rem' }}>
          {/* LEFT: Profile Photo */}
          <motion.div variants={item} className="flex flex-col items-center">
            <div className="relative" style={{ width: 190, height: 210 }}>
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: '#2dd4bf' }} />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: '#2dd4bf' }} />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: '#2dd4bf' }} />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: '#2dd4bf' }} />

              <div
                className="relative overflow-hidden w-full h-full"
                style={{
                  borderRadius: 20,
                  border: '1px solid rgba(139,92,246,0.35)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.15), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Sriram Parthiban"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'top center' }}
                />
              </div>

              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
                style={{
                  background: 'rgba(4,6,14,0.85)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  color: '#22c55e',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#22c55e' }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#22c55e' }} />
                </span>
                ◈ AVAILABLE
              </div>
            </div>
          </motion.div>

          {/* CENTER: Content */}
          <div className="flex flex-col items-center text-center">
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1 variants={item} className="font-display text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl text-balance" style={{ color: '#e2e8f0' }}>
              Sriram{" "}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #2dd4bf)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Parthiban
              </span>
            </motion.h1>

            <motion.div variants={item} className="mt-4 h-8 sm:h-9 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-base sm:text-lg md:text-xl font-semibold font-display"
                  style={{ color: '#64748b' }}
                >
                  {roles[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={item} className="mt-5 max-w-lg text-sm sm:text-base leading-[1.8]" style={{ color: 'rgba(226,232,240,0.5)' }}>
              Designing intelligent automation systems that generate qualified pipeline,
              optimize GTM workflows, and build scalable AI-driven operations.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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

            <motion.p variants={item} className="mt-6 text-xs font-medium tracking-wide" style={{ color: 'rgba(226,232,240,0.3)' }}>
              AI-First · Data-Driven · Results-Oriented
            </motion.p>
          </div>

          {/* RIGHT: Pixel Art Canvas */}
          <motion.div variants={item} className="flex flex-col items-center">
            <div
              className="overflow-hidden"
              style={{
                width: 190,
                height: 190,
                borderRadius: 20,
                border: '1px solid rgba(139,92,246,0.2)',
                background: '#04060e',
              }}
            >
              <PixelArtCanvas size={190} />
            </div>
          </motion.div>
        </div>

        {/* MOBILE LAYOUT (< md) */}
        <div className="flex flex-col items-center text-center md:hidden">
          <motion.div variants={item} className="flex items-center justify-center gap-4 mb-8">
            <div className="relative" style={{ width: 130, height: 150 }}>
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: '#2dd4bf' }} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: '#2dd4bf' }} />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: '#2dd4bf' }} />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: '#2dd4bf' }} />
              <div
                className="relative overflow-hidden w-full h-full"
                style={{
                  borderRadius: 16,
                  border: '1px solid rgba(139,92,246,0.35)',
                  boxShadow: '0 0 20px rgba(139,92,246,0.12), 0 10px 40px rgba(0,0,0,0.4)',
                }}
              >
                <img src={profilePhoto} alt="Sriram Parthiban" className="w-full h-full object-cover" style={{ objectPosition: 'top center' }} />
              </div>
              <div
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-semibold whitespace-nowrap"
                style={{ background: 'rgba(4,6,14,0.85)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}
              >
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#22c55e' }} />
                  <span className="relative inline-flex h-1 w-1 rounded-full" style={{ background: '#22c55e' }} />
                </span>
                ◈ AVAILABLE
              </div>
            </div>

            <div className="overflow-hidden" style={{ width: 130, height: 130, borderRadius: 16, border: '1px solid rgba(139,92,246,0.2)', background: '#04060e' }}>
              <PixelArtCanvas size={130} />
            </div>
          </motion.div>

          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-semibold text-primary backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-balance" style={{ color: '#e2e8f0' }}>
            Sriram{" "}
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Parthiban</span>
          </motion.h1>

          <motion.div variants={item} className="mt-3 h-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p key={roleIdx} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="text-sm sm:text-base font-semibold font-display" style={{ color: '#64748b' }}>
                {roles[roleIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={item} className="mt-4 max-w-md text-xs sm:text-sm leading-[1.8]" style={{ color: 'rgba(226,232,240,0.5)' }}>
            Designing intelligent automation systems that generate qualified pipeline, optimize GTM workflows, and build scalable AI-driven operations.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button size="lg" className="glow-md font-semibold text-[0.85rem] px-6 py-5 transition-all duration-300 hover:glow-lg min-h-[44px] w-full sm:w-auto" asChild>
              <a href="#experience"><ArrowDown className="mr-2 h-4 w-4" />View Experience</a>
            </Button>
            <Button size="lg" className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-semibold text-[0.85rem] px-6 py-5 transition-all duration-300 min-h-[44px] w-full sm:w-auto" asChild>
              <a href="#contact"><Mail className="mr-2 h-4 w-4" />Contact Me</a>
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-5 text-[10px] font-medium tracking-wide" style={{ color: 'rgba(226,232,240,0.3)' }}>
            AI-First · Data-Driven · Results-Oriented
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
