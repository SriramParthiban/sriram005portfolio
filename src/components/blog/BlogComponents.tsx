import { ReactNode } from "react";

type StickyColor = "purple" | "yellow" | "green" | "blue" | "pink" | "orange";

const stickyColorMap: Record<StickyColor, string> = {
  purple: "bg-[hsl(270,30%,20%)] border-[hsl(270,40%,35%)]",
  yellow: "bg-[hsl(45,40%,18%)] border-[hsl(45,50%,32%)]",
  green: "bg-[hsl(145,25%,17%)] border-[hsl(145,35%,30%)]",
  blue: "bg-[hsl(210,30%,18%)] border-[hsl(210,40%,32%)]",
  pink: "bg-[hsl(330,25%,19%)] border-[hsl(330,35%,32%)]",
  orange: "bg-[hsl(25,35%,18%)] border-[hsl(25,45%,32%)]",
};

const tapeColorMap: Record<StickyColor, string> = {
  purple: "bg-[hsl(270,40%,50%/0.25)]",
  yellow: "bg-[hsl(45,60%,55%/0.25)]",
  green: "bg-[hsl(145,45%,45%/0.25)]",
  blue: "bg-[hsl(210,50%,50%/0.25)]",
  pink: "bg-[hsl(330,45%,50%/0.25)]",
  orange: "bg-[hsl(25,55%,50%/0.25)]",
};

export const StickyNote = ({
  children,
  color = "yellow",
  className = "",
}: {
  children: ReactNode;
  color?: StickyColor;
  rotate?: number;
  className?: string;
}) => (
  <div className={`relative rounded-xl border p-6 my-8 ${stickyColorMap[color]} ${className}`}>
    {/* Tape strip */}
    <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-20 rounded-sm ${tapeColorMap[color]}`} />
    <div className="text-[15px] text-white/90 leading-[1.8]">{children}</div>
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
    info: "border-[hsl(210,60%,45%)] bg-[hsl(210,30%,14%)]",
    warning: "border-[hsl(35,80%,50%)] bg-[hsl(35,40%,12%)]",
    success: "border-[hsl(145,50%,40%)] bg-[hsl(145,25%,12%)]",
    tip: "border-primary bg-[hsl(270,20%,14%)]",
  };

  return (
    <div className={`rounded-xl border-l-4 p-6 my-8 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        {emoji && <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>}
        <div>
          {title && <p className="font-semibold text-white text-sm mb-2">{title}</p>}
          <div className="text-[14px] text-white/80 leading-[1.8]">{children}</div>
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
  <div className="bg-[hsl(270,12%,12%)] border border-[hsl(270,18%,22%)] rounded-xl p-5 text-center">
    <p className="text-xs text-white/50 mb-3 font-medium uppercase tracking-wide">{label}</p>
    <div className="flex items-center justify-center gap-3">
      <span className="text-sm text-red-400/80 line-through">{before}</span>
      <span className="text-primary text-lg">→</span>
      <span className="text-xl font-bold text-white">{after}</span>
    </div>
    {change && <p className="text-[11px] text-[hsl(145,60%,55%)] mt-2 font-medium">{change}</p>}
  </div>
);

export const ProConList = ({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) => (
  <div className="grid sm:grid-cols-2 gap-5 my-10">
    <div className="bg-[hsl(145,20%,12%)] border border-[hsl(145,30%,24%)] rounded-xl p-6">
      <p className="text-sm font-bold text-[hsl(145,60%,60%)] mb-4 flex items-center gap-2">
        ✅ Switch to n8n if…
      </p>
      <ul className="space-y-3">
        {pros.map((p, i) => (
          <li key={i} className="text-[14px] text-white/80 flex items-start gap-2.5 leading-relaxed">
            <span className="text-[hsl(145,60%,55%)] mt-0.5 flex-shrink-0 font-bold">+</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-[hsl(0,20%,12%)] border border-[hsl(0,30%,24%)] rounded-xl p-6">
      <p className="text-sm font-bold text-[hsl(0,60%,65%)] mb-4 flex items-center gap-2">
        ❌ Stay on Zapier/Make if…
      </p>
      <ul className="space-y-3">
        {cons.map((c, i) => (
          <li key={i} className="text-[14px] text-white/80 flex items-start gap-2.5 leading-relaxed">
            <span className="text-[hsl(0,60%,60%)] mt-0.5 flex-shrink-0 font-bold">−</span>
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
    green: "text-[hsl(145,60%,55%)]",
    blue: "text-[hsl(210,70%,65%)]",
    amber: "text-[hsl(35,90%,60%)]",
  };
  return (
    <div className="text-center py-4">
      <p className={`text-4xl sm:text-5xl font-bold ${colors[color]}`}>{number}</p>
      <p className="text-sm text-white/50 mt-2">{label}</p>
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
  <div className="py-3">
    <div className="flex items-center gap-4 mb-1.5">
      <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <span className="text-primary font-bold text-sm">{number}</span>
      </div>
      <p className="font-extrabold text-white text-base sm:text-[17px]">{title}</p>
    </div>
    <p className="text-[13px] sm:text-[14px] text-white/65 leading-[1.7] pl-14">{description}</p>
  </div>
);

export const SectionDivider = () => (
  <div className="my-10 sm:my-14 flex items-center gap-4">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </div>
);
