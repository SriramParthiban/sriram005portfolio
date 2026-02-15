import FadeInSection from "./FadeInSection";

const About = () => (
  <section id="about" className="px-6 py-28">
    <div className="mx-auto max-w-3xl">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">About</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">About Me</h2>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="mt-8 space-y-5 text-base leading-[1.8] text-muted-foreground">
          <p>
            I architect intelligent automation systems at the intersection of <strong className="text-foreground font-medium">AI, revenue operations, and go-to-market strategy</strong>. My work focuses on designing scalable outbound and qualification frameworks powered by AI agents—translating prospect signals into pipeline-ready opportunities with minimal manual overhead.
          </p>
          <p>
            With hands-on experience building systems that manage <strong className="text-foreground font-medium">1,000+ daily interactions</strong>, I bring a deep understanding of workflow orchestration, CRM integration, and data-driven decision-making. I've designed KPI tracking engines, lead routing architectures, and spend monitoring systems that have prevented over <strong className="text-foreground font-medium">$40,000</strong> in unnecessary costs.
          </p>
          <p>
            My approach is rooted in experimentation and cross-functional collaboration. I build feedback loops between sales, marketing, and operations teams—ensuring every automation decision is backed by real performance data.
          </p>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default About;
