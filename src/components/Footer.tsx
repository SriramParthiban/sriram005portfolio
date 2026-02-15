import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 px-6 py-10">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-sm font-medium text-muted-foreground">
        © {new Date().getFullYear()} Sriram Parthiban
      </p>
      <div className="flex items-center gap-4">
        <a
          href="mailto:sriramparthiban1970@gmail.com"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/sriram-parthiban-0500q/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="https://github.com/SriramParthiban"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
