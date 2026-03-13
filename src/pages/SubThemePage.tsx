import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Workflow, BarChart3, Zap, Globe, MessageSquare, Linkedin, Github, Mail } from "lucide-react";

import pythonLogo from "@/assets/logos/python.svg";
import n8nLogo from "@/assets/logos/n8n.svg";
import zapierLogo from "@/assets/logos/zapier.png";
import postgresqlLogo from "@/assets/logos/postgresql.svg";
import javascriptLogo from "@/assets/logos/javascript.svg";

const SubThemePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Orb transforms
  const orbX = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55, 0.72], ["0%", "-35%", "0%", "35%", "0%"]);
  const orbY = useTransform(scrollYProgress, [0, 0.72, 0.85, 1], ["0px", "0px", "-80px", "-200px"]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0.3, 1, 1, 0.5]);
  const orbGlow = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [20, 35, 45, 25]);

  // Stage opacities
  const heroOp = useTransform(scrollYProgress, [0, 0.08, 0.14, 0.18], [1, 1, 0.5, 0]);
  const s1Op = useTransform(scrollYProgress, [0.12, 0.18, 0.28, 0.33], [0, 1, 1, 0]);
  const s2Op = useTransform(scrollYProgress, [0.30, 0.36, 0.48, 0.53], [0, 1, 1, 0]);
  const s3Op = useTransform(scrollYProgress, [0.50, 0.56, 0.65, 0.70], [0, 1, 1, 0]);
  const s4Op = useTransform(scrollYProgress, [0.67, 0.73, 0.80, 0.85], [0, 1, 1, 0]);
  const finalOp = useTransform(scrollYProgress, [0.85, 0.92], [0, 1]);

  const TechIcon = ({ src, label, delay = 0 }: { src: string; label: string; delay?: number }) => (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
        <img src={src} alt={label} className="w-8 h-8 md:w-9 md:h-9" />
      </div>
      <span className="text-xs text-white/50 font-mono">{label}</span>
    </motion.div>
  );

  const LucideIcon = ({ icon: Icon, label, delay = 0 }: { icon: any; label: string; delay?: number }) => (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-cyan-400/80" />
      </div>
      <span className="text-xs text-white/50 font-mono">{label}</span>
    </motion.div>
  );

  const Metric = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
    <motion.div
      className="text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
    >
      <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
        {value}
      </div>
      <div className="text-sm md:text-base text-white/40 mt-2">{label}</div>
    </motion.div>
  );

  return (
    <div className="bg-[#07080f] text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Scrollable container */}
      <div ref={containerRef} className="relative" style={{ height: "600vh" }}>
        {/* Fixed viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Animated orb */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden md:block"
            style={{ x: orbX, y: orbY, opacity: orbOpacity, scale: orbScale }}
          >
            <motion.div
              className="w-5 h-5 rounded-full bg-cyan-400"
              style={{
                boxShadow: useTransform(orbGlow, (v) => `0 0 ${v}px ${v / 2}px rgba(34,211,238,0.4), 0 0 ${v * 2}px ${v}px rgba(34,211,238,0.15)`),
              }}
            />
            {/* Trail lines */}
            <div className="absolute top-1/2 right-full -translate-y-1/2 w-32 h-px bg-gradient-to-l from-cyan-400/40 to-transparent" />
            <div className="absolute top-1/2 left-full -translate-y-1/2 w-32 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </motion.div>

          {/* HERO */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20"
            style={{ opacity: heroOp }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-cyan-400 mb-8 md:hidden"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                Designing Intelligent
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Automation Systems
              </span>
            </h1>
            <p className="text-white/40 text-sm md:text-lg mt-6 max-w-xl font-light tracking-wide">
              AI Automation Specialist building scalable intelligent workflows
            </p>
            <motion.div
              className="mt-12 text-white/20 text-xs font-mono tracking-widest"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SCROLL TO EXPLORE ↓
            </motion.div>
          </motion.section>

          {/* STAGE 1 — Foundations */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20"
            style={{ opacity: s1Op }}
          >
            <div className="text-[10px] md:text-xs font-mono text-cyan-400/60 tracking-[0.3em] mb-8">
              STAGE 01 — FOUNDATIONS
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center mb-10">
              <TechIcon src={pythonLogo} label="Python" delay={0} />
              <TechIcon src={postgresqlLogo} label="SQL" delay={0.1} />
              <LucideIcon icon={Brain} label="Machine Learning" delay={0.2} />
              <TechIcon src={javascriptLogo} label="JavaScript" delay={0.3} />
            </div>
            <p className="text-white/50 text-sm md:text-lg max-w-md font-light">
              Building strong foundations in data and AI systems.
            </p>
          </motion.section>

          {/* STAGE 2 — Automation Tools */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20"
            style={{ opacity: s2Op }}
          >
            <div className="text-[10px] md:text-xs font-mono text-cyan-400/60 tracking-[0.3em] mb-8">
              STAGE 02 — AUTOMATION TOOLS
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center mb-10">
              <TechIcon src={n8nLogo} label="n8n" delay={0} />
              <TechIcon src={zapierLogo} label="Zapier" delay={0.1} />
              <LucideIcon icon={Zap} label="APIs" delay={0.2} />
              <LucideIcon icon={Globe} label="Webhooks" delay={0.3} />
            </div>
            <p className="text-white/50 text-sm md:text-lg max-w-md font-light">
              Orchestrating workflows that automate complex business operations.
            </p>
          </motion.section>

          {/* STAGE 3 — AI Systems */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20"
            style={{ opacity: s3Op }}
          >
            <div className="text-[10px] md:text-xs font-mono text-cyan-400/60 tracking-[0.3em] mb-8">
              STAGE 03 — AI SYSTEMS
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center mb-10">
              <LucideIcon icon={Brain} label="AI Agents" delay={0} />
              <LucideIcon icon={Workflow} label="Pipelines" delay={0.1} />
              <LucideIcon icon={BarChart3} label="Dashboards" delay={0.2} />
              <LucideIcon icon={MessageSquare} label="Chat Systems" delay={0.3} />
            </div>
            <p className="text-white/50 text-sm md:text-lg max-w-md font-light">
              Designing intelligent automation systems managing thousands of interactions.
            </p>
          </motion.section>

          {/* STAGE 4 — Real Impact */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20"
            style={{ opacity: s4Op }}
          >
            <div className="text-[10px] md:text-xs font-mono text-cyan-400/60 tracking-[0.3em] mb-10">
              STAGE 04 — REAL IMPACT
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <Metric value="1000+" label="Daily Interactions" delay={0} />
              <Metric value="AI" label="Powered Workflows" delay={0.15} />
              <Metric value="GTM" label="Automation Systems" delay={0.3} />
            </div>
          </motion.section>

          {/* FINAL SCENE */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20"
            style={{ opacity: finalOp }}
          >
            <div className="max-w-lg">
              <p className="text-white/30 text-xs font-mono tracking-[0.3em] mb-6">
                END OF WORKFLOW
              </p>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white/90">
                You've reached the end of the workflow.
              </h2>
              <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-light mb-12">
                Now let's build something extraordinary together.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://linkedin.com/in/sriramparthiban"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="https://github.com/sriramparthiban"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="/#contact"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-sm hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" /> Contact
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default SubThemePage;
