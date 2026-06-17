"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  text: string;
  reference: string;
}

export function ShareButton({ text, reference }: ShareButtonProps) {
  const [shared, setShared] = useState(false);

  async function handleShare() {
    const content = `"${text}" — ${reference}`;
    const url = `https://www.bibliacatolica.com.br/busca?q=${encodeURIComponent(reference)}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: content, url });
        return;
      } catch {
        // user cancelled or share unavailable
      }
    }

    try {
      await navigator.clipboard.writeText(content);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Compartilhar ${reference}`}
      className="flex items-center gap-1.5 text-xs font-medium text-brand-muted transition-colors hover:text-brand-ink hover:bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 rounded-lg px-3 py-2 min-h-9"
    >
      {shared ? (
        <>
          <Check className="size-3.5" />
          Copiado!
        </>
      ) : (
        <>
          <Share2 className="size-3.5" />
          Compartilhar
        </>
      )}
    </button>
  );
}