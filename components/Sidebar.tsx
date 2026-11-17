import Link from "next/link";
import { pathFor, T } from "@/lib/site";
import type { Lang } from "@/lib/schema";
import { TOC } from "./TOC";

export function Sidebar({ lang, headings }: { lang: Lang; headings: { id: string; text: string }[] }) {
  const t = T[lang];
  return (
    <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start space-y-5 no-print" aria-label={t.quickLaunch}>
      <div className="card !bg-warm">
        <h2 className="eyebrow mb-3">{t.quickLaunch}</h2>
        <div className="grid gap-3">
          <Link href={pathFor(lang, "puja-basics", "aarti-sangrah")} className="btn btn-primary">{t.aartiSangrah}</Link>
          <Link href={pathFor(lang, "puja-basics", "printable-aarti-sheets")} className="btn btn-secondary">{t.printSheet}</Link>
        </div>
      </div>
      <TOC headings={headings} title={t.onThisPage} variant="desktop" />
    </aside>
  );
}
