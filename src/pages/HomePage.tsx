import { lazy, Suspense } from "react";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import SkillsTicker from "@/components/SkillsTicker";

const Services = lazy(() => import("@/components/Services"));
const ProcessFlow = lazy(() => import("@/components/ProcessFlow"));
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const HomePage = () => (
  <PageLayout>
    <Hero />
    <TrustStats />
    <SkillsTicker />
    <Suspense fallback={<SectionFallback />}>
      <Services />
      <ProcessFlow />
      <FeaturedProjects />
    </Suspense>
  </PageLayout>
);

export default HomePage;
