import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

const CHUNK_SIZE = 500;

interface JsonBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

interface VerseRow {
  book: string;
  chapter: number;
  verse_number: number;
  content: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json",
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch JSON from GitHub" },
        { status: 502 },
      );
    }

    const text = await res.text();
    const json: JsonBook[] = JSON.parse(text.replace(/^\uFEFF/, ""));

    const allVerses: VerseRow[] = [];

    for (const book of json) {
      for (let c = 0; c < book.chapters.length; c++) {
        const chapter = book.chapters[c];
        for (let v = 0; v < chapter.length; v++) {
          allVerses.push({
            book: book.name,
            chapter: c + 1,
            verse_number: v + 1,
            content: chapter[v],
          });
        }
      }
    }

    const supabase = createAdminClient();

    let inserted = 0;
    const errors: string[] = [];

    for (let i = 0; i < allVerses.length; i += CHUNK_SIZE) {
      const chunk = allVerses.slice(i, i + CHUNK_SIZE);
      const { error } = await supabase.from("verses").insert(chunk);

      if (error) {
        errors.push(`Chunk ${Math.floor(i / CHUNK_SIZE) + 1}: ${error.message}`);
      } else {
        inserted += chunk.length;
      }
    }

    return NextResponse.json({
      success: true,
      total: allVerses.length,
      inserted,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
