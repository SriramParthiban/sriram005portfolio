import { motion } from "framer-motion";
import { Bot, Workflow, Database, TrendingUp, Sparkles } from "lucide-react";
import FadeInSection from "./FadeInSection";
import NodeCanvas from "./n8n/NodeCanvas";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    tag: "Trigger",
    color: "from-emerald-500/80 to-emerald-600/80",
    accent: "emerald",
    bullets: ["Conversational agents", "Smart qualification", "Auto-routing"],
    output: "→ Qualified leads",
  },
  {
    icon: Workflow,
    title: "RevOps Engineering",
    tag: "Action",
    color: "from-orange-500/80 to-amber-600/80",
    accent: "orange",
    bullets: ["CRM workflows", "Pipeline hygiene", "Lead scoring"],
    output: "→ Clean pipeline",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    tag: "Transform",
    color: "from-sky-500/80 to-blue-600/80",
    accent: "sky",
    bullets: ["ETL & sync", "Warehouse setup", "Real-time dashboards"],
    output: "→ Single source of truth",
  },
  {
    icon: TrendingUp,
    title: "GTM Strategy",
    tag: "Output",
    color: "from-rose-500/80 to-pink-600/80",
    accent: "rose",
    bullets: ["ICP modeling", "Outbound systems", "Conversion analytics"],
    output: "→ Predictable revenue",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
              <Sparkles className="inline h-3 w-3 mr-1.5" />
              What I Build
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
              A connected stack of services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Each capability plugs into the next — like nodes in a workflow.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <NodeCanvas className="p-6 sm:p-10">
            {/* Workflow row */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {services.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="relative">
                    {/* Connector line to next node (desktop only) */}
                    {idx < services.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px z-0">
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                          <line
                            x1="0" y1="1" x2="100%" y2="1"
                            stroke="hsl(var(--primary) / 0.4)"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                          />
                          <circle cx="100%" cy="1" r="2" fill="hsl(var(--primary))" />
                        </svg>
                      </div>
                    )}

                    {/* Node card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="relative z-10 rounded-xl border border-border bg-card shadow-md overflow-hidden group"
                    >
                      {/* Header strip */}
                      <div className={`bg-gradient-to-r ${s.color} px-4 py-2.5 flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/25 backdrop-blur-sm">
                            <Icon className="h-3.5 w-3.5 text-white" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/95">
                            {s.tag}
                          </span>
                        </div>
                        {/* Connection dot */}
                        <div className="h-2 w-2 rounded-full bg-white/80 ring-2 ring-white/30" />
                      </div>

                      {/* Body */}
                      <div className="p-4">
                        <h3 className="text-base font-display font-bold text-foreground mb-3">
                          {s.title}
                        </h3>
                        <ul className="space-y-1.5 mb-3">
                          {s.bullets.map((b) => (
                            <li key={b} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-primary mt-0.5">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-[11px] font-mono text-primary/80">{s.output}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </NodeCanvas>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Services;
