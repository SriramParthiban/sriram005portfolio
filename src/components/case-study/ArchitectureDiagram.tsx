import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ArchitectureStep {
  label: string;
  detail: string;
}

const ArchitectureDiagram = ({ steps, color }: { steps: ArchitectureStep[]; color: string }) => {
  return (
    <div className="relative">
      {/* Connection line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/40 to-primary/40 hidden lg:block" />

      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
        {steps.map((step, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Mobile: simple vertical flow */}
              <div className="lg:hidden">
                <div className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white font-bold text-sm shadow-lg`}>
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h4 className="text-sm font-display font-bold text-foreground">{step.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </div>

              {/* Desktop: alternating layout */}
              <div className="hidden lg:grid lg:grid-cols-[1fr,60px,1fr] lg:items-center lg:py-3">
                <div className={`${isLeft ? "text-right pr-6" : "order-3 pl-6"}`}>
                  <h4 className="text-sm font-display font-bold text-foreground">{step.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                </div>
                <div className={`flex justify-center ${!isLeft ? "order-2" : ""}`}>
                  <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white font-bold text-sm shadow-lg ring-4 ring-background`}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className={`${isLeft ? "order-3" : ""}`} />
              </div>

              {/* Arrow between steps on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex justify-center -my-1">
                  <ArrowRight className="h-3 w-3 text-muted-foreground/30 rotate-90" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
