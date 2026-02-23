import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const metrics = [
  { value: 1000, suffix: "+", label: "Daily AI Interactions", icon: "⚡" },
  { value: 99, suffix: "%", label: "Operational Accuracy", icon: "🎯" },
  { value: 40, prefix: "$", suffix: "K+", label: "Cost Prevented", icon: "💰" },
  { value: 500, suffix: "K+", label: "Records Processed", icon: "📊" },
];

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, started]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

const Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
    {/* Ambient background */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/6 blur-[100px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/3 blur-[150px] animate-float-slow" />
    </div>

    {/* Grid pattern overlay */}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    <motion.div
      className="relative mx-auto max-w-3xl text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Status badge */}
      <motion.div variants={item} className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for opportunities
        </span>
      </motion.div>

      <motion.h1 variants={item} className="font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
        Sriram{" "}
        <span className="gradient-text-warm">Parthiban</span>
      </motion.h1>

      <motion.p variants={item} className="mt-5 text-lg font-semibold text-muted-foreground sm:text-xl font-display">
        AI Automation & Revenue Operations Specialist
      </motion.p>

      <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-muted-foreground/80">
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
        <Button size="lg" variant="outline" className="font-semibold text-[0.9rem] px-7 py-6 border-border/60 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:glow-sm" asChild>
          <a href="#contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </a>
        </Button>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {metrics.map((m, idx) => (
          <motion.div
            key={m.label}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm card-hover"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative text-lg">{m.icon}</span>
            <p className="relative mt-2 text-2xl font-bold text-foreground font-display sm:text-3xl">
              <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
            </p>
            <p className="relative mt-1 text-xs font-medium text-muted-foreground">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>
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
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground/50 uppercase">Scroll</span>
        <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/20 p-1">
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

export default Hero;
