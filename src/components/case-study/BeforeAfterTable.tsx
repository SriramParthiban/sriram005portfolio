import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BeforeAfterItem {
  metric: string;
  before: string;
  after: string;
}

const BeforeAfterTable = ({ items }: { items: BeforeAfterItem[] }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Header */}
      <div className="grid grid-cols-[1fr,auto,1fr] bg-muted/50 border-b border-border">
        <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Metric</div>
        <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-red-400 text-center w-28 sm:w-36">Before</div>
        <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-accent text-center w-28 sm:w-36">After</div>
      </div>

      {/* Rows */}
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08, duration: 0.4 }}
          className={`grid grid-cols-[1fr,auto,1fr] items-center ${idx < items.length - 1 ? "border-b border-border" : ""} hover:bg-muted/30 transition-colors`}
        >
          <div className="px-4 py-3">
            <span className="text-sm font-medium text-foreground">{item.metric}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-center gap-2 w-28 sm:w-36">
            <span className="text-xs text-red-400 line-through opacity-70">{item.before}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0 hidden sm:block" />
          </div>
          <div className="px-4 py-3 text-center">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
              {item.after}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BeforeAfterTable;
