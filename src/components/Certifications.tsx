import { Award, ExternalLink } from "lucide-react";
import FadeInSection from "./FadeInSection";

const certs = [
  { name: "Supply Chain Operations", platform: "Udemy", color: "bg-primary/10 text-primary" },
  { name: "SQL for Data Science", platform: "UC Davis (Coursera)", color: "bg-accent/10 text-accent" },
  { name: "Data Analytics & Power BI", platform: "PrepInsta", color: "bg-primary/10 text-primary" },
  { name: "TensorFlow for Deep Learning", platform: "Udemy", color: "bg-accent/10 text-accent" },
];

const Certifications = () => (
  <section id="certifications" className="px-6 py-28">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Credentials</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Certifications</h2>
      </FadeInSection>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certs.map((c, idx) => (
          <FadeInSection key={c.name} delay={idx * 100}>
            <div className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.color}`}>
                <Award className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{c.name}</p>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground">{c.platform}</p>
              </div>
              <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" />
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
