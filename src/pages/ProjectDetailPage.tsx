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
import { motion } from "framer-motion";
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
} from "lucide-react";

const SectionHeader = ({
  icon: Icon,
  title,
  color,
  bgColor,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  bgColor: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div className={`p-2.5 rounded-xl ${bgColor}`}>
      <Icon className={`h-5 w-5 ${color}`} />
    </div>
    <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">{title}</h2>
  </div>
);

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

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
      <div className="dark-section relative min-h-screen">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
          <div className="absolute top-[40%] -right-20 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-primary/6 blur-[140px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
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

          {/* Hero section */}
          <FadeInSection delay={100}>
            <div className="mb-14">
              <div className="flex items-start gap-4 sm:gap-6 mb-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={`flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.color} p-[2px]`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-background">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                    {project.fullTitle}
                  </h1>
                  <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="border border-border bg-muted text-muted-foreground text-xs font-medium"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Key metrics highlight */}
          <FadeInSection delay={200}>
            <div className="mb-14 p-6 rounded-2xl border border-accent/20 bg-accent/5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Key Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.metrics.map((m) => (
                  <div key={m} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Problem Statement */}
          <FadeInSection delay={250}>
            <div className="mb-14">
              <SectionHeader icon={AlertCircle} title="Problem Statement" color="text-destructive" bgColor="bg-destructive/10" />
              <p className="text-muted-foreground leading-relaxed pl-0 sm:pl-14">{project.problemStatement}</p>
            </div>
          </FadeInSection>

          {/* Challenges Grid */}
          <FadeInSection delay={300}>
            <div className="mb-14">
              <SectionHeader icon={AlertCircle} title="Key Challenges" color="text-destructive" bgColor="bg-destructive/10" />
              <ChallengesGrid challenges={project.challenges} />
            </div>
          </FadeInSection>

          {/* Purpose & Goals */}
          <FadeInSection delay={350}>
            <div className="mb-14">
              <SectionHeader icon={Target} title="Purpose & Goals" color="text-primary" bgColor="bg-primary/10" />
              <p className="text-muted-foreground leading-relaxed pl-0 sm:pl-14">{project.purpose}</p>
            </div>
          </FadeInSection>

          {/* Architecture Diagram */}
          <FadeInSection delay={400}>
            <div className="mb-14">
              <SectionHeader icon={Layers} title="System Architecture" color="text-primary" bgColor="bg-primary/10" />
              <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
                <ArchitectureDiagram steps={project.architectureSteps} color={project.color} />
              </div>
            </div>
          </FadeInSection>

          {/* Implementation */}
          <FadeInSection delay={450}>
            <div className="mb-14">
              <SectionHeader icon={Wrench} title="Implementation Details" color="text-primary" bgColor="bg-primary/10" />
              <div className="space-y-3 pl-0 sm:pl-14">
                {project.implementation.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <p className="text-muted-foreground leading-relaxed text-sm">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Project Timeline */}
          <FadeInSection delay={500}>
            <div className="mb-14">
              <SectionHeader icon={Calendar} title="Project Timeline" color="text-accent" bgColor="bg-accent/10" />
              <ProjectTimeline items={project.timeline} color={project.color} />
            </div>
          </FadeInSection>

          {/* Before vs After */}
          <FadeInSection delay={550}>
            <div className="mb-14">
              <SectionHeader icon={ArrowLeftRight} title="Before vs After" color="text-accent" bgColor="bg-accent/10" />
              <BeforeAfterTable items={project.beforeAfter} />
            </div>
          </FadeInSection>

          {/* Impact */}
          <FadeInSection delay={600}>
            <div className="mb-14 p-6 rounded-2xl border border-primary/20 bg-primary/5">
              <SectionHeader icon={TrendingUp} title="Impact & Results" color="text-primary" bgColor="bg-primary/20" />
              <div className="pl-0 sm:pl-14">
                <p className="text-lg sm:text-xl font-bold text-primary mb-4">{project.impact.headline}</p>
                <div className="space-y-2">
                  {project.impact.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Key Takeaway Quote */}
          <FadeInSection delay={650}>
            <div className="mb-14">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8"
              >
                <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/15" />
                <div className="pl-6 sm:pl-8">
                  <p className="text-base sm:text-lg font-display font-medium text-foreground leading-relaxed italic">
                    "{project.keyTakeaway}"
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">Key Takeaway</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>

          {/* Use Cases */}
          <FadeInSection delay={700}>
            <div className="mb-14">
              <SectionHeader icon={Briefcase} title="Real Use Cases" color="text-accent" bgColor="bg-accent/10" />
              <div className="pl-0 sm:pl-14 space-y-3">
                {project.useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    <p className="text-muted-foreground leading-relaxed text-sm">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Improvements */}
          <FadeInSection delay={750}>
            <div className="mb-14">
              <SectionHeader icon={Rocket} title="Possible Improvements" color="text-accent" bgColor="bg-accent/10" />
              <div className="pl-0 sm:pl-14 space-y-3">
                {project.improvements.map((improvement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                    <p className="text-muted-foreground leading-relaxed text-sm">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Screenshots */}
          <FadeInSection delay={800}>
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6">
                Screenshots & Proof
              </h2>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="border-b border-border bg-accent/5 px-4 py-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {project.proofLabel}
                    </span>
                  </div>
                  <img
                    src={project.proofImage}
                    alt={`${project.fullTitle} - proof`}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                {project.extraImages.map((img) => (
                  <div key={img.label} className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="border-b border-border bg-primary/5 px-4 py-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        📎 {img.label}
                      </span>
                    </div>
                    <img src={img.src} alt={img.label} className="w-full" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Navigation between projects */}
          <FadeInSection delay={850}>
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-xs text-muted-foreground">← Previous Project</span>
                <p className="text-sm font-display font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {prevProject.fullTitle}
                </p>
              </Link>
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm text-right"
              >
                <span className="text-xs text-muted-foreground">Next Project →</span>
                <p className="text-sm font-display font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {nextProject.fullTitle}
                </p>
              </Link>
            </div>
          </FadeInSection>

          {/* Back to portfolio CTA */}
          <FadeInSection delay={900}>
            <div className="text-center pt-8 border-t border-border">
              <Link to="/#projects">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary">
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
