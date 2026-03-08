import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { href: "mailto:sriramparthiban1970@gmail.com", icon: Mail, label: "Email" },
  { href: "https://www.linkedin.com/in/sriram-parthiban-0500q/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/SriramParthiban", icon: Github, label: "GitHub" },
];

const Footer = () => (
  <footer className="relative border-t border-border px-6 py-12 bg-muted/30">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
        © {new Date().getFullYear()} Sriram Parthiban · Built with
        <Heart className="h-3 w-3 text-primary fill-primary" />
      </p>
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
              className="rounded-xl p-2.5 text-muted-foreground transition-all duration-300 hover:bg-foreground/5 hover:text-primary"
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