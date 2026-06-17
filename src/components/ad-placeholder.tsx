interface AdPlaceholderProps {
  height?: "sm" | "lg";
}

export function AdPlaceholder({ height = "sm" }: AdPlaceholderProps) {
  if (!process.env.NEXT_PUBLIC_ADS_ENABLED) {
    return null;
  }

  return (
    <div
      className={`mx-6 md:mx-10 mb-4 flex items-center justify-center rounded-xl border border-dashed border-brand-surface bg-brand-surface/50 text-sm text-brand-muted select-none ${height === "sm" ? "h-20" : "h-32"}`}
    >
      Espaço Publicitário Reservado
    </div>
  );
}
