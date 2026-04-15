import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimelineItem {
  phase: string;
  duration: string;
  description: string;
}

const ProjectTimeline = ({ items, color }: { items: TimelineItem[]; color: string }) => {
  return (
    <div className="relative space-y-6">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.12, duration: 0.5 }}
          className="group relative flex gap-4"
        >
          {/* Timeline connector */}
          <div className="relative flex flex-col items-center">
            <div className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-background">
              <span className="text-xs font-bold text-primary/70">{String(idx + 1).padStart(2, '0')}</span>
            </div>
            {idx < items.length - 1 && (
              <div className="w-px flex-1 bg-border/60 mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h4 className="text-sm font-display font-bold text-foreground">{item.phase}</h4>
                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  {item.duration}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectTimeline;
