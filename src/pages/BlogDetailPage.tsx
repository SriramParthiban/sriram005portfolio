import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "@/data/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const categoryColors: Record<string, string> = {
  Automation: "bg-[hsl(270,70%,50%/0.15)] text-[hsl(270,70%,65%)] border-[hsl(270,70%,50%/0.3)]",
  "Data Analytics": "bg-[hsl(185,65%,45%/0.15)] text-[hsl(185,65%,60%)] border-[hsl(185,65%,45%/0.3)]",
  "GHL & CRM": "bg-[hsl(145,65%,42%/0.15)] text-[hsl(145,65%,55%)] border-[hsl(145,65%,42%/0.3)]",
  "AI & Automation": "bg-[hsl(35,90%,50%/0.15)] text-[hsl(35,90%,60%)] border-[hsl(35,90%,50%/0.3)]",
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
          <Link to="/#blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Find related posts (same category, different slug)
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const otherPosts = related.length > 0 ? related : blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Decorative background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(185,50%,40%/0.03)] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/#blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${categoryColors[post.category] || "bg-white/5 text-white/60 border-white/10"}`}>
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-2">
              {post.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              {post.excerpt}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/[0.06]
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:my-4
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
              prose-pre:bg-[hsl(270,10%,8%)] prose-pre:border prose-pre:border-white/[0.06] prose-pre:rounded-xl prose-pre:my-6
              prose-li:text-muted-foreground prose-li:my-1.5 prose-li:leading-[1.8]
              prose-ul:my-4 prose-ol:my-4
              prose-table:my-6 prose-table:text-sm prose-table:rounded-xl prose-table:overflow-hidden
              prose-thead:bg-[hsl(270,15%,12%)]
              prose-th:text-foreground prose-th:border-[hsl(270,15%,18%)] prose-th:py-3 prose-th:px-4 prose-th:text-left prose-th:font-semibold
              prose-td:text-muted-foreground prose-td:border-[hsl(270,15%,15%)] prose-td:py-3 prose-td:px-4
              prose-tr:border-[hsl(270,15%,15%)]
              prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-[hsl(270,20%,10%)] prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:my-6 prose-blockquote:not-italic
              [&_blockquote_p]:text-foreground/80 [&_blockquote_p]:text-[15px] [&_blockquote_p]:my-1
              [&_blockquote_strong]:text-primary
              prose-hr:border-white/[0.06] prose-hr:my-10
              [&_table]:border [&_table]:border-[hsl(270,15%,15%)] [&_table]:rounded-xl
            "
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.article>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-6 rounded-2xl bg-[hsl(0_0%_6%)] border border-white/[0.06]"
          >
            <p className="text-xs text-muted-foreground mb-1">Written by</p>
            <p className="text-foreground font-semibold">Sriram Parthiban</p>
            <p className="text-sm text-muted-foreground">AI Automation & n8n Developer</p>
          </motion.div>

          {/* Related posts */}
          {otherPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-semibold text-foreground mb-6">More Articles</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group block bg-[hsl(0_0%_6%)] border border-white/[0.06] rounded-xl p-5 hover:border-primary/30 transition-all duration-300"
                  >
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${categoryColors[p.category] || "bg-white/5 text-white/60 border-white/10"}`}>
                      {p.category}
                    </span>
                    <h4 className="text-sm font-semibold text-foreground mt-3 group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogDetailPage;
