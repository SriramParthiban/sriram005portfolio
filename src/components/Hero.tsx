import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

const metrics = [
  { value: "1,000+", label: "Daily AI Interactions" },
  { value: "99%", label: "Operational Accuracy" },
  { value: "$40K+", label: "Cost Prevented" },
  { value: "500K+", label: "Records Processed" },
];

const Hero = () => (
  <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Sriram Parthiban
      </h1>
      <p className="mt-4 text-lg font-medium text-muted-foreground sm:text-xl">
        AI Automation & Revenue Operations Specialist
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Designing intelligent automation systems that generate qualified pipeline,
        optimize GTM workflows, and build scalable AI-driven operations.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" asChild>
          <a href="#experience">
            <ArrowDown className="mr-2 h-4 w-4" />
            View Experience
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </a>
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{m.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
