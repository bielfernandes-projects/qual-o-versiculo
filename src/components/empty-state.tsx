import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex items-center justify-center size-14 rounded-full bg-brand-surface text-brand-muted mb-4">
        <SearchX className="size-6" />
      </div>
      <h3 className="text-base font-semibold text-brand-ink mb-1">
        Nenhum resultado encontrado
      </h3>
      <p className="text-base text-brand-muted max-w-xs">
        Nenhum versículo corresponde a{" "}
        <span className="font-medium text-brand-ink">&ldquo;{query}&rdquo;</span>
        . Tente buscar por outra palavra ou livro.
      </p>
    </div>
  );
}
