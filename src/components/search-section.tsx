"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { AlertCircle, RotateCcw, HelpCircle, X, Clock, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Verse } from "@/types/verse";
import type { Testament } from "@/lib/books";
import { getBooksForTestament, parseCitation } from "@/lib/books";
import { SearchBar } from "./search-bar";
import { SearchResults } from "./search-results";

const STORAGE_KEY = "recent-searches";
const MAX_RECENT = 5;

interface SearchSectionProps {
  dailyVerse: ReactNode;
}

const FILTERS: { value: Testament; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "old", label: "Antigo Testamento" },
  { value: "new", label: "Novo Testamento" },
];

function escapeLike(value: string) {
  return value.replace(/[%_]/g, "\\$&");
}

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function saveRecent(q: string) {
  try {
    const current = loadRecent();
    const next = [q, ...current.filter((s) => s !== q)].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable
  }
}

function removeRecent(q: string) {
  try {
    const current = loadRecent();
    const next = current.filter((s) => s !== q);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable
  }
}

export function SearchSection({ dailyVerse }: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Verse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testament, setTestament] = useState<Testament>("all");
  const [showRecent, setShowRecent] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecent);
  const [controlledQuery, setControlledQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  function getErrorMessage(err: unknown): string {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      return "Sem conexão com a internet. Verifique sua rede e tente novamente.";
    }
    if (err && typeof err === "object" && "code" in err) {
      const pgErr = err as { code: string };
      if (pgErr.code === "429") {
        return "Muitas requisições. Aguarde um momento e tente novamente.";
      }
    }
    return "Erro inesperado ao buscar versículos. Tente novamente.";
  }

  async function performSearch(q: string, filtro: Testament) {
    const id = ++requestIdRef.current;

    setIsSearching(true);
    setError(null);

    try {
      const supabase = createClient();
      const books = getBooksForTestament(filtro);
      const citation = parseCitation(q);

      let query_ = supabase
        .from("verses")
        .select("id, book, chapter, verse_number, content");

      if (citation) {
        query_ = query_
          .eq("book", citation.book)
          .eq("chapter", citation.chapter)
          .eq("verse_number", citation.verse);
      } else {
        if (books) {
          query_ = query_.in("book", books);
        }
        query_ = query_.textSearch("fts", q, { type: "websearch" });
      }

      let { data, error: supabaseError } = await query_
        .limit(30);

      if (id !== requestIdRef.current) return;
      if (supabaseError) throw supabaseError;

      if (!citation && (!data || data.length === 0)) {
        const safe = escapeLike(q);
        let fallbackQuery = supabase
          .from("verses")
          .select("id, book, chapter, verse_number, content")
          .or(`content.ilike.%${safe}%,book.ilike.%${safe}%`);

        if (books) {
          fallbackQuery = fallbackQuery.in("book", books);
        }

        const { data: fallback, error: fallbackError } = await fallbackQuery
          .order("id")
          .limit(30);

        if (id !== requestIdRef.current) return;
        if (fallbackError) throw fallbackError;

        data = fallback ?? [];
      }

      const seen = new Set<string>();
      const deduped: Verse[] = [];
      for (const v of data ?? []) {
        const key = `${v.book}|${v.chapter}|${v.verse_number}|${v.content}`;
        if (seen.has(key)) continue;
        seen.add(key);
        deduped.push({
          id: String(v.id),
          livro: v.book as string,
          capitulo: v.chapter as number,
          versiculo: v.verse_number as number,
          texto: v.content as string,
        });
      }
      setResults(deduped);
    } catch (err) {
      if (id !== requestIdRef.current) return;
      setError(getErrorMessage(err));
      setResults([]);
    } finally {
      if (id === requestIdRef.current) {
        setIsSearching(false);
      }
    }
  }

  function handleFilterChange(filtro: Testament) {
    setTestament(filtro);
    const q = (controlledQuery || query).trim();
    if (q) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => performSearch(q, filtro), 300);
    }
  }

  function handleSearch(raw: string) {
    setControlledQuery(raw);
    setQuery(raw);
    const q = raw.trim();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!q) {
      setResults([]);
      setError(null);
      return;
    }

    debounceRef.current = setTimeout(() => {
      saveRecent(q);
      setRecentSearches(loadRecent());
      performSearch(q, testament);
    }, 300);
  }

  function handleCancel() {
    requestIdRef.current++;
    setIsSearching(false);
    setResults([]);
    setError(null);
  }

  function handleRetry() {
    const q = (controlledQuery || query).trim();
    if (q) {
      performSearch(q, testament);
    }
  }

  function handleRecentClick(q: string) {
    setControlledQuery(q);
    setQuery(q);
    setShowRecent(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    saveRecent(q);
    setRecentSearches(loadRecent());
    performSearch(q, testament);
  }

  function handleRemoveRecent(q: string) {
    removeRecent(q);
    setRecentSearches(loadRecent());
  }

  const handleInputFocus = useCallback(() => {
    const recents = loadRecent();
    setRecentSearches(recents);
    if (recents.length > 0) {
      setShowRecent(true);
    }
  }, []);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => setShowRecent(false), 200);
  }, []);

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        isSearching={isSearching}
        onCancel={handleCancel}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        query={controlledQuery}
      />
      <div className="px-6 md:px-10 pb-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          aria-label="Como buscar?"
          className="flex items-center gap-1 text-xs font-medium text-brand-muted hover:text-brand-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 rounded-lg px-2 py-1"
        >
          <HelpCircle className="size-3.5" />
          Como buscar?
        </button>
      </div>
      {showHelp && (
        <div className="mx-6 md:mx-10 mb-3 rounded-xl border border-brand-surface bg-brand-bg p-4 space-y-2 text-sm text-brand-ink">
          <p><span className="font-medium text-brand-primary">Palavra:</span> digite qualquer termo — <span className="text-brand-muted">amor, fé, salvação</span></p>
          <p><span className="font-medium text-brand-primary">Citação:</span> use Livro capítulo:versículo — <span className="text-brand-muted">João 3:16</span></p>
          <p><span className="font-medium text-brand-primary">Livro:</span> digite o nome do livro — <span className="text-brand-muted">Salmos, Romanos</span></p>
          <p><span className="font-medium text-brand-primary">Filtro:</span> após buscar, use os botões de testamento</p>
        </div>
      )}
      {showRecent && recentSearches.length > 0 && (
        <div className="mx-6 md:mx-10 mb-3 rounded-xl border border-brand-surface bg-brand-bg p-3 space-y-1">
          <p className="text-xs font-medium text-brand-muted uppercase tracking-wider px-2 mb-1">Buscas recentes</p>
          {recentSearches.map((s) => (
            <div key={s} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-brand-surface transition-colors group">
              <button
                type="button"
                onClick={() => handleRecentClick(s)}
                className="flex items-center gap-2 flex-1 text-sm text-brand-ink text-left min-h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 rounded"
              >
                <Clock className="size-3.5 text-brand-muted shrink-0" />
                {s}
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemoveRecent(s); }}
                aria-label={`Remover "${s}" do histórico`}
                className="size-7 flex items-center justify-center rounded text-brand-muted hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      {query && (
        <div className="flex gap-2 px-6 md:px-10 pb-3 overflow-x-auto scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => handleFilterChange(f.value)}
              className={`shrink-0 h-9 px-4 rounded-full text-xs font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg ${
                testament === f.value
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-brand-bg text-brand-muted border-brand-surface hover:border-brand-primary/30 hover:text-brand-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      {error && (
        <div className="mx-6 md:mx-10 mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="flex items-center gap-1.5 text-sm font-medium text-red-700 hover:text-red-600 transition-colors shrink-0"
          >
            <RotateCcw className="size-4" />
            Tentar de novo
          </button>
        </div>
      )}
      {query && !error && (
        <SearchResults
          results={results}
          query={query}
          isSearching={isSearching}
        />
      )}
      {!query && dailyVerse}
    </>
  );
}
