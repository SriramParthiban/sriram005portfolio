import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles } from "lucide-react";

const MagicCodeHint = () => {
  const [inputValue, setInputValue] = useState("");
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const SECRET = "Sriram005";

  useEffect(() => {
    if (inputValue === SECRET) {
      setRevealed(true);
      document.documentElement.classList.add("hacker-mode");
      // Dispatch keydown events to trigger EasterEgg overlay
      setTimeout(() => {
        setInputValue("");
        setRevealed(false);
      }, 4000);
    }
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <section className="relative py-16 px-6 bg-muted/20 border-t border-border/50">
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Secret Terminal</span>
            <Sparkles className="h-4 w-4" />
          </div>

          <h3 className="font-display text-xl sm:text-2xl text-foreground">
            Enter your magic code & see the magic happen
          </h3>

          <p className="text-sm text-muted-foreground max-w-md">
            There's a hidden surprise waiting for those who know the code. Type it below and watch the transformation.
          </p>

          <div className="relative mt-2 w-full max-w-xs">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter the secret code..."
              className="w-full rounded-xl border border-border bg-card/80 px-4 py-3 text-center font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300"
              autoComplete="off"
              spellCheck={false}
            />
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/30"
                >
                  <span className="font-mono text-sm text-primary font-bold tracking-wider">
                    ✓ ACCESS GRANTED
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-muted-foreground/40 font-mono mt-1">
            Hint: It's personal 🤫
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MagicCodeHint;
