import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Sparkles } from "lucide-react";

const metrics = [
  { value: "1,000+", label: "Daily AI Interactions", icon: "⚡" },
  { value: "99%", label: "Operational Accuracy", icon: "🎯" },
  { value: "$40K+", label: "Cost Prevented", icon: "💰" },
  { value: "500K+", label: "Records Processed", icon: "📊" },
];

const Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
    {/* Subtle background gradient */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_60%)]" />
    <div className="pointer-events-none absolute top-1/4 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
    <div className="pointer-events-none absolute bottom-1/4 left-0 h-56 w-56 rounded-full bg-accent/5 blur-3xl" />

    <div className="relative mx-auto max-w-3xl text-center">
      {/* Status badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
        <Sparkles className="h-3 w-3" />
        Available for opportunities
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Sriram{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Parthiban
        </span>
      </h1>
      <p className="mt-4 text-lg font-semibold text-muted-foreground sm:text-xl">
        AI Automation & Revenue Operations Specialist
      </p>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground/80">
        Designing intelligent automation systems that generate qualified pipeline,
        optimize GTM workflows, and build scalable AI-driven operations.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" className="shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30" asChild>
          <a href="#experience">
            <ArrowDown className="mr-2 h-4 w-4" />
            View Experience
          </a>
        </Button>
        <Button size="lg" variant="outline" className="border-border/60 transition-all hover:border-primary/30 hover:bg-primary/5" asChild>
          <a href="#contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </a>
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="group rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="text-lg">{m.icon}</span>
            <p className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{m.value}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
