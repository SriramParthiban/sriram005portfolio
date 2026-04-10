import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

interface BeforeAfterItem {
  metric: string;
  before: string;
  after: string;
}

const BeforeAfterTable = ({ items }: { items: BeforeAfterItem[] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-lg">
      {/* Header */}
      <div className="grid grid-cols-[1.2fr,1fr,auto,1fr] items-center bg-gradient-to-r from-muted/60 via-muted/40 to-muted/60 border-b border-border/50 px-5 sm:px-8 py-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Metric</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-destructive/70 text-center">Before</span>
        <span className="w-8" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/80 text-center">After</span>
      </div>

      {/* Rows */}
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08, duration: 0.45, ease: "easeOut" }}
          className={`group grid grid-cols-[1.2fr,1fr,auto,1fr] items-center px-5 sm:px-8 py-4 sm:py-5 transition-all duration-300 hover:bg-primary/[0.03] ${
            idx < items.length - 1 ? "border-b border-border/30" : ""
          }`}
        >
          {/* Metric name */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground/50 group-hover:bg-primary/10 group-hover:text-primary/60 transition-colors">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold text-foreground/85">{item.metric}</span>
          </div>

          {/* Before value */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/[0.06] border border-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive/60 line-through decoration-destructive/30">
              <TrendingDown className="h-3 w-3 hidden sm:block" />
              {item.before}
            </span>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center w-8">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50 group-hover:bg-accent/10 transition-colors">
              <ArrowRight className="h-3 w-3 text-muted-foreground/40 group-hover:text-accent/60 transition-colors" />
            </div>
          </div>

          {/* After value */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-xs font-bold text-accent shadow-[0_0_12px_-3px_hsl(var(--accent)/0.15)]">
              <TrendingUp className="h-3 w-3 hidden sm:block" />
              {item.after}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BeforeAfterTable;
