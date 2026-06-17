import type { Verse } from "@/types/verse";
import { Loader2 } from "lucide-react";
import { EmptyState } from "./empty-state";
import { CopyButton } from "./copy-button";
import { ShareButton } from "./share-button";

interface SearchResultsProps {
  results: Verse[];
  query: string;
  isSearching?: boolean;
}

export function SearchResults({ results, query, isSearching }: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex items-center justify-center gap-2 px-6 md:px-10 py-12 text-brand-muted">
        <Loader2 className="size-5 animate-spin" />
        <span className="text-sm">Buscando...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="px-6 md:px-10 pb-6 space-y-3">
      <p className="text-xs font-medium text-brand-muted uppercase tracking-wider">
        {results.length} {results.length === 1 ? "resultado" : "resultados"} para &ldquo;{query}&rdquo;
      </p>
      {results.map((verse) => (
        <article
          key={verse.id}
          className="rounded-xl border border-brand-surface bg-brand-bg p-4 transition-shadow hover:shadow-sm"
        >
          <blockquote className="text-base leading-relaxed text-brand-ink mb-2">
            &ldquo;{verse.texto}&rdquo;
          </blockquote>
          <div className="flex items-center justify-between">
            <cite className="text-xs font-medium text-brand-muted not-italic">
              {verse.livro} {verse.capitulo}:{verse.versiculo}
            </cite>
            <div className="flex items-center gap-1">
              <ShareButton
                text={verse.texto}
                reference={`${verse.livro} ${verse.capitulo}:${verse.versiculo}`}
              />
              <CopyButton
                text={verse.texto}
                reference={`${verse.livro} ${verse.capitulo}:${verse.versiculo}`}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
