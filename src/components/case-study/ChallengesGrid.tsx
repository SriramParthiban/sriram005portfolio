import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
}

const ChallengesGrid = ({ challenges }: { challenges: Challenge[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {challenges.map((challenge, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.4 }}
          className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-red-400/20 hover:shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <h4 className="text-sm font-display font-bold text-foreground">{challenge.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{challenge.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ChallengesGrid;
