import { useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import SkillsTicker from "@/components/SkillsTicker";
import LazyVisible from "@/components/LazyVisible";

// Each lazy import becomes its own JS chunk, downloaded only when its
// LazyVisible wrapper scrolls near the viewport.
const Services = lazy(() => import("@/components/Services"));
const ProcessFlow = lazy(() => import("@/components/ProcessFlow"));
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
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

        <LazyVisible minHeight={600}><Services /></LazyVisible>
        <LazyVisible minHeight={600}><ProcessFlow /></LazyVisible>
        <LazyVisible minHeight={600}><FeaturedProjects /></LazyVisible>
        <LazyVisible minHeight={500}><About /></LazyVisible>
        <LazyVisible minHeight={500}><Experience /></LazyVisible>
        <div className="py-10 sm:py-14" />
        <LazyVisible minHeight={600}><Projects /></LazyVisible>
        <LazyVisible minHeight={500}><Testimonials /></LazyVisible>
        <LazyVisible minHeight={500}><Skills /></LazyVisible>
        <LazyVisible minHeight={500}><Playground /></LazyVisible>
        <LazyVisible minHeight={400}><TechStack /></LazyVisible>
        <LazyVisible minHeight={400}><Education /></LazyVisible>
        <LazyVisible minHeight={400}><Certifications /></LazyVisible>
        <LazyVisible minHeight={500}><GitHubRepos /></LazyVisible>
        <LazyVisible minHeight={600}><Contact /></LazyVisible>
        <LazyVisible minHeight={200}><QuoteStrip /></LazyVisible>
        <LazyVisible minHeight={300}><FinalCTA /></LazyVisible>
      </main>

      <LazyVisible minHeight={300}><Footer /></LazyVisible>
      <LazyVisible minHeight={0} rootMargin="0px"><StickyMobileCTA /></LazyVisible>
      <LazyVisible minHeight={0} rootMargin="0px"><ChatWidget /></LazyVisible>
    </div>
  );
};

export default Index;
