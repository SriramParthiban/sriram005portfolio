import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
    <section id="github" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">GitHub Repositories</h2>

        {isLoading && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        )}

        {isError && (
          <p className="mt-6 text-sm text-muted-foreground">
            Unable to load repositories.{" "}
            <a
              href="https://github.com/SriramParthiban"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on GitHub →
            </a>
          </p>
        )}

        {repos && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {repos.map((repo) => (
              <Card key={repo.id} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-muted-foreground"
                    >
                      {repo.name}
                    </a>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {repo.description && (
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs font-normal">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="https://github.com/SriramParthiban"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline transition-colors hover:text-foreground"
          >
            View all repositories on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubRepos;
