import { motion } from "framer-motion";

interface ArchitectureStep {
  label: string;
  detail: string;
}

const rotations = [-1.5, 0.8, -0.5, 1.2, -1, 0.6];
const shapes = [
  "rounded-2xl rounded-tl-3xl",
  "rounded-xl rounded-br-3xl",
  "rounded-2xl rounded-tr-3xl",
  "rounded-xl rounded-bl-3xl",
  "rounded-2xl rounded-tl-3xl rounded-br-3xl",
  "rounded-xl rounded-tr-3xl rounded-bl-3xl",
];

const ArchitectureDiagram = ({ steps, color }: { steps: ArchitectureStep[]; color: string }) => {
  return (
    <div className="relative">
      {/* Hand-drawn style dashed connector */}
      <div className="absolute left-1/2 top-4 bottom-4 w-[2px] hidden lg:block"
        style={{
          background: `repeating-linear-gradient(to bottom, hsl(var(--primary) / 0.25) 0px, hsl(var(--primary) / 0.25) 6px, transparent 6px, transparent 12px)`,
        }}
      />

      <div className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-1">
        {steps.map((step, idx) => {
          const isLeft = idx % 2 === 0;
          const rot = rotations[idx % rotations.length];
          const shape = shapes[idx % shapes.length];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -20 : 20, rotate: rot * 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6, type: "spring", stiffness: 80 }}
              className="relative"
            >
              {/* Mobile */}
              <div className="lg:hidden">
                <div className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: rot }}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center ${shape} border-2 border-dashed border-primary/30 bg-primary/10 text-primary font-display font-bold text-sm shadow-sm`}
                      style={{ transform: `rotate(${rot}deg)` }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </motion.div>
                    {idx < steps.length - 1 && (
                      <div className="w-[2px] h-8 mt-1"
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
                <motion.div
                  className={`${isLeft ? "text-right pr-8" : "order-3 pl-8"}`}
                  whileHover={{ x: isLeft ? -4 : 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="inline-block p-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm transition-shadow duration-300 hover:shadow-md"
                    style={{ transform: `rotate(${rot * 0.4}deg)` }}
                  >
                    <h4 className="text-sm font-display font-bold text-foreground">{step.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-[280px] mx-auto">{step.detail}</p>
                  </div>
                </motion.div>

                <div className={`flex justify-center ${!isLeft ? "order-2" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: rot * 1.5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`relative z-10 flex h-12 w-12 items-center justify-center ${shape} border-2 border-dashed border-primary/40 bg-primary/10 text-primary font-display font-bold text-sm ring-4 ring-background shadow-sm cursor-default`}
                    style={{ transform: `rotate(${rot}deg)` }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </motion.div>
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
