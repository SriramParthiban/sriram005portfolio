import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpeg";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    // Delay scroll to let mobile menu close animation finish
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navbarHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_-8px_hsl(var(--primary)/0.06)]"
          : "bg-black/60 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
        <button onClick={scrollToTop} className={`group flex items-center gap-2.5 text-xl font-display font-bold tracking-tight ${scrolled ? 'text-foreground' : 'text-white'}`}>
          <img src={profilePhoto} alt="Sriram Parthiban" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/40" />
          SP<span className="gradient-text">.</span>
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)]"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:shadow-[0_0_12px_-4px_hsl(var(--primary)/0.2)]"
                      : "text-white/80 hover:text-white hover:bg-white/15"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <Button size="sm" className="ml-5 font-medium" asChild>
            <a href="/resume.pdf" download>
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Resume
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="relative rounded-xl p-2.5 text-foreground transition-colors hover:bg-foreground/5 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="bg-background/95 backdrop-blur-xl overflow-hidden border-b border-border px-6 pb-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    }`}
                    onClick={() => handleNav(link.href)}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <Button size="sm" asChild className="mt-3 w-fit font-medium">
                <a href="/resume.pdf" download="Sriram_Parthiban_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Resume
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;