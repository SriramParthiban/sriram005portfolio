import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Send, ArrowUpRight } from "lucide-react";
import FadeInSection from "./FadeInSection";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:sriramparthiban1970@gmail.com?subject=${subject}&body=${body}`);
    toast({ title: "Opening email client", description: "Your message is ready to send." });
    setForm({ name: "", email: "", message: "" });
  };

  const links = [
    {
      href: "mailto:sriramparthiban1970@gmail.com",
      icon: Mail,
      label: "sriramparthiban1970@gmail.com",
      external: false,
    },
    {
      href: "https://www.linkedin.com/in/sriram-parthiban-0500q/",
      icon: Linkedin,
      label: "LinkedIn",
      external: true,
    },
    {
      href: "https://github.com/SriramParthiban",
      icon: Github,
      label: "GitHub",
      external: true,
    },
  ];

  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Connect</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-lg">
            Interested in building scalable AI-driven automation systems? Let's connect and explore how I can help.
          </p>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-5">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground hover:shadow-md hover:shadow-primary/5"
                >
                  <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                  {link.label}
                  {link.external && <ArrowUpRight className="h-3 w-3 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />}
                </a>
              );
            })}
          </div>
        </FadeInSection>

        <FadeInSection delay={250}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-4 max-w-md">
            <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-6">
              <Input
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-border/40 bg-background transition-colors focus:border-primary/40"
              />
              <Input
                type="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-border/40 bg-background transition-colors focus:border-primary/40"
              />
              <Textarea
                placeholder="Your message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border-border/40 bg-background transition-colors focus:border-primary/40 resize-none"
              />
              <Button type="submit" className="w-full shadow-md shadow-primary/20">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </form>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;
