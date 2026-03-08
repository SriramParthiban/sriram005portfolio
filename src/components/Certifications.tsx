import { Award } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import coralReef from "@/assets/coral-reef.jpg";

const certs = [
  { name: "n8n Course Certificate", platform: "Udemy" },
  { name: "Full Stack Web Development Bootcamp", platform: "Udemy" },
  { name: "Supply Chain Operations", platform: "Udemy" },
  { name: "SQL for Data Science", platform: "UC Davis (Coursera)" },
  { name: "Data Analytics & Power BI", platform: "PrepInsta" },
  { name: "TensorFlow for Deep Learning", platform: "Udemy" },
];

const Certifications = () => (
  <section id="certifications" className="dark-section relative px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={coralReef} alt="" className="h-full w-full object-cover opacity-[0.08]" loading="lazy" />
      <div className="absolute inset-0 bg-[hsl(var(--dark-section))/0.92]" />
    </div>

    <div className="relative mx-auto max-w-3xl">
      <FadeInSection>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
          Certifications
        </h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
      </FadeInSection>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {certs.map((c, idx) => (
          <FadeInSection key={c.name} delay={idx * 120}>
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative perspective-[800px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative overflow-hidden rounded-sm border-[3px] border-[hsl(40,50%,65%)] bg-gradient-to-br from-[hsl(40,40%,75%)] to-[hsl(40,35%,65%)] p-1 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_hsl(40,50%,80%)]">
                <div className="rounded-[1px] border border-[hsl(40,40%,70%)] bg-card p-5 sm:p-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(40,60%,60%)] to-[hsl(40,50%,50%)] shadow-md">
                      <Award className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-sm font-display font-bold text-foreground">{c.name}</h3>
                    <p className="mt-1.5 text-xs font-medium text-muted-foreground">{c.platform}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-[hsl(40,40%,65%)]" />
                      <div className="h-1 w-1 rounded-full bg-[hsl(40,40%,65%)]" />
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-[hsl(40,40%,65%)]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-foreground/5 to-foreground/3" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-foreground/8 border border-foreground/5" />
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;