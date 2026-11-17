import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CATEGORIES, CATEGORY_MAP, type CategoryKey } from "@/lib/categories";
import { HUBS } from "@/lib/hubs";
import { allPages, pagesInCategory, twinLang, type Page } from "@/lib/content";
import { articleLd, breadcrumbLd, docLd, organizationLd, websiteLd } from "@/lib/seo";
import { absUrl, pathFor, T } from "@/lib/site";
import { REVIEWER_TYPES, type Lang } from "@/lib/schema";
import { Shell } from "./Shell";
import { JsonLd } from "./JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";
import { TOC } from "./TOC";
import { Sidebar } from "./Sidebar";
import { Reviewed } from "./Reviewed";
import { ShareWhatsApp } from "./ShareWhatsApp";
import { PrintButton } from "./PrintButton";
import { RelatedGrid } from "./RelatedGrid";
import { CategoryCard, PageCard } from "./Cards";
import { SearchBox } from "./SearchBox";
import { PanchangStrip } from "./tools/Panchang";
import { Countdown } from "./tools/Countdown";
import { readFestivals } from "./mdx/Server";
import { mdxComponents } from "./mdx/map";

/* ------------------------------------------------------------------ page */
// MDX note: content is our own repo MDX (reviewed in PRs) and relies on JS-expression props such as dev={`...`},
// so MDXRemote runs with blockJS:false. blockDangerousJS stays on to reject eval/Function/process access.
// Never pass user-submitted text to MDXRemote.
export function PageView({ lang, page }: { lang: Lang; page: Page }) {
  const m = page.meta;
  const t = T[lang];
  const cat = CATEGORY_MAP[m.category as CategoryKey];
  const path = pathFor(lang, m.category, m.slug);
  const crumbs = [
    { name: t.breadcrumbHome, path: pathFor(lang) },
    { name: cat.name[lang], path: pathFor(lang, m.category) },
    { name: m.title, path },
  ];
  const showBody = m.status !== "stub" || m.type === "tool";
  return (
    <Shell lang={lang} twinHref={pathFor(twinLang(lang), m.category, m.slug)}>
      <JsonLd data={articleLd(lang, m, crumbs)} />
      <div className="mx-auto max-w-6xl px-4 pt-2">
        {showBody && <TOC headings={page.headings} title={t.onThisPage} variant="mobile" />}
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article>
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow flex items-center gap-2"><span aria-hidden className="inline-block h-3 w-3 rounded-full" style={{ background: cat.accent }} />{cat.name[lang]}</p>
            <h1 className="mt-1 font-heading text-3xl leading-tight text-ink md:text-4xl">{m.title}</h1>
            <div className="mt-3"><Reviewed lang={lang} reviewer={m.reviewer} updated={m.updated} needsReviewer={REVIEWER_TYPES.includes(m.type)} /></div>
            <div className="my-5 hidden flex-wrap gap-3 md:flex no-print">
              <ShareWhatsApp lang={lang} path={path} title={m.title} />
              <PrintButton label={`🖨 ${t.print}`} />
            </div>
            <div className="prose-puja mt-6">
              {showBody ? (
                <MDXRemote source={page.body} components={mdxComponents(lang, m)} options={{ blockJS: false, blockDangerousJS: true }} />
              ) : (
                <div className="card !bg-warm" role="note">
                  <p className="font-semibold">{t.stubNote}</p>
                  {page.headings.length > 0 && (
                    <>
                      <h2 className="!mt-4 !text-lg" id="planned">{lang === "hi" ? "इस पेज में आएगा" : "Is page mein aayega"}</h2>
                      <ul>{page.headings.map((h) => <li key={h.id}>{h.text}</li>)}</ul>
                    </>
                  )}
                </div>
              )}
            </div>
            <RelatedGrid lang={lang} page={m} />
          </article>
          <Sidebar lang={lang} headings={showBody ? page.headings : []} />
        </div>
      </div>
      <div className="nav-float fixed inset-x-3 bottom-[max(.75rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-md gap-2 rounded-full p-2 md:hidden no-print" role="toolbar" aria-label="Actions">
        <ShareWhatsApp lang={lang} path={path} title={m.title} className="flex-1" />
        <PrintButton label={`🖨 ${t.print}`} className="flex-1" />
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------- hub */
function paragraphs(text: string): string[] {
  const sentences = text.split(/(?<=[.।])\s+/);
  const half = text.length / 2;
  let acc = 0;
  const a: string[] = [], b: string[] = [];
  for (const s of sentences) { (acc < half ? a : b).push(s); acc += s.length; }
  return [a.join(" "), b.join(" ")].filter(Boolean);
}

export function HubView({ lang, category }: { lang: Lang; category: CategoryKey }) {
  const t = T[lang];
  const cat = CATEGORY_MAP[category];
  const hub = HUBS[category];
  const pages = pagesInCategory(lang, category);
  const crumbs = [{ name: t.breadcrumbHome, path: pathFor(lang) }, { name: cat.name[lang], path: pathFor(lang, category) }];
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: cat.name[lang], description: hub.description[lang], url: absUrl(pathFor(lang, category)), inLanguage: lang === "hi" ? "hi-IN" : "en-IN" },
      breadcrumbLd(crumbs),
      organizationLd(),
    ],
  };
  return (
    <Shell lang={lang} twinHref={pathFor(twinLang(lang), category)}>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <Breadcrumbs items={crumbs} />
        <header className="card card-accent !bg-warm" style={{ "--accent": cat.accent } as React.CSSProperties}>
          <p className="eyebrow flex items-center gap-2"><span aria-hidden className="inline-block h-3 w-3 rounded-full" style={{ background: cat.accent }} />{t.hub}</p>
          <h1 className="mt-1 font-heading text-3xl text-ink md:text-4xl">{cat.name[lang]}</h1>
          <div className="prose-puja mt-4 space-y-3 !max-w-3xl">{paragraphs(hub.intro[lang]).map((p, i) => <p key={i}>{p}</p>)}</div>
        </header>
        <section aria-labelledby="hub-pages" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <h2 id="hub-pages" className="sr-only">{cat.name[lang]} · {t.pages}</h2>
          {pages.map((p) => <PageCard key={p.slug} lang={lang} page={p} />)}
        </section>
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="font-heading text-2xl text-sindoor">{t.more}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hub.related.map((k) => <CategoryCard key={k} lang={lang} category={CATEGORY_MAP[k]} count={pagesInCategory(lang, k).length} />)}
          </div>
        </section>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ home */
export function HomeView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const mostRead = allPages(lang).map((p) => p.meta).filter((m) => m.type === "aarti" && m.priority === "P1").sort((a, b) => b.volume - a.volume);
  const festivals = readFestivals();
  const dated = festivals.filter((f) => f.date);
  const hi = lang === "hi";
  return (
    <Shell lang={lang} twinHref={pathFor(twinLang(lang))}>
      <JsonLd data={websiteLd(lang)} />
      <div className="mx-auto max-w-6xl px-4">
        <section className="py-8 text-center sm:py-10 md:py-16">
          <h1 className="mx-auto max-w-3xl font-heading text-3xl leading-tight text-sindoor sm:text-4xl md:text-5xl">
            {hi ? "आरती, पूजा विधि और पाठ, हिंग्लिश और हिंदी में" : "Aarti, Puja Vidhi aur Path, Hinglish aur Hindi mein"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            {hi ? "घर की पूजा के लिए साफ़, भरोसेमंद और मोबाइल पर पढ़ने में आसान जानकारी।" : "Ghar ki puja ke liye saaf, bharosemand aur mobile par padhne mein aasan jaankari."}
          </p>
          <div id="search" className="mx-auto mt-8 max-w-2xl"><SearchBox lang={lang} placeholder={t.searchPh} label={t.search} large /></div>
        </section>

        <PanchangStrip lang={lang} />

        <section className="mt-12" aria-labelledby="fest-h">
          <h2 id="fest-h" className="font-heading text-2xl text-sindoor">{dated.length ? t.festivals : t.festivalGuides}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(dated.length ? dated : festivals.slice(0, 6)).map((f) => (
              <li key={f.id} className="card !p-4 flex items-center justify-between gap-3">
                <Link href={(hi ? "/hi" : "") + f.path} className="flex min-h-[44px] flex-1 items-center font-semibold">{f.name[lang]}</Link>
                {f.date ? <Countdown date={f.date} lang={lang} /> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="deity-h">
          <h2 id="deity-h" className="font-heading text-2xl text-sindoor">{t.allCategories}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => <CategoryCard key={c.key} lang={lang} category={c} count={pagesInCategory(lang, c.key).length} />)}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="read-h">
          <h2 id="read-h" className="font-heading text-2xl text-sindoor">{t.mostRead}</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {mostRead.map((m, i) => (
              <li key={m.slug}>
                <Link href={pathFor(lang, m.category, m.slug)} className="card !p-4 flex min-h-[64px] items-center gap-4 no-underline">
                  <span className="font-heading text-3xl text-saffron-text" aria-hidden>{i + 1}</span>
                  <span className="font-semibold text-ink">{m.title}{m.status === "stub" && <span className="badge ml-2">{hi ? "जल्द आ रहा है" : "jald aa raha hai"}</span>}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="card !bg-warm mt-12 text-center">
          <h2 className="font-heading text-2xl text-sindoor">{t.printSheet}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">{hi ? "मंदिर या घर में लगाने के लिए बड़े अक्षरों में आरती प्रिंट करें। A4 या A5, एक या दो आरती प्रति पेज।" : "Mandir ya ghar mein lagane ke liye bade aksharon mein aarti print karein. A4 ya A5, ek ya do aarti per page."}</p>
          <p className="mt-4"><Link href={pathFor(lang, "puja-basics", "printable-aarti-sheets")} className="btn btn-primary">{t.printSheet} →</Link></p>
        </section>
      </div>
    </Shell>
  );
}

/* ---------------------------------------------------------- simple docs */
export function DocView({ lang, title, children, slug, description, kind = "WebPage" }: { lang: Lang; title: string; children: React.ReactNode; slug: string; description?: string; kind?: "WebPage" | "ContactPage" | "AboutPage" }) {
  const t = T[lang];
  const crumbs = [{ name: t.breadcrumbHome, path: pathFor(lang) }, { name: title, path: pathFor(lang, slug) }];
  return (
    <Shell lang={lang} twinHref={pathFor(twinLang(lang), slug)}>
      {description && <JsonLd data={docLd(lang, { type: kind, title, description, path: pathFor(lang, slug), crumbs })} />}
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <Breadcrumbs items={[{ name: t.breadcrumbHome, path: pathFor(lang) }, { name: title, path: pathFor(lang, slug) }]} />
        <h1 className="font-heading text-3xl text-ink md:text-4xl">{title}</h1>
        <div className="prose-puja mt-6">{children}</div>
      </div>
    </Shell>
  );
}
