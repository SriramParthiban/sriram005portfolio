import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import SkillsTicker from "@/components/SkillsTicker";

// Lazy-load everything below the fold
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Skills = lazy(() => import("@/components/Skills"));
const TechStack = lazy(() => import("@/components/TechStack"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Playground = lazy(() => import("@/components/Playground"));
const Education = lazy(() => import("@/components/Education"));
const Certifications = lazy(() => import("@/components/Certifications"));
const GitHubRepos = lazy(() => import("@/components/GitHubRepos"));
const Contact = lazy(() => import("@/components/Contact"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));

const QuoteStrip = lazy(() => import("@/components/QuoteStrip"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyMobileCTA = lazy(() => import("@/components/StickyMobileCTA"));
const ChatWidget = lazy(() => import("@/components/ChatWidget"));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
  <div className="overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <TrustStats />
      <SkillsTicker />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Experience />
        <div className="py-10 sm:py-14" />
        <Projects />
        <Testimonials />
        <Skills />
        <Playground />
        <TechStack />
        <Education />
        <Certifications />
        <GitHubRepos />
        <Contact />
        <QuoteStrip />
        <FinalCTA />
        
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
      <StickyMobileCTA />
      <ChatWidget />
    </Suspense>
  </div>
  );
};

export default Index;
