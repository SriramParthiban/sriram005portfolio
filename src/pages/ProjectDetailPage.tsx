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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  Star,
} from "lucide-react";

/* ─── Floating decorative shapes ─── */
const FloatingShape = ({
  className,
  delay = 0,
  size = 60,
  color,
}: {
  className?: string;
  delay?: number;
  size?: number;
  color: string;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 8, -8, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    style={{ width: size, height: size }}
  >
    <div
      className={`w-full h-full rounded-2xl ${color} blur-sm opacity-40`}
      style={{ transform: `rotate(${delay * 15}deg)` }}
    />
  </motion.div>
);

/* ─── Animated metric card ─── */
const MetricCard = ({
  label,
  idx,
}: {
  label: string;
  idx: number;
}) => {
  const colors = [
    "from-primary/20 to-accent/20 border-primary/30",
    "from-accent/20 to-primary/20 border-accent/30",
    "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30",
  ];
  const icons = [CheckCircle2, Zap, Star, TrendingUp, Sparkles];
  const IconComp = icons[idx % icons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colors[idx % colors.length]} p-5 backdrop-blur-sm`}
    >
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/5 blur-xl" />
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm">
          <IconComp className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground leading-snug">{label}</span>
      </div>
    </motion.div>
  );
};

/* ─── Colorful section divider ─── */
const SectionDivider = ({ variant = "default" }: { variant?: "default" | "accent" | "gradient" }) => {
  const styles = {
    default: "from-transparent via-primary/30 to-transparent",
    accent: "from-transparent via-accent/30 to-transparent",
    gradient: "from-primary/20 via-accent/30 to-primary/20",
  };
  return (
    <div className="relative my-16 flex items-center justify-center">
      <div className={`h-px w-full bg-gradient-to-r ${styles[variant]}`} />
      <div className="absolute flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-lg border border-border bg-background flex items-center justify-center"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary/60" />
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Section header with gradient underline ─── */
const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  color,
  bgColor,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  color: string;
  bgColor: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <motion.div
        whileHover={{ rotate: 12, scale: 1.1 }}
        className={`p-3 rounded-2xl ${bgColor} shadow-sm`}
      >
        <Icon className={`h-5 w-5 ${color}`} />
      </motion.div>
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    <div className="ml-14 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-accent to-primary/30" />
  </div>
);

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (!project) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
            <Link to="/#projects">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
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
      <div ref={containerRef} className="dark-section relative min-h-screen overflow-hidden">
        {/* ─── Rich background with multiple gradient orbs ─── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div style={{ y: parallaxY }}>
            <div className="absolute top-10 -left-40 h-[600px] w-[600px] rounded-full bg-primary/12 blur-[180px]" />
            <div className="absolute top-[30%] -right-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />
            <div className="absolute top-[55%] left-[20%] h-[400px] w-[400px] rounded-full bg-emerald-500/8 blur-[140px]" />
            <div className="absolute top-[75%] right-[15%] h-[350px] w-[350px] rounded-full bg-amber-500/6 blur-[130px]" />
            <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] rounded-full bg-violet-500/6 blur-[160px]" />
          </motion.div>
        </div>

        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.015)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating decorative shapes */}
        <FloatingShape className="top-32 left-[8%]" delay={0} size={50} color="bg-primary/30" />
        <FloatingShape className="top-[20%] right-[10%]" delay={1.5} size={40} color="bg-accent/30" />
        <FloatingShape className="top-[40%] left-[5%]" delay={3} size={35} color="bg-emerald-500/30" />
        <FloatingShape className="top-[55%] right-[7%]" delay={2} size={45} color="bg-amber-500/25" />
        <FloatingShape className="top-[70%] left-[12%]" delay={4} size={30} color="bg-violet-500/25" />
        <FloatingShape className="top-[85%] right-[15%]" delay={1} size={55} color="bg-primary/20" />

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
            <div className="relative mb-16 p-8 sm:p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-card/80 via-card/60 to-accent/5 backdrop-blur-sm overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-accent/20 rounded-br-3xl" />
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-accent/30" />
                </motion.div>
              </div>

              <div className="flex items-start gap-5 sm:gap-7 mb-7">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                  className={`flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${project.color} p-[3px] shadow-lg shadow-primary/20`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[21px] bg-background/90 backdrop-blur-sm">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground leading-tight"
                  >
                    {project.fullTitle}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="border border-primary/20 bg-primary/5 text-primary text-xs font-semibold px-3 py-1"
                    >
                      {t}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ KEY METRICS GRID ═══════════════════ */}
          <FadeInSection delay={200}>
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-accent" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Key Results at a Glance</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <MetricCard key={m} label={m} idx={idx} />
                ))}
              </div>
            </div>
          </FadeInSection>

          <SectionDivider variant="gradient" />

          {/* ═══════════════════ PROBLEM STATEMENT ═══════════════════ */}
          <FadeInSection delay={250}>
            <div className="mb-16 relative">
              <SectionHeader
                icon={AlertCircle}
                title="Problem Statement"
                subtitle="The challenge we set out to solve"
                color="text-destructive"
                bgColor="bg-destructive/10"
              />
              <div className="ml-0 sm:ml-14 relative">
                <div className="absolute -left-3 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-destructive/40 via-destructive/20 to-transparent hidden sm:block" />
                <p className="text-muted-foreground leading-relaxed text-base">{project.problemStatement}</p>
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ CHALLENGES ═══════════════════ */}
          <FadeInSection delay={300}>
            <div className="mb-16">
              <SectionHeader
                icon={AlertCircle}
                title="Key Challenges"
                subtitle="Obstacles encountered during the build"
                color="text-destructive"
                bgColor="bg-destructive/10"
              />
              <ChallengesGrid challenges={project.challenges} />
            </div>
          </FadeInSection>

          <SectionDivider variant="accent" />

          {/* ═══════════════════ PURPOSE & GOALS ═══════════════════ */}
          <FadeInSection delay={350}>
            <div className="mb-16">
              <SectionHeader
                icon={Target}
                title="Purpose & Goals"
                subtitle="What we aimed to achieve"
                color="text-primary"
                bgColor="bg-primary/10"
              />
              <div className="ml-0 sm:ml-14 p-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent">
                <p className="text-muted-foreground leading-relaxed text-base">{project.purpose}</p>
              </div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ ARCHITECTURE ═══════════════════ */}
          <FadeInSection delay={400}>
            <div className="mb-16">
              <SectionHeader
                icon={Layers}
                title="System Architecture"
                subtitle="How everything connects"
                color="text-primary"
                bgColor="bg-primary/10"
              />
              <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm p-6 sm:p-10 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
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
                color="text-primary"
                bgColor="bg-primary/10"
              />
              <div className="ml-0 sm:ml-14 space-y-4">
                {project.implementation.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, type: "spring", stiffness: 100 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 text-[10px] font-bold text-primary group-hover:from-primary/25 group-hover:to-accent/25 transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{step}</p>
                  </motion.div>
                ))}
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
                color="text-accent"
                bgColor="bg-accent/10"
              />
              <ProjectTimeline items={project.timeline} color={project.color} />
            </div>
          </FadeInSection>

          <SectionDivider variant="gradient" />

          {/* ═══════════════════ BEFORE VS AFTER ═══════════════════ */}
          <FadeInSection delay={550}>
            <div className="mb-16">
              <SectionHeader
                icon={ArrowLeftRight}
                title="Before vs After"
                subtitle="Measurable transformation"
                color="text-accent"
                bgColor="bg-accent/10"
              />
              <BeforeAfterTable items={project.beforeAfter} />
            </div>
          </FadeInSection>

          {/* ═══════════════════ IMPACT ═══════════════════ */}
          <FadeInSection delay={600}>
            <div className="mb-16 relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 p-8 sm:p-10">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-accent/10 blur-2xl" />
              <motion.div
                className="absolute top-6 right-6"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-4 w-4 text-accent/20" />
              </motion.div>

              <SectionHeader
                icon={TrendingUp}
                title="Impact & Results"
                subtitle="The bottom-line difference"
                color="text-primary"
                bgColor="bg-primary/20"
              />
              <div className="pl-0 sm:pl-14">
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-xl sm:text-2xl font-display font-bold text-primary mb-6"
                >
                  🚀 {project.impact.headline}
                </motion.p>
                <div className="space-y-3">
                  {project.impact.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{detail}</span>
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border-2 border-dashed border-primary/25 bg-gradient-to-br from-primary/8 via-accent/5 to-emerald-500/5 p-8 sm:p-10 overflow-hidden"
              >
                {/* Decorative corner dots */}
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary/40" />
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent/40" />
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-accent/40" />
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary/40" />

                <Quote className="h-10 w-10 text-primary/15 mb-4" />
                <p className="text-lg sm:text-xl font-display font-medium text-foreground leading-relaxed italic mb-6">
                  "{project.keyTakeaway}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                  <div className="flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Key Takeaway</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-accent/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </FadeInSection>

          <SectionDivider variant="accent" />

          {/* ═══════════════════ USE CASES ═══════════════════ */}
          <FadeInSection delay={700}>
            <div className="mb-16">
              <SectionHeader
                icon={Briefcase}
                title="Real Use Cases"
                subtitle="How this works in practice"
                color="text-accent"
                bgColor="bg-accent/10"
              />
              <div className="ml-0 sm:ml-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.useCases.map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-xl border border-accent/15 bg-accent/5 hover:bg-accent/8 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                        <ChevronRight className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">{useCase}</p>
                    </div>
                  </motion.div>
                ))}
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
                color="text-accent"
                bgColor="bg-accent/10"
              />
              <div className="ml-0 sm:ml-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.improvements.map((improvement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-card/50 hover:border-accent/20 transition-colors"
                  >
                    <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-accent/40 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
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
                color="text-primary"
                bgColor="bg-primary/10"
              />
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-lg shadow-primary/5"
                >
                  <div className="border-b border-border bg-gradient-to-r from-primary/10 to-accent/5 px-5 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {project.proofLabel}
                    </span>
                  </div>
                  <img
                    src={project.proofImage}
                    alt={`${project.fullTitle} - proof`}
                    className="w-full"
                    loading="lazy"
                  />
                </motion.div>
                {project.extraImages.map((img) => (
                  <motion.div
                    key={img.label}
                    whileHover={{ scale: 1.01 }}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                  >
                    <div className="border-b border-border bg-gradient-to-r from-accent/10 to-primary/5 px-5 py-3 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        📎 {img.label}
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
                className="group rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-5 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Previous Project
                </span>
                <p className="text-sm font-display font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                  {prevProject.fullTitle}
                </p>
              </Link>
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-5 transition-all hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 text-right"
              >
                <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  Next Project <ChevronRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-display font-bold text-foreground mt-2 group-hover:text-accent transition-colors">
                  {nextProject.fullTitle}
                </p>
              </Link>
            </div>
          </FadeInSection>

          {/* Back to portfolio CTA */}
          <FadeInSection delay={900}>
            <div className="text-center pt-10 border-t border-border/50">
              <Link to="/#projects">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary rounded-xl px-6">
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
