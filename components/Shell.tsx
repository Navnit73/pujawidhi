import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { pathFor, SITE_NAME, T } from "@/lib/site";
import type { Lang } from "@/lib/schema";
import { SearchBox } from "./SearchBox";
import { ThemeToggle } from "./ThemeToggle";
import { DeityIcon } from "./DeityIcon";

export function Shell({ lang, twinHref, children }: { lang: Lang; twinHref: string; children: React.ReactNode }) {
  const t = T[lang];
  const home = pathFor(lang);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-on-saffron">{t.skip}</a>
      <header className="no-print border-b border-line bg-bg/95">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href={home} className="flex items-center gap-2 no-underline">
            <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-saffron font-heading text-xl text-on-saffron">ॐ</span>
            <span className="font-heading text-xl text-sindoor">{SITE_NAME}</span>
          </Link>
          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 md:flex">
            <Link className="pill !bg-transparent !border-transparent" href={pathFor(lang, "puja-basics", "aarti-sangrah")}>{t.aartiSangrah}</Link>
            <Link className="pill !bg-transparent !border-transparent" href={pathFor(lang, "puja-basics", "printable-aarti-sheets")}>{t.print}</Link>
          </nav>
          <div className="ml-auto hidden w-72 md:block"><SearchBox lang={lang} placeholder={t.searchPh} label={t.search} /></div>
          <Link href={twinHref} prefetch={false} hrefLang={lang === "hi" ? "en-IN" : "hi-IN"} lang={lang === "hi" ? "en-IN" : "hi-IN"} className="btn btn-ghost ml-auto md:ml-0" >{t.language}</Link>
          <ThemeToggle label={t.theme} />
        </div>
        <details className="border-t border-line md:hidden">
          <summary className="mx-auto flex min-h-[44px] max-w-6xl cursor-pointer items-center px-4 font-semibold text-tulsi">{t.menu}</summary>
          <div className="mx-auto max-w-6xl space-y-3 px-4 pb-4">
            <SearchBox lang={lang} placeholder={t.searchPh} label={t.search} />
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link href={pathFor(lang, c.key)} className="flex min-h-[44px] items-center gap-3 rounded-xl px-2 no-underline hover:bg-warm" style={{ color: "var(--ink)" }}>
                    <span style={{ color: c.accent }}><DeityIcon name={c.icon} size={22} /></span>{c.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </header>
      <main id="main">{children}</main>
      <footer className="no-print mt-16 border-t border-line bg-warm pb-24 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="mb-6 max-w-3xl text-muted">{t.footerNote}</p>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-tulsi">{t.allCategories}</h2>
          <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <li key={c.key}><Link href={pathFor(lang, c.key)} className="inline-flex min-h-[44px] items-center">{c.name[lang]}</Link></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted">
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
            <Link href={pathFor(lang, "privacy")} className="inline-flex min-h-[44px] items-center">{t.privacy}</Link>
            <Link href={pathFor(lang, "contact")} className="inline-flex min-h-[44px] items-center">{t.contact}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
