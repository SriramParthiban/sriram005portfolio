import { motion } from "framer-motion";

interface ArchitectureStep {
  label: string;
  detail: string;
}

const ArchitectureDiagram = ({ steps, color }: { steps: ArchitectureStep[]; color: string }) => {
  return (
    <div className="relative">
      {/* Desktop dashed connector — behind everything */}
      <div
        className="absolute left-1/2 -translate-x-[1px] top-8 bottom-8 w-[2px] hidden lg:block z-0"
        style={{
          background: `repeating-linear-gradient(to bottom, hsl(var(--primary) / 0.2) 0px, hsl(var(--primary) / 0.2) 6px, transparent 6px, transparent 12px)`,
        }}
      />

      <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
        {steps.map((step, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Mobile */}
              <div className="lg:hidden">
                <div className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card border-2 border-primary/20 text-primary font-display font-bold text-sm shadow-sm z-10">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className="w-[2px] h-8 mt-1"
                        style={{
                          background: `repeating-linear-gradient(to bottom, hsl(var(--primary) / 0.2) 0px, hsl(var(--primary) / 0.2) 4px, transparent 4px, transparent 8px)`,
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="text-sm font-display font-bold text-foreground">{step.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden lg:grid lg:grid-cols-[1fr,72px,1fr] lg:items-center lg:py-4">
                <div className={`${isLeft ? "text-right pr-8" : "order-3 pl-8"}`}>
                  <div className="inline-block p-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm">
                    <h4 className="text-sm font-display font-bold text-foreground">{step.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-[280px] mx-auto">
                      {step.detail}
                    </p>
                  </div>
                </div>

                <div className={`flex justify-center ${!isLeft ? "order-2" : ""}`}>
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-card border-2 border-primary/20 text-primary font-display font-bold text-sm ring-4 ring-background shadow-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className={`${isLeft ? "order-3" : ""}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
