export function Header() {
  return (
    <header className="flex items-start gap-3 px-6 md:px-10 pt-8 md:pt-12 pb-6">
      <div className="flex items-center justify-center size-10 shrink-0 rounded-xl bg-brand-primary text-white mt-0.5">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" role="img" aria-label="Cruz">
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="5" y1="9" x2="19" y2="9" />
        </svg>
      </div>
      <div className="leading-tight min-w-0">
        <h1 className="text-lg font-semibold text-brand-ink text-balance">
          Qual o Versículo?
        </h1>
        <p className="text-sm text-brand-muted">Bíblia Católica CNBB</p>
        <p className="text-xs text-brand-muted/70 mt-1">
          Digite uma palavra, livro ou referência — ex: &ldquo;João 3:16&rdquo;
        </p>
      </div>
    </header>
  );
}
