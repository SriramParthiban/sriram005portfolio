import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-border/30 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden"
        >
          <Button className="flex-1 glow-sm font-semibold" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Let's Connect
            </a>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;
