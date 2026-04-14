import { motion } from "framer-motion";
import { useState } from "react";
import { ThumbsDown, ThumbsUp, ArrowRight } from "lucide-react";

interface BeforeAfterItem {
  metric: string;
  before: string;
  after: string;
}

const stickyColors = {
  before: [
    "bg-red-50 border-red-200/60",
    "bg-orange-50 border-orange-200/60",
    "bg-amber-50 border-amber-200/60",
    "bg-rose-50 border-rose-200/60",
    "bg-yellow-50 border-yellow-200/60",
  ],
  after: [
    "bg-emerald-50 border-emerald-200/60",
    "bg-green-50 border-green-200/60",
    "bg-teal-50 border-teal-200/60",
    "bg-lime-50 border-lime-200/60",
    "bg-cyan-50 border-cyan-200/60",
  ],
};

const rotations = [-1.5, 1, -0.8, 1.5, -1.2];

const BeforeAfterTable = ({ items }: { items: BeforeAfterItem[] }) => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (idx: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Column headers */}
      <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-4 sm:gap-8 px-2">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/15 px-4 py-1.5">
            <ThumbsDown className="h-3.5 w-3.5 text-destructive/60" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-destructive/70">Before</span>
          </div>
        </div>
        <div className="w-8" />
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/15 px-4 py-1.5">
            <ThumbsUp className="h-3.5 w-3.5 text-primary/60" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary/70">After</span>
          </div>
        </div>
      </div>

      {/* Sticky note pairs */}
      {items.map((item, idx) => {
        const rot = rotations[idx % rotations.length];
        const isRevealed = flipped.has(idx);
        const beforeColor = stickyColors.before[idx % stickyColors.before.length];
        const afterColor = stickyColors.after[idx % stickyColors.after.length];

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="grid grid-cols-[1fr,auto,1fr] items-center gap-4 sm:gap-8"
          >
            {/* Before sticky note */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: rot * 0.5 }}
              className={`relative p-4 sm:p-5 rounded-lg border shadow-[2px_3px_8px_rgba(0,0,0,0.06)] ${beforeColor} cursor-pointer transition-all`}
              style={{ transform: `rotate(${rot * 0.6}deg)` }}
              onClick={() => toggleFlip(idx)}
            >
              {/* Tape effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm bg-amber-100/80 border border-amber-200/40 shadow-sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-1.5 mt-1">
                {item.metric}
              </p>
              <p className="text-sm sm:text-base font-bold text-destructive/70">
                {item.before}
              </p>
            </motion.div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={isRevealed ? { scale: [1, 1.2, 1] } : {}}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 border border-border/40"
              >
                <ArrowRight className="h-3.5 w-3.5 text-primary/50" />
              </motion.div>
            </div>

            {/* After sticky note */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -rot * 0.5 }}
              className={`relative p-4 sm:p-5 rounded-lg border shadow-[2px_3px_8px_rgba(0,0,0,0.06)] ${afterColor} cursor-pointer transition-all`}
              style={{ transform: `rotate(${-rot * 0.6}deg)` }}
              onClick={() => toggleFlip(idx)}
            >
              {/* Tape effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm bg-emerald-100/80 border border-emerald-200/40 shadow-sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-1.5 mt-1">
                {item.metric}
              </p>
              <p className="text-sm sm:text-base font-bold text-primary">
                {item.after}
              </p>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Hint */}
      <p className="text-center text-[10px] text-muted-foreground/40 italic mt-2">
        Hover over the notes to peek closer
      </p>
    </div>
  );
};

export default BeforeAfterTable;
