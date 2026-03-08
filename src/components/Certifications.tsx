import { Award, ExternalLink } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";

const certs = [
  { name: "n8n Course Certificate", platform: "Udemy" },
  { name: "Full Stack Web Development Bootcamp", platform: "Udemy" },
  { name: "Supply Chain Operations", platform: "Udemy" },
  { name: "SQL for Data Science", platform: "UC Davis (Coursera)" },
  { name: "Data Analytics & Power BI", platform: "PrepInsta" },
  { name: "TensorFlow for Deep Learning", platform: "Udemy" },
];

const Certifications = () => (
  <section id="certifications" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
    {/* Background */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-0 right-20 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-primary/6 blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-20 -left-20 h-[125px] w-[125px] md:h-[250px] md:w-[250px] rounded-full bg-accent/5 blur-[60px] md:blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Credentials</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
          Professional <span className="gradient-text">Certifications</span>
        </h2>
      </FadeInSection>

      {/* Achievement Wall — framed certificates */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {certs.map((c, idx) => (
          <FadeInSection key={c.name} delay={idx * 120}>
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative perspective-[800px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Outer gold frame */}
              <div className="relative overflow-hidden rounded-sm border-[3px] border-[hsl(40,60%,35%)] bg-gradient-to-br from-[hsl(40,50%,25%)] to-[hsl(40,40%,18%)] p-1 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_hsl(40,60%,45%)]">
                {/* Inner frame border */}
                <div className="rounded-[1px] border border-[hsl(40,50%,30%)] bg-[hsl(225,25%,8%)] p-5 sm:p-6">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative flex flex-col items-center text-center">
                    {/* Award icon in a seal */}
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(40,60%,45%)] to-[hsl(40,50%,30%)] shadow-[0_0_20px_-4px_hsl(40,60%,45%/0.4)]">
                      <Award className="h-7 w-7 text-[hsl(40,80%,90%)]" />
                    </div>

                    <h3 className="text-sm font-display font-bold text-foreground">{c.name}</h3>
                    <p className="mt-1.5 text-xs font-medium text-muted-foreground">{c.platform}</p>

                    {/* Decorative underline */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-[hsl(40,50%,40%)]" />
                      <div className="h-1 w-1 rounded-full bg-[hsl(40,50%,40%)]" />
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-[hsl(40,50%,40%)]" />
                    </div>
                  </div>

                  {/* External link corner */}
                  
                </div>
              </div>

              {/* "Hanging wire" — tiny line above frame */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-white/10 to-white/5" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-white/15 border border-white/10" />
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
