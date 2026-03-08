import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
  Python: "text-[hsl(210,60%,60%)]",
  JavaScript: "text-[hsl(50,90%,55%)]",
  TypeScript: "text-[hsl(210,70%,60%)]",
  HTML: "text-[hsl(15,80%,60%)]",
  CSS: "text-[hsl(265,55%,60%)]",
  Jupyter: "text-[hsl(25,80%,60%)]",
};

const TypingCursor = () => (
  <span className="inline-block w-2 h-4 bg-[hsl(120,60%,50%)] animate-[pulseFade_1s_ease-in-out_infinite] ml-0.5" />
);

const TerminalHeader = () => (
  <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(155,25%,8%)] border-b border-[hsl(155,20%,14%)] rounded-t-lg">
    <div className="h-3 w-3 rounded-full bg-[hsl(0,70%,50%)]" />
    <div className="h-3 w-3 rounded-full bg-[hsl(38,80%,55%)]" />
    <div className="h-3 w-3 rounded-full bg-[hsl(152,55%,45%)]" />
    <span className="ml-3 text-xs font-mono text-white/40">sriram@portfolio:~/repos</span>
  </div>
);

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}</span>;
};

const GitHubRepos = () => {
  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section id="github" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
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
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            GitHub <span className="gradient-text">Repositories</span>
          </h2>
        </FadeInSection>

        {/* Terminal Window */}
        <FadeInSection delay={150}>
          <div className="mt-10 sm:mt-14 relative">
            {/* CRT scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-lg opacity-[0.03]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.1) 2px, hsl(0 0% 100% / 0.1) 4px)",
              }}
            />

            <div className="relative rounded-lg border border-[hsl(155,20%,14%)] bg-[hsl(155,25%,4%)] shadow-[0_0_60px_-20px_hsl(152,55%,35%/0.15),0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
              <TerminalHeader />

              <div className="p-4 sm:p-6 font-mono text-sm space-y-1">
                {/* Boot text */}
                <div className="text-[hsl(120,40%,45%)] text-xs mb-4">
                  <TypewriterText text="$ ls -la ~/repos --sort=updated" />
                  <TypingCursor />
                </div>

                {isLoading && (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-6 w-full bg-white/5 rounded" />
                    ))}
                    <div className="text-[hsl(120,40%,45%)] text-xs animate-pulse">Loading...</div>
                  </div>
                )}

                {isError && (
                  <div className="text-[hsl(0,70%,55%)] text-xs">
                    error: failed to fetch repositories. <a href="https://github.com/SriramParthiban" target="_blank" rel="noopener noreferrer" className="underline text-[hsl(210,70%,60%)]">view on github →</a>
                  </div>
                )}

                {repos && (
                  <div className="space-y-0.5">
                    {/* Table header */}
                    <div className="flex items-center gap-4 text-[10px] sm:text-xs text-white/25 border-b border-white/5 pb-1 mb-2">
                      <span className="w-4">$</span>
                      <span className="flex-1">NAME</span>
                      <span className="hidden sm:block w-[180px]">DESCRIPTION</span>
                      <span className="w-16 text-right">LANG</span>
                      <span className="w-8 text-right">★</span>
                      <span className="w-8 text-right">⑂</span>
                    </div>

                    {repos.map((repo, idx) => (
                      <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                        className="group flex items-center gap-4 py-1.5 px-1 -mx-1 rounded text-xs sm:text-sm transition-all duration-200 hover:bg-[hsl(120,60%,50%/0.05)]"
                      >
                        <span className="w-4 text-[hsl(120,40%,40%)]">$</span>
                        <span className="flex-1 text-[hsl(120,50%,60%)] group-hover:text-[hsl(120,60%,70%)] font-bold truncate transition-colors">
                          {repo.name}
                        </span>
                        <span className="hidden sm:block w-[180px] text-white/30 truncate text-xs">
                          {repo.description || "—"}
                        </span>
                        <span className={`w-16 text-right text-xs ${langColors[repo.language || ""] || "text-white/30"}`}>
                          {repo.language || "—"}
                        </span>
                        <span className="w-8 text-right text-[hsl(45,80%,55%)] text-xs">{repo.stargazers_count}</span>
                        <span className="w-8 text-right text-white/30 text-xs">{repo.forks_count}</span>
                      </motion.a>
                    ))}

                    {/* Footer prompt */}
                    <div className="mt-4 pt-2 border-t border-white/5 text-[hsl(120,40%,45%)] text-xs">
                      $ <span className="text-white/30">total {repos.length} repositories</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/SriramParthiban"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-[hsl(120,50%,55%)] hover:text-[hsl(120,60%,70%)] transition-colors"
            >
              $ open https://github.com/SriramParthiban
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default GitHubRepos;
