import { ReactNode } from "react";

/**
 * Reusable n8n-style canvas backdrop:
 * - Dotted grid background
 * - Soft vignette
 * - Subtle floating particles
 */
const NodeCanvas = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, hsl(var(--foreground) / 0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background)/0.6)_100%)]" />
      {children}
    </div>
  );
};

export default NodeCanvas;
