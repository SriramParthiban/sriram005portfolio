import { Award } from "lucide-react";

const certs = [
  { name: "Supply Chain Operations", platform: "Udemy" },
  { name: "SQL for Data Science", platform: "UC Davis (Coursera)" },
  { name: "Data Analytics & Power BI", platform: "PrepInsta" },
  { name: "TensorFlow for Deep Learning", platform: "Udemy" },
];

const Certifications = () => (
  <section id="certifications" className="px-6 py-24">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Certifications</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certs.map((c) => (
          <div
            key={c.name}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
          >
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.platform}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
