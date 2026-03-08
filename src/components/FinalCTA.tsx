import { Button } from "@/components/ui/button";
import { Mail, ArrowUp, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => (
  <section className="dark-section relative overflow-hidden py-24">
    {/* Ambient orbs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
    </div>

    {/* Mobile: gradient lines + drifting orbs + corner flourishes */}
    <div className="pointer-events-none absolute top-8 left-4 h-16 w-[1.5px] rounded-full bg-gradient-to-b from-[#7C3AED]/25 to-transparent animate-[pulseFade_4s_ease-in-out_infinite] md:hidden" />
    <div className="pointer-events-none absolute bottom-8 right-4 h-12 w-[1.5px] rounded-full bg-gradient-to-b from-[#06B6D4]/20 to-transparent animate-[pulseFade_4s_ease-in-out_infinite_2s] md:hidden" />
    <div className="pointer-events-none absolute top-[40%] right-5 h-3 w-3 rounded-full bg-gradient-to-br from-[#7C3AED]/15 to-[#06B6D4]/10 blur-[2px] animate-drift md:hidden" />
    <div className="pointer-events-none absolute top-6 right-3 h-6 w-6 rounded-tr-lg border-t border-r border-[#7C3AED]/12 animate-border-glow md:hidden" />
    <div className="pointer-events-none absolute bottom-6 left-3 h-6 w-6 rounded-bl-lg border-b border-l border-[#06B6D4]/10 animate-[borderGlow_4s_ease-in-out_infinite_2s] md:hidden" />

    <div className="relative mx-auto max-w-2xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
          <Sparkles className="h-3 w-3" />
          Open to Opportunities
        </span>

        <h2 className="mt-6 text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl text-balance">
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
