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
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
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
  Heart,
  Award,
  Flame,
  Crown,
  Trophy,
  PartyPopper,
  Gem,
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

/* ─── Animated sticker ─── */
const Sticker = ({
  emoji,
  className,
  delay = 0,
  size = "text-2xl",
}: {
  emoji: string;
  className?: string;
  delay?: number;
  size?: string;
}) => (
  <motion.div
    className={`absolute pointer-events-none select-none ${className}`}
    animate={{
      y: [0, -8, 0],
      rotate: [0, 6, -6, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <span className={`${size} drop-shadow-lg`}>{emoji}</span>
  </motion.div>
);

/* ─── Colorful blob ─── */
const ColorBlob = ({
  className,
  color,
  size = 200,
}: {
  className?: string;
  color: string;
  size?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none rounded-full ${className}`}
    style={{ width: size, height: size }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className={`w-full h-full rounded-full ${color} blur-3xl`} />
  </motion.div>
);

/* ─── Animated metric card with vivid colors ─── */
const MetricCard = ({ label, idx }: { label: string; idx: number }) => {
  const colorSets = [
    { bg: "from-emerald-400/25 to-teal-500/20", border: "border-emerald-400/40", icon: "text-emerald-500", glow: "shadow-emerald-500/20" },
    { bg: "from-amber-400/25 to-orange-500/20", border: "border-amber-400/40", icon: "text-amber-500", glow: "shadow-amber-500/20" },
    { bg: "from-violet-400/25 to-purple-500/20", border: "border-violet-400/40", icon: "text-violet-500", glow: "shadow-violet-500/20" },
    { bg: "from-rose-400/25 to-pink-500/20", border: "border-rose-400/40", icon: "text-rose-500", glow: "shadow-rose-500/20" },
    { bg: "from-cyan-400/25 to-blue-500/20", border: "border-cyan-400/40", icon: "text-cyan-500", glow: "shadow-cyan-500/20" },
  ];
  const emojis = ["🎯", "⚡", "🌟", "📈", "🔥"];
  const icons = [CheckCircle2, Zap, Star, TrendingUp, Flame];
  const IconComp = icons[idx % icons.length];
  const c = colorSets[idx % colorSets.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.85, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.12, type: "spring", stiffness: 120, damping: 12 }}
      whileHover={{ y: -6, scale: 1.05, rotate: 1 }}
      className={`relative overflow-hidden rounded-2xl border-2 ${c.border} bg-gradient-to-br ${c.bg} p-5 backdrop-blur-sm shadow-lg ${c.glow} cursor-default`}
    >
      <div className="absolute -top-3 -right-3 text-3xl opacity-20 rotate-12">{emojis[idx % emojis.length]}</div>
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/70 backdrop-blur-sm shadow-sm`}>
          <IconComp className={`h-5 w-5 ${c.icon}`} />
        </div>
        <span className="text-sm font-bold text-foreground leading-snug">{label}</span>
      </div>
    </motion.div>
  );
};

/* ─── Section header with emoji and gradient ─── */
const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  emoji,
  gradientFrom,
  gradientTo,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <motion.div
        whileHover={{ rotate: 15, scale: 1.15 }}
        className={`relative p-3.5 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-md`}
      >
        <Icon className="h-5 w-5 text-white" />
        <span className="absolute -top-2 -right-2 text-lg">{emoji}</span>
      </motion.div>
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className={`ml-16 h-1.5 w-24 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-60`} />
  </div>
);

/* ─── Fun divider with emoji ─── */
const FunDivider = ({ emoji = "✨" }: { emoji?: string }) => (
  <div className="relative my-20 flex items-center justify-center">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <motion.div
      className="absolute flex items-center justify-center bg-background px-4"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-2xl">{emoji}</span>
    </motion.div>
  </div>
);

/* ─── Tech badge with real logo ─── */
const TechBadge = ({ name, idx }: { name: string; idx: number }) => {
  const logo = getTechLogo(name);
  const colors = [
    "border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20",
    "border-amber-400/30 bg-amber-500/10 hover:bg-amber-500/20",
    "border-violet-400/30 bg-violet-500/10 hover:bg-violet-500/20",
    "border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20",
    "border-rose-400/30 bg-rose-500/10 hover:bg-rose-500/20",
    "border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.5 + idx * 0.07, type: "spring", stiffness: 150 }}
      whileHover={{ scale: 1.12, rotate: 3, y: -3 }}
      className={`inline-flex items-center gap-2 rounded-xl border-2 ${colors[idx % colors.length]} px-3.5 py-2 cursor-default transition-colors`}
    >
      {logo && <img src={logo} alt={name} className="h-4 w-4" />}
      <span className="text-xs font-bold text-foreground">{name}</span>
    </motion.div>
  );
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  if (!project) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🔍</span>
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
      <div ref={containerRef} className="dark-section relative min-h-screen overflow-hidden">
        {/* ─── Vivid background blobs ─── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div style={{ y: parallaxY }}>
            <ColorBlob className="top-0 -left-20" color="bg-emerald-500/30" size={500} />
            <ColorBlob className="top-[25%] -right-10" color="bg-amber-500/20" size={400} />
            <ColorBlob className="top-[50%] left-[15%]" color="bg-violet-500/15" size={450} />
            <ColorBlob className="top-[70%] right-[10%]" color="bg-rose-500/15" size={350} />
            <ColorBlob className="bottom-0 left-1/3" color="bg-cyan-500/15" size={400} />
          </motion.div>
        </div>

        {/* ─── Floating stickers ─── */}
        <Sticker emoji="🚀" className="top-28 left-[5%]" delay={0} size="text-3xl" />
        <Sticker emoji="💡" className="top-[18%] right-[8%]" delay={1.2} size="text-2xl" />
        <Sticker emoji="⚡" className="top-[32%] left-[3%]" delay={2.5} size="text-2xl" />
        <Sticker emoji="🎯" className="top-[45%] right-[5%]" delay={0.8} size="text-3xl" />
        <Sticker emoji="🔧" className="top-[58%] left-[7%]" delay={3} size="text-xl" />
        <Sticker emoji="✨" className="top-[72%] right-[12%]" delay={1.5} size="text-2xl" />
        <Sticker emoji="🏆" className="top-[85%] left-[10%]" delay={2} size="text-2xl" />
        <Sticker emoji="💎" className="top-[15%] left-[85%]" delay={3.5} size="text-xl" />

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
            <div className="relative mb-16 p-8 sm:p-10 rounded-3xl border-2 border-primary/25 bg-gradient-to-br from-card/90 via-card/70 to-accent/10 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/10">
              {/* Decorative corner stickers */}
              <span className="absolute top-4 right-4 text-3xl opacity-30 rotate-12">🌿</span>
              <span className="absolute bottom-4 left-4 text-2xl opacity-25 -rotate-12">🍃</span>

              {/* Gradient border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/5 to-emerald-500/10 opacity-50" />

              <div className="relative flex items-start gap-5 sm:gap-7 mb-7">
                <motion.div
                  initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                  className={`relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${project.color} p-[3px] shadow-xl shadow-primary/25`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[21px] bg-background/90 backdrop-blur-sm">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                  </div>
                  <motion.span
                    className="absolute -top-3 -right-3 text-xl"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚡
                  </motion.span>
                </motion.div>
                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-foreground leading-tight"
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

              {/* Tech badges with real logos */}
              <div className="relative flex flex-wrap gap-2.5">
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
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🏅
                </motion.span>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-primary">Key Results at a Glance</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <MetricCard key={m} label={m} idx={idx} />
                ))}
              </div>
            </div>
          </FadeInSection>

          <FunDivider emoji="🎨" />

          {/* ═══════════════════ PROBLEM STATEMENT ═══════════════════ */}
          <FadeInSection delay={250}>
            <div className="mb-16">
              <SectionHeader
                icon={AlertCircle}
                title="Problem Statement"
                subtitle="The challenge we set out to solve"
                emoji="🔴"
                gradientFrom="from-red-500"
                gradientTo="to-orange-500"
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative ml-0 sm:ml-16 p-6 rounded-2xl border-2 border-red-400/20 bg-gradient-to-br from-red-500/8 to-orange-500/5 backdrop-blur-sm"
              >
                <span className="absolute -top-3 -left-3 text-2xl">😰</span>
                <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-gradient-to-b from-red-400 to-orange-400" />
                <p className="text-muted-foreground leading-relaxed text-base pl-4">{project.problemStatement}</p>
              </motion.div>
            </div>
          </FadeInSection>

          {/* ═══════════════════ CHALLENGES ═══════════════════ */}
          <FadeInSection delay={300}>
            <div className="mb-16">
              <SectionHeader
                icon={Flame}
                title="Key Challenges"
                subtitle="Obstacles encountered during the build"
                emoji="🧗"
                gradientFrom="from-orange-500"
                gradientTo="to-amber-500"
              />
              <ChallengesGrid challenges={project.challenges} />
            </div>
          </FadeInSection>

          <FunDivider emoji="💪" />

          {/* ═══════════════════ PURPOSE & GOALS ═══════════════════ */}
          <FadeInSection delay={350}>
            <div className="mb-16">
              <SectionHeader
                icon={Target}
                title="Purpose & Goals"
                subtitle="What we aimed to achieve"
                emoji="🎯"
                gradientFrom="from-emerald-500"
                gradientTo="to-teal-500"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative ml-0 sm:ml-16 p-6 rounded-2xl border-2 border-emerald-400/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5"
              >
                <span className="absolute -top-3 right-4 text-2xl">🎯</span>
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
                emoji="🏗️"
                gradientFrom="from-violet-500"
                gradientTo="to-purple-500"
              />
              <div className="relative rounded-3xl border-2 border-violet-400/20 bg-gradient-to-br from-violet-500/8 via-card/80 to-purple-500/5 backdrop-blur-sm p-6 sm:p-10 overflow-hidden">
                <span className="absolute top-4 right-4 text-3xl opacity-20">🔗</span>
                <span className="absolute bottom-4 left-4 text-2xl opacity-15">⚙️</span>
                <ArchitectureDiagram steps={project.architectureSteps} color={project.color} />
              </div>
            </div>
          </FadeInSection>

          <FunDivider emoji="🔨" />

          {/* ═══════════════════ IMPLEMENTATION ═══════════════════ */}
          <FadeInSection delay={450}>
            <div className="mb-16">
              <SectionHeader
                icon={Wrench}
                title="Implementation Details"
                subtitle="Step-by-step technical breakdown"
                emoji="🛠️"
                gradientFrom="from-blue-500"
                gradientTo="to-cyan-500"
              />
              <div className="ml-0 sm:ml-16 space-y-4">
                {project.implementation.map((step, idx) => {
                  const stepColors = [
                    "border-blue-400/30 bg-blue-500/8",
                    "border-cyan-400/30 bg-cyan-500/8",
                    "border-teal-400/30 bg-teal-500/8",
                    "border-indigo-400/30 bg-indigo-500/8",
                    "border-sky-400/30 bg-sky-500/8",
                    "border-violet-400/30 bg-violet-500/8",
                  ];
                  const stepEmojis = ["📌", "🔧", "⚙️", "🔗", "📊", "🎛️"];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -25, rotate: -1 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 100 }}
                      whileHover={{ x: 6, scale: 1.01 }}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 ${stepColors[idx % stepColors.length]} transition-all cursor-default`}
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-lg">{stepEmojis[idx % stepEmojis.length]}</span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold text-white shadow-sm">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
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
                emoji="📅"
                gradientFrom="from-amber-500"
                gradientTo="to-yellow-500"
              />
              <ProjectTimeline items={project.timeline} color={project.color} />
            </div>
          </FadeInSection>

          <FunDivider emoji="📊" />

          {/* ═══════════════════ BEFORE VS AFTER ═══════════════════ */}
          <FadeInSection delay={550}>
            <div className="mb-16">
              <SectionHeader
                icon={ArrowLeftRight}
                title="Before vs After"
                subtitle="Measurable transformation"
                emoji="🔄"
                gradientFrom="from-teal-500"
                gradientTo="to-emerald-500"
              />
              <BeforeAfterTable items={project.beforeAfter} />
            </div>
          </FadeInSection>

          {/* ═══════════════════ IMPACT ═══════════════════ */}
          <FadeInSection delay={600}>
            <div className="relative mb-16 overflow-hidden rounded-3xl border-2 border-emerald-400/30 bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-cyan-500/12 p-8 sm:p-10 shadow-xl shadow-emerald-500/10">
              {/* Fun background emojis */}
              <span className="absolute top-4 right-6 text-4xl opacity-15">🚀</span>
              <span className="absolute bottom-6 left-6 text-3xl opacity-15">📈</span>
              <motion.span
                className="absolute top-6 right-20 text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.span>

              <SectionHeader
                icon={Trophy}
                title="Impact & Results"
                subtitle="The bottom-line difference"
                emoji="🏆"
                gradientFrom="from-emerald-500"
                gradientTo="to-green-500"
              />
              <div className="pl-0 sm:pl-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/15 border-2 border-emerald-400/30 px-6 py-3 mb-6 shadow-sm"
                >
                  <span className="text-2xl">🚀</span>
                  <p className="text-xl sm:text-2xl font-display font-extrabold text-foreground">
                    {project.impact.headline}
                  </p>
                </motion.div>
                <div className="space-y-3">
                  {project.impact.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, type: "spring" }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-500/5 transition-colors"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/20 shadow-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
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
                initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border-2 border-amber-400/30 bg-gradient-to-br from-amber-500/12 via-yellow-500/8 to-orange-500/10 p-8 sm:p-10 overflow-hidden shadow-xl shadow-amber-500/10"
              >
                {/* Corner emojis */}
                <span className="absolute top-4 left-4 text-2xl">💡</span>
                <span className="absolute top-4 right-4 text-2xl opacity-40">🧠</span>
                <span className="absolute bottom-4 left-4 text-xl opacity-30">📝</span>
                <span className="absolute bottom-4 right-4 text-2xl opacity-40">💭</span>

                <div className="relative">
                  <Quote className="h-12 w-12 text-amber-500/25 mb-4" />
                  <p className="text-lg sm:text-xl font-display font-bold text-foreground leading-relaxed italic mb-6">
                    "{project.keyTakeaway}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
                    <div className="flex items-center gap-2 bg-amber-500/15 rounded-full px-5 py-2 border border-amber-400/25">
                      <span className="text-base">💡</span>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">Key Takeaway</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-amber-400/30 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>

          <FunDivider emoji="💼" />

          {/* ═══════════════════ USE CASES ═══════════════════ */}
          <FadeInSection delay={700}>
            <div className="mb-16">
              <SectionHeader
                icon={Briefcase}
                title="Real Use Cases"
                subtitle="How this works in practice"
                emoji="💼"
                gradientFrom="from-indigo-500"
                gradientTo="to-blue-500"
              />
              <div className="ml-0 sm:ml-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.useCases.map((useCase, idx) => {
                  const caseEmojis = ["📋", "🎫", "📊", "📅", "🔍", "💬"];
                  const caseColors = [
                    "border-indigo-400/25 bg-indigo-500/8 hover:bg-indigo-500/15",
                    "border-blue-400/25 bg-blue-500/8 hover:bg-blue-500/15",
                    "border-violet-400/25 bg-violet-500/8 hover:bg-violet-500/15",
                    "border-sky-400/25 bg-sky-500/8 hover:bg-sky-500/15",
                  ];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15, rotate: idx % 2 === 0 ? -1 : 1 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, type: "spring" }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`p-5 rounded-xl border-2 ${caseColors[idx % caseColors.length]} transition-all cursor-default`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg shrink-0">{caseEmojis[idx % caseEmojis.length]}</span>
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
                emoji="🚀"
                gradientFrom="from-rose-500"
                gradientTo="to-pink-500"
              />
              <div className="ml-0 sm:ml-16 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.improvements.map((improvement, idx) => {
                  const impEmojis = ["🔮", "🎯", "⚡", "🌐", "🤖", "📱"];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-3 p-4 rounded-xl border-2 border-rose-400/20 bg-rose-500/5 hover:bg-rose-500/10 transition-all cursor-default"
                    >
                      <span className="text-base shrink-0">{impEmojis[idx % impEmojis.length]}</span>
                      <p className="text-muted-foreground leading-relaxed text-sm">{improvement}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeInSection>

          <FunDivider emoji="📸" />

          {/* ═══════════════════ SCREENSHOTS ═══════════════════ */}
          <FadeInSection delay={800}>
            <div className="mb-16">
              <SectionHeader
                icon={Sparkles}
                title="Screenshots & Proof"
                subtitle="See it in action"
                emoji="📸"
                gradientFrom="from-primary"
                gradientTo="to-accent"
              />
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="overflow-hidden rounded-2xl border-2 border-primary/25 bg-card shadow-xl shadow-primary/10"
                >
                  <div className="border-b border-border bg-gradient-to-r from-primary/15 to-accent/10 px-5 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                      {project.proofLabel}
                    </span>
                  </div>
                  <img src={project.proofImage} alt={`${project.fullTitle} - proof`} className="w-full" loading="lazy" />
                </motion.div>
                {project.extraImages.map((img) => (
                  <motion.div
                    key={img.label}
                    whileHover={{ scale: 1.01 }}
                    className="overflow-hidden rounded-2xl border-2 border-accent/20 bg-card shadow-lg"
                  >
                    <div className="border-b border-border bg-gradient-to-r from-accent/15 to-primary/10 px-5 py-3 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-accent">
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
                className="group rounded-2xl border-2 border-border bg-gradient-to-br from-card to-card/80 p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-2">
                  <ArrowLeft className="h-3 w-3" /> Previous Project
                </span>
                <p className="text-sm font-display font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                  ← {prevProject.fullTitle}
                </p>
              </Link>
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group rounded-2xl border-2 border-border bg-gradient-to-br from-card to-card/80 p-5 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 text-right"
              >
                <span className="text-xs text-muted-foreground flex items-center justify-end gap-2">
                  Next Project <ChevronRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-display font-bold text-foreground mt-2 group-hover:text-accent transition-colors">
                  {nextProject.fullTitle} →
                </p>
              </Link>
            </div>
          </FadeInSection>

          {/* Back to portfolio CTA */}
          <FadeInSection delay={900}>
            <div className="text-center pt-10 border-t border-border/50">
              <Link to="/#projects">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary rounded-xl px-8 py-5 text-base font-bold">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Projects ✨
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
