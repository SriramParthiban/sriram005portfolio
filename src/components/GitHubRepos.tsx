import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Wifi, Activity } from "lucide-react";
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

const langDots: Record<string, string> = {
  Python: "bg-[hsl(210,60%,60%)]",
  JavaScript: "bg-[hsl(50,90%,55%)]",
  TypeScript: "bg-[hsl(210,70%,60%)]",
  HTML: "bg-[hsl(15,80%,60%)]",
  CSS: "bg-[hsl(265,55%,60%)]",
  Jupyter: "bg-[hsl(25,80%,60%)]",
};

const formatRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d < 1) return "today";
  if (d < 30) return `${d}d ago`;
  const m = Math.floor(d / 30);
  if (m < 12) return `${m}mo ago`;
  return `${Math.floor(m / 12)}y ago`;
};

const TypingCursor = () => (
  <span className="inline-block w-[7px] h-[14px] bg-[hsl(120,80%,60%)] shadow-[0_0_8px_hsl(120,80%,60%/0.8)] animate-[pulseFade_1s_ease-in-out_infinite] ml-0.5 align-middle" />
);

const TerminalHeader = () => (
  <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-b from-[hsl(155,25%,10%)] to-[hsl(155,25%,7%)] border-b border-[hsl(155,20%,14%)]">
    <div className="flex items-center gap-1.5">
      <div className="h-3 w-3 rounded-full bg-[hsl(0,70%,50%)] shadow-[0_0_6px_hsl(0,70%,50%/0.6)] hover:scale-110 transition-transform cursor-pointer" />
      <div className="h-3 w-3 rounded-full bg-[hsl(38,80%,55%)] shadow-[0_0_6px_hsl(38,80%,55%/0.6)] hover:scale-110 transition-transform cursor-pointer" />
      <div className="h-3 w-3 rounded-full bg-[hsl(152,55%,45%)] shadow-[0_0_6px_hsl(152,55%,45%/0.6)] hover:scale-110 transition-transform cursor-pointer" />
    </div>
    <div className="flex-1 flex items-center justify-center gap-2">
      <div className="px-3 py-1 rounded-md bg-[hsl(155,25%,5%)] border border-[hsl(155,20%,14%)]">
        <span className="text-xs font-mono text-white/50">sriram@portfolio</span>
        <span className="text-xs font-mono text-[hsl(120,40%,40%)]">:</span>
        <span className="text-xs font-mono text-[hsl(210,60%,60%)]">~/repos</span>
      </div>
    </div>
    <div className="flex items-center gap-2 text-[10px] font-mono text-white/30">
      <Wifi className="h-3 w-3" />
      <Activity className="h-3 w-3 text-[hsl(120,60%,50%)]" />
    </div>
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

  const totalStars = repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((s, r) => s + r.forks_count, 0) ?? 0;
  const langs = repos ? Array.from(new Set(repos.map(r => r.language).filter(Boolean))) : [];

  return (
    <section id="github" className="dark-section relative px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-[hsl(120,60%,50%)] shadow-[0_0_8px_hsl(120,60%,50%/0.8)] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[hsl(120,50%,55%)]">live · synced from github</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            GitHub Repositories
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Open source work and side projects.</p>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="mt-10 sm:mt-14 relative">
            {/* Glow halo behind terminal */}
            <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(ellipse_at_center,hsl(152,55%,35%/0.12),transparent_70%)] blur-2xl" />

            <div className="terminal-selectable relative rounded-lg border border-[hsl(155,20%,14%)] bg-[hsl(155,25%,4%)] shadow-[0_0_60px_-20px_hsl(152,55%,35%/0.25),0_20px_40px_-10px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Scanlines overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(120 100% 100% / 0.5) 2px, hsl(120 100% 100% / 0.5) 3px)",
                }}
              />
              {/* Vignette */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

              <TerminalHeader />

              <div className="relative z-0 p-4 sm:p-6 font-mono text-sm space-y-1">
                {/* Command line */}
                <div className="text-sm sm:text-base font-semibold mb-1 tracking-wide">
                  <span className="text-[hsl(265,70%,70%)]">sriram</span>
                  <span className="text-white/40">@</span>
                  <span className="text-[hsl(210,70%,65%)]">portfolio</span>
                  <span className="text-white/40"> ~/repos </span>
                  <span className="text-[hsl(120,70%,70%)]">$ </span>
                  <span className="text-[hsl(120,70%,80%)]">
                    <TypewriterText text="ls -la --sort=updated" />
                  </span>
                  <TypingCursor />
                </div>

                {/* System info banner */}
                {repos && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-white/40 mb-3 pb-3 border-b border-dashed border-white/5">
                    <span>uptime: <span className="text-[hsl(120,50%,60%)]">{repos.length} repos</span></span>
                    <span>★ <span className="text-[hsl(45,80%,60%)]">{totalStars}</span></span>
                    <span>⑂ <span className="text-white/60">{totalForks}</span></span>
                    <span className="hidden sm:inline">langs: <span className="text-[hsl(210,60%,65%)]">{langs.join(", ")}</span></span>
                  </div>
                )}

                {isLoading && (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-6 w-full bg-white/5 rounded" />
                    ))}
                    <div className="text-[hsl(120,50%,60%)] text-xs animate-pulse">▸ fetching from origin...</div>
                  </div>
                )}

                {isError && (
                  <div className="text-[hsl(0,70%,55%)] text-xs">
                    error: failed to fetch repositories. <a href="https://github.com/SriramParthiban" target="_blank" rel="noopener noreferrer" className="underline text-[hsl(210,70%,60%)]">view on github →</a>
                  </div>
                )}

                {repos && (
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-4 text-[10px] sm:text-xs text-white/30 border-b border-white/5 pb-1 mb-2 uppercase tracking-wider">
                      <span className="w-4">$</span>
                      <span className="flex-1">name</span>
                      <span className="hidden md:block w-[160px]">description</span>
                      <span className="hidden sm:block w-16 text-right">updated</span>
                      <span className="w-20 text-right">lang</span>
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
                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                        className="group relative flex items-center gap-4 py-1.5 px-2 -mx-2 rounded text-xs sm:text-sm transition-all duration-200 hover:bg-[hsl(120,60%,50%/0.06)] hover:shadow-[inset_2px_0_0_hsl(120,60%,50%)]"
                      >
                        <span className="w-4 text-[hsl(120,40%,40%)] group-hover:text-[hsl(120,70%,60%)] transition-colors">›</span>
                        <span className="flex-1 text-[hsl(120,55%,65%)] group-hover:text-[hsl(120,70%,80%)] font-bold truncate transition-colors">
                          {repo.name}
                        </span>
                        <span className="hidden md:block w-[160px] text-white/35 truncate text-xs">
                          {repo.description || "—"}
                        </span>
                        <span className="hidden sm:block w-16 text-right text-white/30 text-[10px]">
                          {formatRelative(repo.updated_at)}
                        </span>
                        <span className={`w-20 text-right text-xs flex items-center justify-end gap-1.5 ${langColors[repo.language || ""] || "text-white/30"}`}>
                          {repo.language && (
                            <span className={`h-1.5 w-1.5 rounded-full ${langDots[repo.language] || "bg-white/30"}`} />
                          )}
                          {repo.language || "—"}
                        </span>
                        <span className="w-8 text-right text-[hsl(45,80%,55%)] text-xs">{repo.stargazers_count}</span>
                        <span className="w-8 text-right text-white/40 text-xs">{repo.forks_count}</span>
                      </motion.a>
                    ))}

                    <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[hsl(120,50%,55%)] text-xs">
                      <span>
                        <span className="text-[hsl(120,70%,70%)]">$</span>{" "}
                        <span className="text-white/40">total {repos.length} repositories · exit 0</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(120,60%,50%)] shadow-[0_0_6px_hsl(120,60%,50%/0.8)] animate-pulse" />
                        connected
                      </span>
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
