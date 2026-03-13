import { useRef, useState, useEffect, useCallback, useMemo, MouseEvent as ReactMouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Three.js Particle Cloud ───────────────────────────────── */
function ParticleCloud({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.08;
    // mouse parallax
    meshRef.current.rotation.x += (mouse.y * 0.3 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00d9ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ─── Custom Cursor ─────────────────────────────────────────── */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
    const move = (e: globalThis.MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: globalThis.MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".cursor-hover")) setHovering(true);
    };
    const out = (e: globalThis.MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".cursor-hover")) setHovering(false);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mouseout", out, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2"
        style={{
          x: springX,
          y: springY,
          width: hovering ? 50 : 20,
          height: hovering ? 50 : 20,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovering ? "#7c3aed" : "#00d9ff",
          boxShadow: hovering
            ? "0 0 30px rgba(124,58,237,0.3), inset 0 0 15px rgba(124,58,237,0.1)"
            : "0 0 15px rgba(0,217,255,0.2)",
          backdropFilter: hovering ? "blur(10px)" : "none",
          mixBlendMode: hovering ? "screen" : "normal",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: springX,
          y: springY,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "#7c3aed",
        }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </>
  );
}

/* ─── Loader ────────────────────────────────────────────────── */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0a0e27, #0f1535)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-t-[#00d9ff] border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-b-[#7c3aed] border-l-[#00d9ff] border-t-transparent border-r-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        className="mt-8 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: "'Space Mono', monospace", color: "#b0b3cc" }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Experience
      </motion.p>
    </motion.div>
  );
}

/* ─── Reveal Card ───────────────────────────────────────────── */
function RevealCard({ emoji, overlayText, label }: { emoji: string; overlayText: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="reveal-card cursor-hover relative overflow-hidden rounded-2xl border-2 h-[300px] flex items-center justify-center group"
      style={{
        borderColor: isHovered ? "#00d9ff" : "rgba(0,217,255,0.2)",
        background: "linear-gradient(135deg, rgba(0,217,255,0.08), rgba(124,58,237,0.08))",
        transition: "border-color 0.5s, transform 0.5s, box-shadow 0.5s",
        transform: isHovered ? "translateZ(30px) rotateX(-3deg) rotateY(3deg) translateY(-8px)" : "none",
        boxShadow: isHovered ? "0 30px 80px rgba(0,217,255,0.15)" : "none",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base */}
      <span className="text-5xl transition-transform duration-500 group-hover:scale-110">{emoji}</span>

      {/* Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold"
        style={{
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #00d9ff, #7c3aed)",
          color: "#0a0e27",
          clipPath: isHovered
            ? `circle(150% at ${mousePos.x}% ${mousePos.y}%)`
            : `circle(0% at ${mousePos.x}% ${mousePos.y}%)`,
          transition: "clip-path 0.5s cubic-bezier(0.23, 1, 0.320, 1)",
        }}
      >
        {overlayText}
      </div>

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm font-bold tracking-wider uppercase transition-all duration-500"
        style={{
          fontFamily: "'Space Mono', monospace",
          color: isHovered ? "#00d9ff" : "#b0b3cc",
          background: "linear-gradient(transparent, rgba(10,14,39,0.9))",
          transform: isHovered ? "translateY(0)" : "translateY(8px)",
          opacity: isHovered ? 1 : 0.6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Scroll Section Wrapper ────────────────────────────────── */
function ScrollSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateZ(0) rotateX(0)" : "translateZ(-80px) rotateX(15deg)",
        transition: "opacity 1s cubic-bezier(0.23,1,0.320,1), transform 1s cubic-bezier(0.23,1,0.320,1)",
        perspective: "1200px",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section Title ─────────────────────────────────────────── */
function SectionTitle({ stage, title, description }: { stage: string; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center mb-16">
      <p
        className="text-xs tracking-[0.3em] uppercase mb-4"
        style={{ fontFamily: "'Space Mono', monospace", color: "rgba(0,217,255,0.5)" }}
      >
        {stage}
      </p>
      <h2
        className="text-3xl md:text-5xl font-extrabold mb-4"
        style={{
          fontFamily: "'Syne', sans-serif",
          letterSpacing: "-0.02em",
          color: "#e8e9f3",
          transformOrigin: "center bottom",
          transform: visible ? "translateY(0) rotateX(0)" : "translateY(30px) rotateX(90deg)",
          transition: "transform 1.2s cubic-bezier(0.23,1,0.320,1)",
        }}
      >
        {title}
      </h2>
      {/* underline */}
      <div className="flex justify-center mb-6">
        <div
          className="h-px"
          style={{
            width: visible ? "120px" : "0px",
            background: "linear-gradient(to right, #00d9ff, transparent)",
            transition: "width 1.2s cubic-bezier(0.23,1,0.320,1) 0.3s",
          }}
        />
      </div>
      <p className="text-base md:text-lg max-w-lg mx-auto" style={{ color: "#b0b3cc" }}>
        {description}
      </p>
    </div>
  );
}

/* ─── Icon Item ─────────────────────────────────────────────── */
function IconItem({ emoji, label, delay = 0 }: { emoji: string; label: string; delay?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="icon-item cursor-hover flex flex-col items-center gap-4 p-8 rounded-xl border-2"
      style={{
        borderColor: hovered ? "#00d9ff" : "rgba(0,217,255,0.2)",
        background: hovered ? "rgba(0,217,255,0.08)" : "rgba(26,31,58,0.5)",
        backdropFilter: "blur(10px)",
        transformStyle: "preserve-3d",
        transform: hovered ? "translateZ(50px) rotateX(-5deg) rotateY(5deg) translateY(-8px)" : "none",
        boxShadow: hovered ? "0 20px 60px rgba(0,217,255,0.15), inset 0 0 30px rgba(0,217,255,0.05)" : "none",
        transition: "all 0.4s cubic-bezier(0.23,1,0.320,1)",
      }}
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="text-5xl"
        style={{
          filter: hovered ? "drop-shadow(0 0 30px #00d9ff) drop-shadow(0 0 60px rgba(0,217,255,0.4))" : "drop-shadow(0 0 8px rgba(0,217,255,0.3))",
          transform: hovered ? "scale(1.3) rotate(10deg)" : "none",
          transition: "all 0.4s cubic-bezier(0.23,1,0.320,1)",
        }}
      >
        {emoji}
      </span>
      <span
        className="text-sm tracking-wider uppercase"
        style={{
          fontFamily: "'Space Mono', monospace",
          color: hovered ? "#00d9ff" : "#b0b3cc",
          transition: "color 0.4s",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Metric Card ───────────────────────────────────────────── */
function MetricCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="metric-card cursor-hover p-10 rounded-2xl border-2 text-center"
      style={{
        borderColor: hovered ? "#00d9ff" : "rgba(124,58,237,0.3)",
        background: hovered
          ? "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,217,255,0.12))"
          : "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(0,217,255,0.05))",
        backdropFilter: "blur(10px)",
        transformStyle: "preserve-3d",
        transform: hovered ? "translateZ(50px) rotateX(-5deg) translateY(-12px)" : "none",
        boxShadow: hovered ? "0 30px 80px rgba(0,217,255,0.15), inset 0 0 30px rgba(0,217,255,0.05)" : "none",
        transition: "all 0.4s cubic-bezier(0.23,1,0.320,1)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="text-4xl md:text-5xl font-extrabold mb-3"
        style={{
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #00d9ff, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: hovered ? "scale(1.15)" : "none",
          transition: "transform 0.4s",
        }}
      >
        {value}
      </div>
      <div
        className="text-xs tracking-[0.15em] uppercase"
        style={{ fontFamily: "'Space Mono', monospace", color: "#b0b3cc" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ─── CTA Button ────────────────────────────────────────────── */
function CTAButton({
  href, emoji, label, color, shadow,
}: { href: string; emoji: string; label: string; color: string; shadow: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="btn cursor-hover relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-lg border-2 font-bold text-sm tracking-[0.1em] uppercase"
      style={{
        fontFamily: "'Space Mono', monospace",
        borderColor: color,
        color: hovered ? "#0a0e27" : color,
        transformStyle: "preserve-3d",
        transform: hovered ? "translateZ(30px) translateY(-4px) rotateX(-5deg)" : "none",
        boxShadow: hovered ? shadow : "none",
        transition: "all 0.4s cubic-bezier(0.23,1,0.320,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* fill bg */}
      <span
        className="absolute inset-0"
        style={{
          background: color,
          transform: hovered ? "translateX(0)" : "translateX(-101%)",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.320,1)",
        }}
      />
      <span className="relative z-10">{emoji}</span>
      <span className="relative z-10">{label}</span>
    </a>
  );
}

/* ─── Parallax Floating Objects ─────────────────────────────── */
function ParallaxLayer({ scrollY, mousePos }: { scrollY: number; mousePos: { x: number; y: number } }) {
  const items = useMemo(
    () =>
      ["✨", "🌀", "⚡", "🔮", "💫", "🌊"].map((e, i) => ({
        emoji: e,
        x: 10 + Math.random() * 80,
        y: 5 + i * 16,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: 0.07,
            filter: "blur(2px)",
            transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50 - scrollY * 0.5}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

/* ═══ MAIN PAGE ═══════════════════════════════════════════════ */
const SubThemePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  // scroll progress bar
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    setMouseNorm({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative"
      style={{
        background: "linear-gradient(135deg, #0a0e27, #0f1535)",
        fontFamily: "'Inter', system-ui, sans-serif",
        cursor: "none",
        color: "#e8e9f3",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Loader */}
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] z-[9998]"
        style={{
          width: progressWidth,
          background: "linear-gradient(to right, #00d9ff, #7c3aed)",
          boxShadow: "0 0 15px rgba(0,217,255,0.3)",
        }}
      />

      {/* Parallax */}
      <ParallaxLayer scrollY={scrollY} mousePos={mouseNorm} />

      {/* ──── HERO ──── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Three.js canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
            <ParticleCloud mouse={mouseNorm} />
          </Canvas>
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,217,255,0.08) 0%, transparent 70%)" }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, rotateX: 10, rotateY: -5, z: -100 }}
          animate={loaded ? { opacity: 1, rotateX: 0, rotateY: 0, z: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.320, 1], delay: 0.2 }}
          style={{ perspective: "1200px" }}
        >
          {/* Bot */}
          <motion.div
            className="mx-auto mb-10 relative"
            style={{ width: 150, height: 150 }}
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center text-7xl"
              animate={{
                y: [0, -30, 0],
                rotateY: [0, 360],
                rotateZ: [0, 10, 0, -10, 0],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformStyle: "preserve-3d", filter: "drop-shadow(0 0 30px #00d9ff) drop-shadow(0 0 60px rgba(0,217,255,0.3))" }}
            >
              🤖
            </motion.div>
            {/* Orbital ring */}
            <motion.div
              className="absolute inset-[-10%] rounded-full border"
              style={{ borderColor: "rgba(0,217,255,0.3)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #00d9ff, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, y: 30, skewY: 3 }}
            animate={loaded ? { opacity: 1, y: 0, skewY: 0 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.320, 1] }}
          >
            Designing Intelligent<br />Automation Systems
          </motion.h1>

          <motion.p
            className="text-base md:text-xl max-w-xl mx-auto"
            style={{ color: "#b0b3cc" }}
            initial={{ opacity: 0, y: 20, skewY: 2 }}
            animate={loaded ? { opacity: 1, y: 0, skewY: 0 } : {}}
            transition={{ delay: 0.6, duration: 1, ease: [0.23, 1, 0.320, 1] }}
          >
            AI Automation Specialist building scalable intelligent workflows
          </motion.p>

          <motion.div
            className="mt-16 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace", color: "rgba(176,179,204,0.4)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Scroll to explore ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ──── STAGE 1: Foundations ──── */}
      <ScrollSection className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto w-full">
          <SectionTitle
            stage="Stage 01"
            title="Foundations"
            description="Building strong foundations in data and AI systems."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <IconItem emoji="🐍" label="Python" delay={0.1} />
            <IconItem emoji="📊" label="SQL" delay={0.2} />
            <IconItem emoji="🧠" label="Machine Learning" delay={0.3} />
          </div>
        </div>
      </ScrollSection>

      {/* ──── STAGE 2: Automation Tools ──── */}
      <ScrollSection className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto w-full">
          <SectionTitle
            stage="Stage 02"
            title="Automation Tools"
            description="Orchestrating workflows that automate complex business operations."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <IconItem emoji="⚙️" label="n8n" delay={0.1} />
            <IconItem emoji="⚡" label="Zapier" delay={0.2} />
            <IconItem emoji="🔗" label="APIs" delay={0.3} />
            <IconItem emoji="📡" label="Webhooks" delay={0.4} />
          </div>
        </div>
      </ScrollSection>

      {/* ──── STAGE 3: AI Systems ──── */}
      <ScrollSection className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto w-full">
          <SectionTitle
            stage="Stage 03"
            title="AI Systems"
            description="Designing intelligent automation systems managing thousands of interactions."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto" style={{ perspective: "1200px" }}>
            <RevealCard emoji="🤝" overlayText="AI" label="AI Agents" />
            <RevealCard emoji="🔄" overlayText="ML" label="Pipelines" />
            <RevealCard emoji="📈" overlayText="DX" label="Dashboards" />
          </div>
        </div>
      </ScrollSection>

      {/* ──── STAGE 4: Real Impact ──── */}
      <ScrollSection className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto w-full">
          <SectionTitle
            stage="Stage 04"
            title="Real Impact"
            description="Transforming business operations through intelligent automation."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <MetricCard value="1000+" label="Daily Interactions" delay={0.1} />
            <MetricCard value="50+" label="AI-Powered Workflows" delay={0.2} />
            <MetricCard value="15x" label="Efficiency Gains" delay={0.3} />
          </div>
        </div>
      </ScrollSection>

      {/* ──── FINAL CTA ──── */}
      <ScrollSection className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-8"
            style={{ fontFamily: "'Space Mono', monospace", color: "rgba(0,217,255,0.4)" }}
          >
            End of Workflow
          </p>
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.02em",
              color: "#e8e9f3",
            }}
            initial={{ opacity: 0, z: -100, rotateX: 25, rotateZ: -5 }}
            whileInView={{ opacity: 1, z: 0, rotateX: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.320, 1] }}
          >
            You've reached the end of the workflow.
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Now let's build something{" "}
            <span
              className="relative inline-block font-extrabold"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #00d9ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              extraordinary
              <span
                className="absolute bottom-0 left-0 w-full h-[2px]"
                style={{ background: "linear-gradient(to right, #00d9ff, #7c3aed)" }}
              />
            </span>{" "}
            together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <CTAButton
              href="/#contact"
              emoji="📧"
              label="Contact"
              color="#00d9ff"
              shadow="0 20px 60px rgba(0,217,255,0.2)"
            />
            <CTAButton
              href="https://www.linkedin.com/in/sriram-parthiban-0500q/"
              emoji="💼"
              label="LinkedIn"
              color="#7c3aed"
              shadow="0 20px 60px rgba(124,58,237,0.15)"
            />
            <CTAButton
              href="https://github.com/SriramParthiban"
              emoji="🐙"
              label="GitHub"
              color="#06b6d4"
              shadow="0 20px 60px rgba(6,182,212,0.5)"
            />
          </motion.div>
        </div>
      </ScrollSection>

      {/* ──── Reduced motion ──── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SubThemePage;
