import { formatDate, T } from "@/lib/site";
import type { Lang } from "@/lib/schema";

export function Reviewed({ lang, reviewer, updated, needsReviewer = true }: { lang: Lang; reviewer?: string; updated: string; needsReviewer?: boolean }) {
  const t = T[lang];
  return (
    <p className="text-sm text-muted">
      {reviewer ? <>{t.reviewedBy} <strong className="text-ink">{reviewer}</strong>{" · "}</> : needsReviewer ? <><span>{t.reviewPending}</span>{" · "}</> : null}{t.updated} <time dateTime={updated}>{formatDate(updated, lang)}</time>
    </p>
  );
}
