import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECRET_CODE = "Sriram005";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];=+*&^%$#@!";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? "#fff" : `hsl(120, 100%, ${30 + Math.random() * 40}%)`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ opacity: 0.15 }}
    />
  );
};

const EasterEgg = () => {
  const [hackerMode, setHackerMode] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const bufferRef = useRef("");

  const toggleHackerMode = useCallback(() => {
    setHackerMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("hacker-mode");
        setShowOverlay(true);
        setTimeout(() => setShowOverlay(false), 3000);
      } else {
        document.documentElement.classList.remove("hacker-mode");
        setShowOverlay(false);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "Escape" && hackerMode) {
        toggleHackerMode();
        bufferRef.current = "";
        return;
      }

      // Only track printable single characters
      if (e.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + e.key).slice(-SECRET_CODE.length);

      if (bufferRef.current === SECRET_CODE) {
        toggleHackerMode();
        bufferRef.current = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hackerMode, toggleHackerMode]);

  return (
    <>
      {hackerMode && <MatrixRain />}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="text-center"
            >
              <div
                className="font-mono text-sm tracking-[0.3em] mb-2"
                style={{ color: "#0f0", textShadow: "0 0 10px #0f0, 0 0 20px #0f0" }}
              >
                {">"} SYSTEM BREACH DETECTED
              </div>
              <div
                className="font-mono text-5xl md:text-7xl font-bold tracking-wider"
                style={{ color: "#0f0", textShadow: "0 0 20px #0f0, 0 0 40px #0f0, 0 0 80px #0a0" }}
              >
                ACCESS GRANTED
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="h-[2px] mt-4 mx-auto"
                style={{ background: "linear-gradient(90deg, transparent, #0f0, transparent)" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-mono text-xs mt-3 tracking-widest"
                style={{ color: "#0a0" }}
              >
                WELCOME, SRIRAM // HACKER MODE ACTIVE // ESC TO EXIT
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEgg;
