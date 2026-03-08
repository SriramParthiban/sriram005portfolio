import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { blogPosts } from "@/data/blogData";

const categoryColors: Record<string, string> = {
  Automation: "bg-[hsl(270,70%,50%/0.15)] text-[hsl(270,70%,65%)] border-[hsl(270,70%,50%/0.3)]",
  "Data Analytics": "bg-[hsl(185,65%,45%/0.15)] text-[hsl(185,65%,60%)] border-[hsl(185,65%,45%/0.3)]",
  "GHL & CRM": "bg-[hsl(145,65%,42%/0.15)] text-[hsl(145,65%,55%)] border-[hsl(145,65%,42%/0.3)]",
  "AI & Automation": "bg-[hsl(35,90%,50%/0.15)] text-[hsl(35,90%,60%)] border-[hsl(35,90%,50%/0.3)]",
};

const Blog = () => (
  <section id="blog" className="relative py-24 sm:py-32">
    {/* Decorative glow */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
    </div>

    <div className="mx-auto max-w-5xl px-6 relative z-10">
      <FadeInSection>
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Insights & Articles</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          Blog
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Deep dives into automation, data analytics, and the tools I use to build intelligent systems.
        </p>
      </FadeInSection>

      <div className="grid gap-5 sm:grid-cols-2">
        {blogPosts.map((post, i) => (
          <FadeInSection key={post.slug} delay={i * 100}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block h-full bg-[hsl(0_0%_6%)] border border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${categoryColors[post.category] || "bg-white/5 text-white/60 border-white/10"}`}>
                  {post.category}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <time className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
