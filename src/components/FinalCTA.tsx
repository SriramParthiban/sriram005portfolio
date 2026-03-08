import { Button } from "@/components/ui/button";
import { Mail, ArrowUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import coralVibrant from "@/assets/coral-vibrant.jpg";

const FinalCTA = () => (
  <section className="relative overflow-hidden py-28 sm:py-36">
    {/* Coral background — clearly visible */}
    <div className="absolute inset-0">
      <img src={coralVibrant} alt="" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-[hsl(155_25%_5%/0.68)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(155_25%_5%/0.8)] via-[hsl(155_25%_5%/0.3)] to-[hsl(155_25%_5%/0.4)]" />
    </div>

    <div className="relative mx-auto max-w-2xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl text-balance">
          Ready to Build Something{" "}
          <span className="gradient-text-warm">Extraordinary?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base text-white/60">
          Let's discuss how AI-driven automation can transform your operations and drive measurable results.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="glow-md font-semibold px-8 py-6 text-[0.9rem]" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          <Button size="lg" className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-semibold px-8 py-6 text-[0.9rem]" asChild>
            <a href="#experience">
              <ArrowUp className="mr-2 h-4 w-4" />
              View My Work
            </a>
          </Button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-white/40">
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
