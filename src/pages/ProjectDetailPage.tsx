import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projectsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import PageLayout from "@/components/PageLayout";
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
} from "lucide-react";

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

  const sections = [
    {
      id: "problem",
      icon: AlertCircle,
      title: "Problem Statement",
      content: project.problemStatement,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      id: "purpose",
      icon: Target,
      title: "Purpose & Goals",
      content: project.purpose,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <PageLayout>
      <div className="dark-section relative min-h-screen">
        {/* Background effects - matching main page theme */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
          <div className="absolute top-[40%] -right-20 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-primary/6 blur-[140px]" />
        </div>
        {/* Grid overlay */}
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
            <div className="mb-12">
              {/* Icon and title */}
              <div className="flex items-start gap-4 sm:gap-6 mb-6">
                <div
                  className={`flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.color} p-[2px]`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-background">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                    {project.fullTitle}
                  </h1>
                  <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="border border-white/10 bg-white/5 text-muted-foreground text-xs font-medium"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Key metrics highlight */}
          <FadeInSection delay={200}>
            <div className="mb-12 p-6 rounded-2xl border border-accent/20 bg-accent/5">
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

          {/* Problem & Purpose sections */}
          {sections.map((section, idx) => (
            <FadeInSection key={section.id} delay={300 + idx * 100}>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${section.bgColor}`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                    {section.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-12">
                  {section.content}
                </p>
              </div>
            </FadeInSection>
          ))}

          {/* Implementation */}
          <FadeInSection delay={500}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Wrench className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                  Implementation
                </h2>
              </div>
              <div className="pl-12 space-y-3">
                {project.implementation.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-purple-400 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Impact */}
          <FadeInSection delay={600}>
            <div className="mb-10 p-6 rounded-2xl border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                  Impact & Results
                </h2>
              </div>
              <div className="pl-0 sm:pl-12">
                <p className="text-lg sm:text-xl font-bold text-primary mb-4">
                  {project.impact.headline}
                </p>
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

          {/* Use Cases */}
          <FadeInSection delay={700}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Briefcase className="h-5 w-5 text-orange-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                  Real Use Cases
                </h2>
              </div>
              <div className="pl-12 space-y-3">
                {project.useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 text-orange-400 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Improvements */}
          <FadeInSection delay={800}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Rocket className="h-5 w-5 text-green-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                  Possible Improvements
                </h2>
              </div>
              <div className="pl-12 space-y-3">
                {project.improvements.map((improvement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Screenshots */}
          <FadeInSection delay={900}>
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6">
                Screenshots & Proof
              </h2>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="border-b border-white/10 bg-accent/5 px-4 py-2">
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
                  <div
                    key={img.label}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                    <div className="border-b border-white/10 bg-primary/5 px-4 py-2">
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

          {/* Back to portfolio CTA */}
          <FadeInSection delay={1000}>
            <div className="text-center pt-8 border-t border-white/10">
              <Link to="/#projects">
                <Button
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                >
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
