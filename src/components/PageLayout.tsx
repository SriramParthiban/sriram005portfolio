import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -20, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <motion.main
      className="flex-1"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
    <Footer />
  </div>
);

export default PageLayout;
