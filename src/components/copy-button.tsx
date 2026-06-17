"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  reference: string;
}

export function CopyButton({ text, reference }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const content = `"${text}" — ${reference}`;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copiar ${reference}`}
      className="flex items-center gap-1.5 text-xs font-medium text-brand-muted transition-colors hover:text-brand-ink hover:bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 rounded-lg px-3 py-2 min-h-9"
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copiar
        </>
      )}
    </button>
  );
}
