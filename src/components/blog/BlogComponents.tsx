import { ReactNode } from "react";

type StickyColor = "purple" | "yellow" | "green" | "blue" | "pink" | "orange";

const stickyColorMap: Record<StickyColor, string> = {
  purple: "bg-[hsl(270,40%,18%)] border-[hsl(270,50%,30%)]",
  yellow: "bg-[hsl(45,50%,16%)] border-[hsl(45,60%,30%)]",
  green: "bg-[hsl(145,35%,15%)] border-[hsl(145,45%,28%)]",
  blue: "bg-[hsl(210,40%,16%)] border-[hsl(210,50%,30%)]",
  pink: "bg-[hsl(330,35%,17%)] border-[hsl(330,45%,30%)]",
  orange: "bg-[hsl(25,45%,16%)] border-[hsl(25,55%,30%)]",
};

const tapeColorMap: Record<StickyColor, string> = {
  purple: "bg-[hsl(270,40%,50%/0.2)]",
  yellow: "bg-[hsl(45,60%,55%/0.2)]",
  green: "bg-[hsl(145,45%,45%/0.2)]",
  blue: "bg-[hsl(210,50%,50%/0.2)]",
  pink: "bg-[hsl(330,45%,50%/0.2)]",
  orange: "bg-[hsl(25,55%,50%/0.2)]",
};

export const StickyNote = ({
  children,
  color = "yellow",
  rotate = 0,
  className = "",
}: {
  children: ReactNode;
  color?: StickyColor;
  rotate?: number;
  className?: string;
}) => (
  <div
    className={`relative rounded-lg border p-5 ${stickyColorMap[color]} ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {/* Tape strip */}
    <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-16 rounded-sm ${tapeColorMap[color]} backdrop-blur-sm`} />
    <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
  </div>
);

export const CalloutBox = ({
  emoji,
  title,
  children,
  variant = "info",
}: {
  emoji?: string;
  title?: string;
  children: ReactNode;
  variant?: "info" | "warning" | "success" | "tip";
}) => {
  const variantStyles = {
    info: "border-[hsl(210,60%,40%)] bg-[hsl(210,40%,12%)]",
    warning: "border-[hsl(35,80%,45%)] bg-[hsl(35,50%,10%)]",
    success: "border-[hsl(145,50%,38%)] bg-[hsl(145,30%,10%)]",
    tip: "border-primary bg-[hsl(270,25%,12%)]",
  };

  return (
    <div className={`rounded-xl border-l-4 p-5 my-8 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        {emoji && <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>}
        <div>
          {title && <p className="font-semibold text-foreground text-sm mb-1.5">{title}</p>}
          <div className="text-sm text-foreground/75 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const StatsCard = ({
  label,
  before,
  after,
  change,
}: {
  label: string;
  before: string;
  after: string;
  change?: string;
}) => (
  <div className="bg-[hsl(270,15%,10%)] border border-[hsl(270,20%,18%)] rounded-xl p-4 text-center">
    <p className="text-xs text-muted-foreground mb-2 font-medium">{label}</p>
    <div className="flex items-center justify-center gap-3">
      <span className="text-sm text-red-400/70 line-through">{before}</span>
      <span className="text-primary">→</span>
      <span className="text-lg font-bold text-foreground">{after}</span>
    </div>
    {change && <p className="text-[11px] text-[hsl(145,60%,50%)] mt-1.5 font-medium">{change}</p>}
  </div>
);

export const ProConList = ({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) => (
  <div className="grid sm:grid-cols-2 gap-4 my-8">
    <div className="bg-[hsl(145,25%,10%)] border border-[hsl(145,35%,20%)] rounded-xl p-5">
      <p className="text-sm font-bold text-[hsl(145,60%,55%)] mb-3 flex items-center gap-2">
        ✅ Pros
      </p>
      <ul className="space-y-2">
        {pros.map((p, i) => (
          <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
            <span className="text-[hsl(145,60%,50%)] mt-0.5 flex-shrink-0">+</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-[hsl(0,25%,10%)] border border-[hsl(0,35%,20%)] rounded-xl p-5">
      <p className="text-sm font-bold text-[hsl(0,60%,60%)] mb-3 flex items-center gap-2">
        ❌ Cons
      </p>
      <ul className="space-y-2">
        {cons.map((c, i) => (
          <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
            <span className="text-[hsl(0,60%,55%)] mt-0.5 flex-shrink-0">−</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const NumberHighlight = ({
  number,
  label,
  color = "purple",
}: {
  number: string;
  label: string;
  color?: "purple" | "green" | "blue" | "amber";
}) => {
  const colors = {
    purple: "text-primary",
    green: "text-[hsl(145,60%,50%)]",
    blue: "text-[hsl(210,70%,60%)]",
    amber: "text-[hsl(35,90%,55%)]",
  };
  return (
    <div className="text-center">
      <p className={`text-3xl sm:text-4xl font-bold ${colors[color]}`}>{number}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

export const StepCard = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 items-start">
    <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
      <span className="text-primary font-bold text-sm">{number}</span>
    </div>
    <div>
      <p className="font-semibold text-foreground text-sm">{title}</p>
      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
    </div>
  </div>
);

export const SectionDivider = () => (
  <div className="my-14 flex items-center gap-4">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </div>
);
