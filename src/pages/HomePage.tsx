import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import SkillsTicker from "@/components/SkillsTicker";

const HomePage = () => (
  <PageLayout>
    <Hero />
    <TrustStats />
    <SkillsTicker />
  </PageLayout>
);

export default HomePage;
