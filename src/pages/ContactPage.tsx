import PageLayout from "@/components/PageLayout";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const ContactPage = () => (
  <PageLayout>
    <div className="pt-24">
      <Contact />
      <FinalCTA />
    </div>
    <StickyMobileCTA />
  </PageLayout>
);

export default ContactPage;
