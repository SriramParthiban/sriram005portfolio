import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import FadeInSection from "./FadeInSection";

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
  const res = await fetch(
    "https://api.github.com/users/SriramParthiban/repos?sort=updated&per_page=6"
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
};

const GitHubRepos = () => {
  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section id="github" className="bg-secondary/30 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Open Source</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">GitHub Repositories</h2>
        </FadeInSection>

        {isLoading && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {isError && (
          <FadeInSection delay={100}>
            <p className="mt-8 text-sm text-muted-foreground">
              Unable to load repositories.{" "}
              <a
                href="https://github.com/SriramParthiban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                View on GitHub →
              </a>
            </p>
          </FadeInSection>
        )}

        {repos && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {repos.map((repo, idx) => (
              <FadeInSection key={repo.id} delay={idx * 80}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 transition-colors group-hover:text-primary" />
                  </div>
                  {repo.description && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs font-medium">
                        {repo.language}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </FadeInSection>
            ))}
          </div>
        )}

        <FadeInSection delay={300}>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/SriramParthiban"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all repositories on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default GitHubRepos;
