import Link from "next/link";
import { CATEGORY_MAP, type CategoryKey } from "@/lib/categories";
import { relatedFor, type PageMeta } from "@/lib/content";
import { pathFor, T } from "@/lib/site";
import type { Lang } from "@/lib/schema";
import { PageCard } from "./Cards";

/** Hub link + related + 3 siblings + matching tool. Rendered automatically under every page. */
export function RelatedGrid({ lang, page }: { lang: Lang; page: PageMeta }) {
  const t = T[lang];
  const { explicit, siblings, tools } = relatedFor(lang, page);
  const cat = CATEGORY_MAP[page.category as CategoryKey];
  const main = [...explicit, ...siblings].slice(0, 5);
  return (
    <section aria-labelledby="related-h" className="no-print mt-14 border-t border-line pt-8">
      <h2 id="related-h" className="font-heading text-2xl text-sindoor">{t.related}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {main.map((p) => <PageCard key={p.slug} lang={lang} page={p} />)}
      </div>
      {tools.length > 0 && (
        <>
          <h3 className="mt-8 font-bold">{t.tools}</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">{tools.map((p) => <PageCard key={p.slug} lang={lang} page={p} />)}</div>
        </>
      )}
      <p className="mt-6"><Link href={pathFor(lang, page.category)} className="btn btn-ghost">{cat.name[lang]} · {t.hub} →</Link></p>
    </section>
  );
}
