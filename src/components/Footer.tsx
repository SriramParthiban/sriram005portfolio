import { Github, Linkedin, Mail, Heart, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { href: "mailto:sriramparthiban1970@gmail.com", icon: Mail, label: "Email" },
  { href: "https://www.linkedin.com/in/sriram-parthiban-0500q/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/SriramParthiban", icon: Github, label: "GitHub" },
];

const Footer = () => (
  <footer className="dark-section relative border-t border-white/5 px-6 py-12 overflow-hidden">
    {/* Subtle coffee ring stain — human imperfection */}
    <div 
      className="absolute top-4 left-[15%] w-16 h-16 rounded-full opacity-[0.03] pointer-events-none"
      style={{
        background: "transparent",
        border: "3px solid hsl(30 50% 40%)",
        filter: "blur(2px)",
        transform: "rotate(15deg) scale(1, 0.9)",
      }}
    />

    <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center sm:items-start gap-2">
        <p className="text-sm font-medium text-white/40 flex items-center gap-1.5">
          © {new Date().getFullYear()} Sriram Parthiban · Built with
          <Heart className="h-3 w-3 text-primary fill-primary" />
        </p>
        <p className="font-handwritten text-sm text-white/25 flex items-center gap-1.5">
          <Coffee className="h-3.5 w-3.5" />
          fueled by mass amounts of coffee & late-night debugging sessions
        </p>
      </div>
      <div className="flex items-center gap-2">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ y: -2 }}
              className="rounded-xl p-2.5 text-white/40 transition-all duration-300 hover:bg-white/5 hover:text-primary"
              aria-label={s.label}
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          );
        })}
      </div>
    </div>
  </footer>
);

export default Footer;
