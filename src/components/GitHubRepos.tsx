import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const fetchRepos = async (): Promise<Repo[]> => {
  const res = await fetch("https://api.github.com/users/SriramParthiban/repos?sort=updated&per_page=6");
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
};

const langColors: Record<string, string> = {
  Python: "bg-[hsl(210,60%,50%)]",
  JavaScript: "bg-[hsl(50,90%,50%)]",
  TypeScript: "bg-[hsl(210,70%,55%)]",
  HTML: "bg-[hsl(15,80%,55%)]",
  CSS: "bg-[hsl(265,55%,55%)]",
  Jupyter: "bg-[hsl(25,80%,55%)]",
};

const GitHubRepos = () => {
  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section id="github" className="dark-section relative px-6 py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute -bottom-20 left-20 h-[250px] w-[250px] rounded-full bg-accent/5 blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-sm font-display font-semibold uppercase tracking-[0.2em] text-primary">Open Source</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl">
            GitHub <span className="gradient-text">Repositories</span>
          </h2>
        </FadeInSection>

        {isLoading && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl bg-white/5" />
            ))}
          </div>
        )}

        {isError && (
          <FadeInSection delay={100}>
            <p className="mt-8 text-sm text-white/50">
              Unable to load repositories.{" "}
              <a href="https://github.com/SriramParthiban" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                View on GitHub →
              </a>
            </p>
          </FadeInSection>
        )}

        {repos && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {repos.map((repo, idx) => (
              <FadeInSection key={repo.id} delay={idx * 100}>
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-white/8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <Github className="h-4 w-4 text-white/40 transition-colors group-hover:text-primary" />
                      <h3 className="text-sm font-display font-bold text-white group-hover:text-primary transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  {repo.description && (
                    <p className="relative mt-2.5 text-xs leading-relaxed text-white/40 line-clamp-2">{repo.description}</p>
                  )}
                  <div className="relative mt-4 flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-white/50">
                        <span className={`h-2.5 w-2.5 rounded-full ${langColors[repo.language] || "bg-white/30"}`} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              </FadeInSection>
            ))}
          </div>
        )}

        <FadeInSection delay={400}>
          <div className="mt-10 text-center">
            <a
              href="https://github.com/SriramParthiban"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:glow-sm"
            >
              View all on GitHub
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default GitHubRepos;
