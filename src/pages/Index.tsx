import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import SkillsTicker from "@/components/SkillsTicker";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import GitHubRepos from "@/components/GitHubRepos";
import BookingCalendar from "@/components/BookingCalendar";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => (
  <div className="overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <TrustStats />
      <SkillsTicker />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <GitHubRepos />
      <BookingCalendar />
      <Contact />
      <FinalCTA />
    </main>
    <Footer />
    <StickyMobileCTA />
  </div>
);

export default Index;
