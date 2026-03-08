import PageLayout from "@/components/PageLayout";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";

const CertificationsPage = () => (
  <PageLayout>
    <div className="pt-24">
      <Certifications />
      <Education />
    </div>
  </PageLayout>
);

export default CertificationsPage;
