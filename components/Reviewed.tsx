import { formatDate, T } from "@/lib/site";
import type { Lang } from "@/lib/schema";

export function Reviewed({ lang, reviewer, updated }: { lang: Lang; reviewer?: string; updated: string }) {
  const t = T[lang];
  return (
    <p className="text-sm text-muted">
      {reviewer ? <>{t.reviewedBy} <strong className="text-ink">{reviewer}</strong></> : <span>{t.reviewPending}</span>}
      {" · "}{t.updated} <time dateTime={updated}>{formatDate(updated, lang)}</time>
    </p>
  );
}
