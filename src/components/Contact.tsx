import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Loader2, ArrowUpRight } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import BookingCalendar from "./BookingCalendar";
import mountainFog from "@/assets/mountain-fog.jpg";

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
        body: result.data,
      });
      if (error) throw error;
      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Failed to send",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const links = [
    { icon: Mail, label: "sriramparthiban1970@gmail.com", href: "mailto:sriramparthiban1970@gmail.com", external: false },
    { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/sriram-parthiban-0500q/", external: true },
    { icon: Github, label: "GitHub", href: "https://github.com/SriramParthiban", external: true },
  ];

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={mountainFog} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/35" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <FadeInSection>
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
              Let's Work Together
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl">
              Book a meeting or drop me a message — I'd love to hear about your project.
            </p>
          </div>
        </FadeInSection>

        {/* Contact links */}
        <FadeInSection delay={100}>
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
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
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/20 hover:text-foreground hover:shadow-sm min-h-[44px]"
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

        {/* Side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
          <FadeInSection delay={200}>
            <BookingCalendar />
          </FadeInSection>

          <FadeInSection delay={200}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                Get in Touch
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-5 lg:mb-[57px]">
                Prefer to write? Send me a message directly.
              </p>

              <form onSubmit={handleSubmit}>
                <motion.div
                  whileHover={{ y: -2, rotate: -0.2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative overflow-hidden rounded-lg shadow-md"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <div
                    className="relative p-5 sm:p-6 border-2 border-[hsl(35,25%,75%)]"
                    style={{
                      background: "linear-gradient(145deg, hsl(35 30% 90%) 0%, hsl(35 25% 86%) 100%)",
                    }}
                  >
                    <div className="absolute top-3 right-3 h-12 w-10 rounded-sm border-2 border-dashed border-[hsl(35,20%,70%)] bg-[hsl(35,15%,84%)] flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary/40" />
                    </div>

                    <div className="mb-5 text-base font-mono font-bold text-[hsl(35,20%,20%)] italic pr-16">
                      Dear Sriram,
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-extrabold text-[hsl(35,25%,22%)] uppercase tracking-widest mb-1.5">From</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          required
                          maxLength={100}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-dotted border-[hsl(35,20%,60%)] pb-2 text-base font-bold text-[hsl(35,25%,15%)] placeholder:text-[hsl(35,20%,40%)] placeholder:font-semibold focus:outline-none focus:border-primary/40 transition-colors font-mono"
                        />
                        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-[hsl(35,20%,30%)] uppercase tracking-widest mb-1">Return Address</label>
                        <input
                          type="email"
                          placeholder="Your email"
                          required
                          maxLength={255}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-dotted border-[hsl(35,20%,68%)] pb-2 text-sm font-semibold text-[hsl(35,20%,20%)] placeholder:text-[hsl(35,15%,45%)] placeholder:font-medium focus:outline-none focus:border-primary/40 transition-colors font-mono"
                        />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-[hsl(35,20%,30%)] uppercase tracking-widest mb-1">Message</label>
                        <textarea
                          placeholder="Write your message here..."
                          required
                          rows={4}
                          maxLength={2000}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-dotted border-[hsl(35,20%,68%)] pb-2 text-sm font-semibold text-[hsl(35,20%,20%)] placeholder:text-[hsl(35,15%,45%)] placeholder:font-medium focus:outline-none focus:border-primary/40 transition-colors resize-none font-mono"
                          style={{
                            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(35 20% 78% / 0.5) 27px, hsl(35 20% 78% / 0.5) 28px)",
                            lineHeight: "28px",
                          }}
                        />
                        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                      <Button
                        type="submit"
                        disabled={sending}
                        className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[hsl(0,55%,55%)] to-[hsl(0,45%,42%)] border-2 border-[hsl(0,40%,60%)] shadow-md hover:from-[hsl(0,55%,60%)] hover:to-[hsl(0,45%,48%)] transition-all duration-300 p-0"
                      >
                        {sending ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <Mail className="h-4 w-4 text-white" />
                        )}
                      </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15" />
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