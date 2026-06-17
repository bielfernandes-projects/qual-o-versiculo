"use client";

import { Search, Loader2, X, StopCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
  onCancel?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  query?: string;
}

export function SearchBar({ onSearch, isSearching, onCancel, onFocus, onBlur, query }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    if (query !== undefined && inputRef.current) {
      inputRef.current.value = query;
      setHasText(query.length > 0);
    }
  }, [query]);

  function handleChange() {
    const val = inputRef.current?.value ?? "";
    setHasText(val.length > 0);
    onSearch(val);
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setHasText(false);
    onSearch("");
    inputRef.current?.focus();
  }

  const rightPad = isSearching ? "pr-28" : hasText ? "pr-16" : "pr-4";

  return (
    <div className="px-6 md:px-10 pb-2">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-brand-muted pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Buscar versículos"
          placeholder="Busque por palavra, livro, citação referência ou até seu nome"
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full h-12 pl-11 ${rightPad} rounded-xl border border-brand-surface bg-brand-surface/50 text-base text-brand-ink placeholder-brand-muted outline-none transition-all focus-visible:border-brand-primary focus-visible:bg-brand-bg focus-visible:ring-2 focus-visible:ring-brand-primary/10 [&::-webkit-search-cancel-button]:hidden`}
        />
        {hasText && !isSearching && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpar busca"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center size-9 rounded-lg text-brand-muted hover:text-brand-ink hover:bg-brand-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30"
          >
            <X className="size-5" />
          </button>
        )}
        {isSearching && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <Loader2 className="size-4 text-brand-muted animate-spin" />
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                aria-label="Cancelar busca"
                className="flex items-center justify-center h-9 px-2 rounded-lg text-xs font-medium text-brand-muted hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30"
              >
                <StopCircle className="size-4 mr-1" />
                Cancelar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
