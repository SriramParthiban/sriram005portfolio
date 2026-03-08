import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Loader2, ArrowUpRight } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import BookingCalendar from "./BookingCalendar";

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
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: form.name, email: form.email, message: form.message },
      });
      if (error) throw error;
      toast({ title: "✉️ Message sent successfully!", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const links = [
    { href: "mailto:sriramparthiban1970@gmail.com", icon: Mail, label: "sriramparthiban1970@gmail.com", external: false },
    { href: "https://www.linkedin.com/in/sriram-parthiban-0500q/", icon: Linkedin, label: "LinkedIn", external: true },
    { href: "https://github.com/SriramParthiban", icon: Github, label: "GitHub", external: true },
  ];

  return (
    <section id="contact" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[180px] md:h-[600px] md:w-[600px]" />
        <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-accent/10 blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
              <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Connect</span>
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-accent to-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
              Let's <span className="gradient-text">Work Together</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Book a meeting or drop me a message — I'd love to hear about your project.
            </p>
          </div>
        </FadeInSection>

        {/* Contact links */}
        <FadeInSection delay={100}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
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
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:text-foreground hover:bg-white/8 min-h-[44px]"
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

        {/* Side-by-side: Booking + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
          {/* Left: Booking Calendar */}
          <FadeInSection delay={200}>
            <BookingCalendar />
          </FadeInSection>

          {/* Right: Contact Form */}
          <FadeInSection delay={200}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-accent to-primary" />
                <span className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-accent">Message</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
                Get in <span className="gradient-text">Touch</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-5 lg:mb-[57px]">
                Prefer to write? Send me a message directly.
              </p>

              <form onSubmit={handleSubmit}>
                <motion.div
                  whileHover={{ y: -2, rotate: -0.2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative overflow-hidden rounded-lg shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)]"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <div
                    className="relative p-5 sm:p-6 border-2 border-[hsl(35,20%,25%)]"
                    style={{
                      background: "linear-gradient(145deg, hsl(35 25% 14%) 0%, hsl(35 20% 11%) 100%)",
                    }}
                  >
                    {/* Stamp */}
                    <div className="absolute top-3 right-3 h-12 w-10 rounded-sm border-2 border-dashed border-[hsl(35,20%,30%)] bg-[hsl(35,15%,16%)] flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary/40" />
                    </div>

                    <div className="absolute top-5 right-10 h-8 w-8 rounded-full border border-[hsl(35,20%,25%)] opacity-20 rotate-12" />

                    <div className="mb-5 text-xs font-mono text-[hsl(35,15%,40%)] italic pr-16">
                      Dear Sriram,
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-[hsl(35,15%,40%)] uppercase tracking-widest mb-1">From</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          required
                          maxLength={100}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-dotted border-[hsl(35,20%,28%)] pb-2 text-sm text-[hsl(35,30%,75%)] placeholder:text-[hsl(35,10%,30%)] focus:outline-none focus:border-primary/40 transition-colors font-mono"
                        />
                        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[hsl(35,15%,40%)] uppercase tracking-widest mb-1">Return Address</label>
                        <input
                          type="email"
                          placeholder="Your email"
                          required
                          maxLength={255}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-dotted border-[hsl(35,20%,28%)] pb-2 text-sm text-[hsl(35,30%,75%)] placeholder:text-[hsl(35,10%,30%)] focus:outline-none focus:border-primary/40 transition-colors font-mono"
                        />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[hsl(35,15%,40%)] uppercase tracking-widest mb-1">Message</label>
                        <textarea
                          placeholder="Write your message here..."
                          required
                          rows={4}
                          maxLength={2000}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-dotted border-[hsl(35,20%,28%)] pb-2 text-sm text-[hsl(35,30%,75%)] placeholder:text-[hsl(35,10%,30%)] focus:outline-none focus:border-primary/40 transition-colors resize-none font-mono"
                          style={{
                            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(35 20% 22% / 0.5) 27px, hsl(35 20% 22% / 0.5) 28px)",
                            lineHeight: "28px",
                          }}
                        />
                        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                      </div>
                    </div>

                    {/* Wax seal send */}
                    <div className="mt-5 flex justify-end">
                      <Button
                        type="submit"
                        disabled={sending}
                        className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[hsl(0,65%,40%)] to-[hsl(0,50%,28%)] border-2 border-[hsl(0,40%,45%)] shadow-[0_4px_20px_-4px_rgba(139,0,0,0.5)] hover:from-[hsl(0,65%,45%)] hover:to-[hsl(0,50%,32%)] hover:shadow-[0_4px_24px_-2px_rgba(139,0,0,0.6)] transition-all duration-300 p-0"
                      >
                        {sending ? (
                          <Loader2 className="h-4 w-4 animate-spin text-[hsl(40,80%,85%)]" />
                        ) : (
                          <Mail className="h-4 w-4 text-[hsl(40,80%,85%)]" />
                        )}
                      </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
                  </div>
                </motion.div>
              </form>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
