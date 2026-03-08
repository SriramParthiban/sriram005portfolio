import { Button } from "@/components/ui/button";
import { Mail, ArrowUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import coralVibrant from "@/assets/coral-vibrant.jpg";

const FinalCTA = () => (
  <section className="relative overflow-hidden py-28 sm:py-36">
    <div className="absolute inset-0">
      <img src={coralVibrant} alt="" className="h-full w-full object-cover opacity-[0.30]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/55 to-background/70" />
    </div>

    <div className="relative mx-auto max-w-2xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
          Ready to Build Something{" "}
          <span className="gradient-text-warm">Extraordinary?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground">
          Let's discuss how AI-driven automation can transform your operations and drive measurable results.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="glow-md font-semibold px-8 py-6 text-[0.9rem]" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-[0.9rem]" asChild>
            <a href="#experience">
              <ArrowUp className="mr-2 h-4 w-4" />
              View My Work
            </a>
          </Button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground/60">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            Quick Response
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            No Obligation
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;