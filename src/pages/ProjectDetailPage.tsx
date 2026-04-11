import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projectsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import PageLayout from "@/components/PageLayout";

import ArchitectureDiagram from "@/components/case-study/ArchitectureDiagram";
import ProjectTimeline from "@/components/case-study/ProjectTimeline";
import BeforeAfterTable from "@/components/case-study/BeforeAfterTable";
import ChallengesGrid from "@/components/case-study/ChallengesGrid";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  AlertCircle,
  Target,
  Wrench,
  TrendingUp,
  Briefcase,
  Rocket,
  CheckCircle2,
  ChevronRight,
  Layers,
  Calendar,
  ArrowLeftRight,
  Lightbulb,
  Quote,
  Sparkles,
  Zap,
  Award,
} from "lucide-react";

// Real tech logos
import pythonLogo from "@/assets/logos/python.svg";
import n8nLogo from "@/assets/logos/n8n.svg";
import bigqueryLogo from "@/assets/logos/bigquery.svg";
import makeLogo from "@/assets/logos/make.svg";
import lookerLogo from "@/assets/logos/looker.svg";
import jsLogo from "@/assets/logos/javascript.svg";
import pgLogo from "@/assets/logos/postgresql.svg";
import powerbiLogo from "@/assets/logos/powerbi.svg";

const techLogos: Record<string, string> = {
  python: pythonLogo, n8n: n8nLogo, bigquery: bigqueryLogo, "google bigquery": bigqueryLogo,
  make: makeLogo, looker: lookerLogo, javascript: jsLogo, postgresql: pgLogo,
  "power bi": powerbiLogo, powerbi: powerbiLogo,
};

const getTechLogo = (tech: string) => techLogos[tech.toLowerCase()] || null;


/* ─── Confetti burst on scroll ─── */
const ConfettiBurst = ({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement> }) => {
  const isInView = useInView(triggerRef, { once: true, margin: "-100px" });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; rotation: number; delay: number }>>([]);

  useEffect(() => {
    if (isInView && particles.length === 0) {
      const colors = [
        "bg-primary", "bg-accent", "bg-primary/70", "bg-accent/70",
        "bg-primary/50", "bg-accent/50", "bg-primary/80", "bg-accent/80",
      ];
      const newParticles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[i % colors.length],
        size: 3 + Math.random() * 6,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.4,
      }));
      setParticles(newParticles);
    }
  }, [isInView]);

  if (!isInView) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.color} rounded-sm`}
          style={{
            width: p.size,
            height: p.size * (Math.random() > 0.5 ? 1 : 0.5),
            left: `${p.x}%`,
            top: "40%",
            rotate: p.rotation,
          }}
          initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
          animate={{
            opacity: [1, 1, 0],
            y: [0, -(80 + Math.random() * 200), 120 + Math.random() * 200],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 250],
            scale: [0, 1.2, 0.6],
            rotate: [p.rotation, p.rotation + (Math.random() - 0.5) * 720],
          }}
          transition={{
            duration: 1.8 + Math.random() * 1.2,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
};

/* ─── Animated counter for metric numbers ─── */
const AnimatedNumber = ({ value, duration = 1.8 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && !started) setStarted(true);
  }, [isInView, started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, started, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

/* ─── Parse label into parts with animated numbers ─── */
const AnimatedLabel = ({ label }: { label: string }) => {
  // Split label around numbers, animate each number
  const parts = label.split(/(\d[\d,.]*)/g);
  return (
    <span className="text-sm font-semibold text-foreground leading-snug">
      {parts.map((part, i) => {
        const num = parseFloat(part.replace(/,/g, ""));
        if (!isNaN(num) && part.match(/^\d[\d,.]*$/)) {
          return <AnimatedNumber key={i} value={num} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

/* ─── Metric card ─── */
const MetricCard = ({ label, idx }: { label: string; idx: number }) => {
  const colorSets = [
    { bg: "from-primary/15 to-primary/8", border: "border-primary/25", icon: "text-primary" },
    { bg: "from-accent/15 to-accent/8", border: "border-accent/25", icon: "text-accent" },
    { bg: "from-primary/12 to-primary/6", border: "border-primary/20", icon: "text-primary" },
    { bg: "from-accent/12 to-accent/6", border: "border-accent/20", icon: "text-accent" },
    { bg: "from-primary/10 to-accent/8", border: "border-primary/20", icon: "text-primary" },
  ];
  const icons = [CheckCircle2, Zap, Award, TrendingUp, Sparkles];
  const IconComp = icons[idx % icons.length];
  const c = colorSets[idx % colorSets.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, type: "spring", stiffness: 120, damping: 14 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`rounded-xl border ${c.border} bg-gradient-to-br ${c.bg} p-5 backdrop-blur-sm cursor-default transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
          <IconComp className={`h-4.5 w-4.5 ${c.icon}`} />
        </div>
        <AnimatedLabel label={label} />
      </div>
    </motion.div>
  );
};

/* ─── Section header ─── */
const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  gradientFrom,
  gradientTo,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  gradientFrom: string;
  gradientTo: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2.5 rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-sm">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="ml-[52px] h-1 w-20 rounded-full bg-primary/30" />
  </div>
);

/* ─── Clean section divider ─── */
const SectionDivider = () => (
  <div className="my-16 flex items-center gap-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
  </div>
);

/* ─── Tech badge with real logo ─── */
const TechBadge = ({ name, idx }: { name: string; idx: number }) => {
  const logo = getTechLogo(name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 + idx * 0.06, type: "spring", stiffness: 150 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 backdrop-blur-sm px-3 py-1.5 cursor-default transition-colors hover:border-primary/30"
    >
      {logo && <img src={logo} alt={name} className="h-4 w-4" />}
      <span className="text-xs font-semibold text-foreground">{name}</span>
    </motion.div>
  );
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  if (!project) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
            <Link to="/#projects">
              <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" />Back to Portfolio</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const Icon = project.icon;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <PageLayout>
      <div ref={containerRef} className="noise relative min-h-screen overflow-hidden">
        {/* ─── Solid sage base + gradient overlay matching home page ─── */}
        <div className="absolute inset-0 bg-[hsl(90_20%_93%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(90_22%_91%)] via-[hsl(90_18%_94%)] to-[hsl(90_20%_92%)]" />
        {/* Warm earthy accent blobs - stronger opacity */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[800px] w-[800px] rounded-full bg-primary/20 blur-[180px]" />
          <div className="absolute top-[20%] -right-32 h-[700px] w-[700px] rounded-full bg-[hsl(90_20%_80%)]/50 blur-[150px]" />
          <div className="absolute top-[45%] left-[10%] h-[600px] w-[600px] rounded-full bg-accent/15 blur-[160px]" />
          <div className="absolute top-[70%] right-[15%] h-[550px] w-[550px] rounded-full bg-primary/12 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[hsl(38_45%_80%)]/35 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-24 sm:py-32">
          {/* Back navigation */}
          <FadeInSection>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </FadeInSection>

          {/* ═══════════════════ HERO ═══════════════════ */}
          <FadeInSection delay={100}>
            <div className="relative mb-16 p-8 sm:p-10 rounded-2xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

              <div className="relative flex items-start gap-5 sm:gap-7 mb-7">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`relative flex h-18 w-18 sm:h-22 sm:w-22 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.color} p-[2px] shadow-lg`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-background/90 backdrop-blur-sm">
                    <Icon className="h-9 w-9 sm:h-11 sm:w-11 text-primary" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground leading-tight"
                  >
                    {project.fullTitle}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>

              {/* Tech badges */}
              <div className="relative flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <TechBadge key={t} name={t} idx={i} />
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ KEY METRICS ═══════════════════ */}
          <FadeInSection delay={200}>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Key Results</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <MetricCard key={m} label={m} idx={idx} />
                ))}
              </div>
            </div>
          </FadeInSection>

          <SectionDivider />

          {/* ═══════════════════ PROBLEM STATEMENT ═══════════════════ */}
          <FadeInSection delay={250}>
            <div className="mb-16">
              <SectionHeader
                icon={AlertCircle}
                title="Problem Statement"
                subtitle="The challenge we set out to solve"
                gradientFrom="from-destructive"
                gradientTo="to-destructive/80"
              />
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative ml-0 sm:ml-14 p-6 rounded-xl border border-destructive/15 bg-destructive/5"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-destructive to-destructive/60" />
                <p className="text-muted-foreground leading-relaxed text-base pl-4">{project.problemStatement}</p>
              </motion.div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ CHALLENGES ═══════════════════ */}
          <FadeInSection delay={300}>
            <div className="mb-16">
              <SectionHeader
                icon={AlertCircle}
                title="Key Challenges"
                subtitle="Obstacles encountered during the build"
                gradientFrom="from-accent"
                gradientTo="to-accent/80"
              />
              <ChallengesGrid challenges={project.challenges} />
            </div>
          </FadeInSection>

          <SectionDivider />

          {/* ═══════════════════ PURPOSE & GOALS ═══════════════════ */}
          <FadeInSection delay={350}>
            <div className="mb-16">
              <SectionHeader
                icon={Target}
                title="Purpose & Goals"
                subtitle="What we aimed to achieve"
                gradientFrom="from-primary"
                gradientTo="to-primary/80"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative ml-0 sm:ml-14 p-6 rounded-xl border border-primary/15 bg-primary/5"
              >
                <p className="text-muted-foreground leading-relaxed text-base">{project.purpose}</p>
              </motion.div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ ARCHITECTURE ═══════════════════ */}
          <FadeInSection delay={400}>
            <div className="mb-16">
              <SectionHeader
                icon={Layers}
                title="System Architecture"
                subtitle="How everything connects"
                gradientFrom="from-primary/90"
                gradientTo="to-accent/90"
              />
              <div className="rounded-2xl border border-primary/15 bg-primary/5 backdrop-blur-sm p-6 sm:p-10">
                <ArchitectureDiagram steps={project.architectureSteps} color={project.color} />
              </div>
            </div>
          </FadeInSection>

          <SectionDivider />

          {/* ═══════════════════ IMPLEMENTATION ═══════════════════ */}
          <FadeInSection delay={450}>
            <div className="mb-16">
              <SectionHeader
                icon={Wrench}
                title="Implementation Details"
                subtitle="Step-by-step technical breakdown"
                gradientFrom="from-primary"
                gradientTo="to-primary/70"
              />
              <div className="ml-0 sm:ml-14 space-y-3">
                {project.implementation.map((step, idx) => {
                  const stepColors = [
                    "border-primary/15 bg-primary/5",
                    "border-primary/12 bg-primary/4",
                    "border-accent/15 bg-accent/5",
                    "border-primary/10 bg-primary/3",
                    "border-accent/12 bg-accent/4",
                    "border-primary/15 bg-primary/5",
                  ];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06, type: "spring", stiffness: 100 }}
                      whileHover={{ x: 4 }}
                      className={`flex items-start gap-4 p-4 rounded-lg border ${stepColors[idx % stepColors.length]} transition-all cursor-default`}
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-[10px] font-bold text-primary-foreground shadow-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">{step}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ TIMELINE ═══════════════════ */}
          <FadeInSection delay={500}>
            <div className="mb-16">
              <SectionHeader
                icon={Calendar}
                title="Project Timeline"
                subtitle="From kickoff to launch"
                gradientFrom="from-accent"
                gradientTo="to-accent/70"
              />
              <ProjectTimeline items={project.timeline} color={project.color} />
            </div>
          </FadeInSection>

          <SectionDivider />

          {/* ═══════════════════ BEFORE VS AFTER ═══════════════════ */}
          <FadeInSection delay={550}>
            <div className="mb-16">
              <SectionHeader
                icon={ArrowLeftRight}
                title="Before vs After"
                subtitle="Measurable transformation"
                gradientFrom="from-primary"
                gradientTo="to-accent"
              />
              <BeforeAfterTable items={project.beforeAfter} />
            </div>
          </FadeInSection>

          {/* ═══════════════════ IMPACT ═══════════════════ */}
          <FadeInSection delay={600}>
            <div ref={impactRef} className="relative mb-16 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/4 to-accent/6 p-8 sm:p-10 shadow-lg">
              <ConfettiBurst triggerRef={impactRef} />

              <SectionHeader
                icon={Award}
                title="Impact & Results"
                subtitle="The bottom-line difference"
                gradientFrom="from-primary"
                gradientTo="to-primary/80"
              />
              <div className="pl-0 sm:pl-14">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 rounded-xl bg-primary/10 border border-primary/20 px-5 py-3 mb-6"
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p className="text-lg sm:text-xl font-display font-bold text-foreground">
                    {project.impact.headline}
                  </p>
                </motion.div>
                <div className="space-y-2.5">
                  {project.impact.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, type: "spring" }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ KEY TAKEAWAY ═══════════════════ */}
          <FadeInSection delay={650}>
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/8 via-accent/4 to-accent/3 p-8 sm:p-10 overflow-hidden"
              >
                <div className="relative">
                  <Quote className="h-10 w-10 text-accent/20 mb-4" />
                  <p className="text-lg sm:text-xl font-display font-semibold text-foreground leading-relaxed italic mb-6">
                    "{project.keyTakeaway}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
                    <div className="flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 border border-accent/15">
                      <Lightbulb className="h-3.5 w-3.5 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground">Key Takeaway</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-accent/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>

          <SectionDivider />

          {/* ═══════════════════ USE CASES ═══════════════════ */}
          <FadeInSection delay={700}>
            <div className="mb-16">
              <SectionHeader
                icon={Briefcase}
                title="Real Use Cases"
                subtitle="How this works in practice"
                gradientFrom="from-primary/80"
                gradientTo="to-primary"
              />
              <div className="ml-0 sm:ml-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.useCases.map((useCase, idx) => {
                  const caseColors = [
                    "border-primary/15 bg-primary/5 hover:bg-primary/10",
                    "border-accent/15 bg-accent/5 hover:bg-accent/10",
                    "border-primary/12 bg-primary/4 hover:bg-primary/8",
                    "border-accent/12 bg-accent/4 hover:bg-accent/8",
                  ];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, type: "spring" }}
                      whileHover={{ y: -3 }}
                      className={`p-4 rounded-lg border ${caseColors[idx % caseColors.length]} transition-all cursor-default`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15 mt-0.5">
                          <ChevronRight className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">{useCase}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ IMPROVEMENTS ═══════════════════ */}
          <FadeInSection delay={750}>
            <div className="mb-16">
              <SectionHeader
                icon={Rocket}
                title="Possible Improvements"
                subtitle="What's next on the roadmap"
                gradientFrom="from-accent"
                gradientTo="to-accent/70"
              />
              <div className="ml-0 sm:ml-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.improvements.map((improvement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -12 : 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, type: "spring" }}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start gap-3 p-4 rounded-lg border border-accent/15 bg-accent/5 hover:bg-accent/8 transition-all cursor-default"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/15 mt-0.5">
                      <Rocket className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{improvement}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <SectionDivider />

          {/* ═══════════════════ SCREENSHOTS ═══════════════════ */}
          <FadeInSection delay={800}>
            <div className="mb-16">
              <SectionHeader
                icon={Sparkles}
                title="Screenshots & Proof"
                subtitle="See it in action"
                gradientFrom="from-primary"
                gradientTo="to-accent"
              />
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  className="overflow-hidden rounded-xl border border-primary/15 bg-card shadow-lg"
                >
                  <div className="border-b border-border bg-card/80 px-5 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {project.proofLabel}
                    </span>
                  </div>
                  <img src={project.proofImage} alt={`${project.fullTitle} - proof`} className="w-full" loading="lazy" />
                </motion.div>
                {project.extraImages.map((img) => (
                  <motion.div
                    key={img.label}
                    whileHover={{ scale: 1.005 }}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-md"
                  >
                    <div className="border-b border-border bg-card/80 px-5 py-3 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {img.label}
                      </span>
                    </div>
                    <img src={img.src} alt={img.label} className="w-full" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ NAVIGATION ═══════════════════ */}
          <FadeInSection delay={850}>
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group rounded-xl border border-border bg-card/80 p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-2">
                  <ArrowLeft className="h-3 w-3" /> Previous Project
                </span>
                <p className="text-sm font-display font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                  ← {prevProject.fullTitle}
                </p>
              </Link>
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group rounded-xl border border-border bg-card/80 p-5 transition-all hover:border-accent/30 hover:shadow-md text-right"
              >
                <span className="text-xs text-muted-foreground flex items-center justify-end gap-2">
                  Next Project <ChevronRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-display font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                  {nextProject.fullTitle} →
                </p>
              </Link>
            </div>
          </FadeInSection>

          {/* Back to portfolio CTA */}
          <FadeInSection delay={900}>
            <div className="text-center pt-10 border-t border-border/50">
              <Link to="/#projects">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 rounded-lg px-8 py-5 text-base font-semibold">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Projects
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectDetailPage;
