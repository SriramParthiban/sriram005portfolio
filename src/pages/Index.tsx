import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import SkillsTicker from "@/components/SkillsTicker";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Playground from "@/components/Playground";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import GitHubRepos from "@/components/GitHubRepos";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";


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
      <About />
      
      <Experience />
      <Projects />
      <Testimonials />
      <Skills />
      
      <Playground />
      <TechStack />
      <Education />
      <Certifications />
      <GitHubRepos />
      <Contact />
      <FinalCTA />
    </main>
    <Footer />
    <StickyMobileCTA />
    <ChatWidget />
  </div>
  );
};

export default Index;
