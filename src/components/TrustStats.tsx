import { motion } from "framer-motion";
import { Zap, Award, Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { icon: Zap, value: 1000, suffix: "+", label: "Daily AI Interactions" },
  { icon: Award, value: 99, suffix: "%", label: "Operational Accuracy" },
  { icon: Clock, value: 40, prefix: "$", suffix: "K+", label: "Cost Prevented" },
  { icon: Star, value: 500, suffix: "K+", label: "Records Processed" },
];

const Counter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
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
    <motion.span onViewportEnter={() => setStarted(true)} viewport={{ once: true }}>
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

const TrustStats = () => (
  <section className="relative overflow-hidden py-14 sm:py-16 bg-background">
    <div className="absolute top-0 left-[10%] right-[30%] h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
    
    <div className="relative mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground sm:text-3xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
    
    <div className="absolute bottom-0 left-[30%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
  </section>
);

export default TrustStats;