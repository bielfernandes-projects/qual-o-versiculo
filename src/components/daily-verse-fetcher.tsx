import { DailyVerseCard } from "./daily-verse-card";
import type { Verse } from "@/types/verse";

const FALLBACK: Verse = {
  id: "0",
  livro: "Salmos",
  capitulo: 23,
  versiculo: 1,
  texto: "O Senhor é o meu pastor; nada me faltará.",
};

function getDayOfYear() {
  const now = new Date();
  const start = Date.UTC(now.getFullYear(), 0, 1);
  return Math.floor((now.getTime() - start) / 86400000);
}

export function DailyVerseSkeleton() {
  return (
    <div className="mx-6 mb-4 rounded-2xl bg-brand-primary/[0.04] border border-brand-primary/10 p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="size-4 rounded-full bg-brand-primary/20" />
        <div className="h-3 w-28 rounded bg-brand-primary/20" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 w-full rounded bg-brand-primary/10" />
        <div className="h-4 w-3/4 rounded bg-brand-primary/10" />
      </div>
      <div className="h-4 w-32 rounded bg-brand-primary/10" />
    </div>
  );
}

export async function DailyVerseFetcher() {
  try {
    const countRes = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/verses?select=count`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 86400 },
      },
    );

    if (!countRes.ok) {
      return <DailyVerseCard verse={FALLBACK} />;
    }

    const [{ count }] = await countRes.json();
    const offset = getDayOfYear() % (count ?? 1);

    const verseRes = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/verses?select=book,chapter,verse_number,content&order=id.asc&offset=${offset}&limit=1`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 86400 },
      },
    );

    if (!verseRes.ok) {
      return <DailyVerseCard verse={FALLBACK} />;
    }

    const verses = await verseRes.json();

    if (verses.length === 0) {
      return <DailyVerseCard verse={FALLBACK} />;
    }

    const verse: Verse = {
      id: String(offset),
      livro: verses[0].book,
      capitulo: verses[0].chapter,
      versiculo: verses[0].verse_number,
      texto: verses[0].content,
    };

    return <DailyVerseCard verse={verse} />;
  } catch {
    return <DailyVerseCard verse={FALLBACK} />;
  }
}
