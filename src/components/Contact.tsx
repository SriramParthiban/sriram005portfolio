import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Send, ArrowUpRight, Loader2 } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSending(true);

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:sriramparthiban1970@gmail.com?subject=${subject}&body=${body}`;

    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    toast({
      title: "✉️ Email client opened!",
      description: "Your message has been pre-filled. Just hit send!",
    });
    setForm({ name: "", email: "", message: "" });
  };

  const links = [
    { href: "mailto:sriramparthiban1970@gmail.com", icon: Mail, label: "sriramparthiban1970@gmail.com", external: false },
    { href: "https://www.linkedin.com/in/sriram-parthiban-0500q/", icon: Linkedin, label: "LinkedIn", external: true },
    { href: "https://github.com/SriramParthiban", icon: Github, label: "GitHub", external: true },
  ];

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Connect</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground sm:text-4xl lg:text-5xl">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground max-w-lg">
            Interested in building scalable AI-driven automation systems? Let's connect and explore how I can help.
          </p>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-card/60 px-5 py-3.5 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:text-foreground card-hover"
                >
                  <Icon className="h-4 w-4 transition-colors duration-300 group-hover:text-primary" />
                  <span className="truncate">{link.label}</span>
                  {link.external && (
                    <ArrowUpRight className="h-3 w-3 ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </motion.a>
              );
            })}
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <form onSubmit={handleSubmit} className="mt-12 max-w-md">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group relative overflow-hidden space-y-4 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 card-hover"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                <Input
                  placeholder="Your name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-border/40 bg-background/80 transition-all duration-300 focus:border-primary/40 focus:bg-background"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-border/40 bg-background/80 transition-all duration-300 focus:border-primary/40 focus:bg-background"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Textarea
                  placeholder="Your message"
                  required
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="border-border/40 bg-background/80 transition-all duration-300 focus:border-primary/40 focus:bg-background resize-none"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full glow-sm font-semibold transition-all duration-300 hover:glow-md"
              >
                {sending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {sending ? "Opening..." : "Send Message"}
              </Button>
            </motion.div>
          </form>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;
