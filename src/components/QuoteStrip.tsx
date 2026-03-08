import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  { text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.", author: "A.P.J. Abdul Kalam" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A.P.J. Abdul Kalam" },
  { text: "All of us do not have equal talent. But, all of us have an equal opportunity to develop our talents.", author: "A.P.J. Abdul Kalam" },
  { text: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "A.P.J. Abdul Kalam" },
  { text: "Excellence is a continuous process and not an accident.", author: "A.P.J. Abdul Kalam" },
  { text: "Man needs his difficulties because they are necessary to enjoy success.", author: "A.P.J. Abdul Kalam" },
];

const QuoteStrip = () => {
  // Pick a quote based on the day so it changes daily
  const todayIdx = new Date().getDate() % quotes.length;
  const q = quotes[todayIdx];

  return (
    <section className="relative py-16 sm:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')] opacity-[0.03]" />

      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Quote className="mx-auto mb-4 h-8 w-8 text-primary/30" />

        <blockquote className="text-lg sm:text-xl md:text-2xl font-display font-semibold italic text-foreground leading-relaxed text-balance">
          "{q.text}"
        </blockquote>

        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/30" />
          <p className="text-sm font-medium text-muted-foreground tracking-wide">
            — {q.author}
          </p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </motion.div>
    </section>
  );
};

export default QuoteStrip;
