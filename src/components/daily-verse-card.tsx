"use client";

import { Sparkles } from "lucide-react";
import type { Verse } from "@/types/verse";
import { CopyButton } from "./copy-button";
import { ShareButton } from "./share-button";

interface DailyVerseCardProps {
  verse: Verse;
}

export function DailyVerseCard({ verse }: DailyVerseCardProps) {
  return (
    <div className="mx-6 md:mx-10 mb-6 rounded-2xl bg-brand-primary/[0.06] border border-brand-primary/15 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="size-4 text-brand-accent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Versículo do Dia
        </span>
      </div>
      <blockquote className="text-base leading-relaxed text-brand-ink mb-3">
        &ldquo;{verse.texto}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between">
        <cite className="text-sm font-medium text-brand-muted not-italic">
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
    </div>
  );
}
