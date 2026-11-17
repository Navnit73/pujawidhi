import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { pathFor, SITE_NAME, T } from "@/lib/site";
import type { Lang } from "@/lib/schema";
import { SearchBox } from "./SearchBox";
import { ThemeToggle } from "./ThemeToggle";
import { DeityIcon } from "./DeityIcon";
import { NavMenu } from "./NavMenu";

export function Shell({ lang, twinHref, children }: { lang: Lang; twinHref: string; children: React.ReactNode }) {
  const t = T[lang];
  const home = pathFor(lang);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-on-saffron">{t.skip}</a>
      <header className="no-print pointer-events-none sticky top-0 z-[60] px-3 pt-3 sm:px-4">
        <div data-nav-bar className="nav-float pointer-events-auto relative mx-auto flex max-w-6xl items-center gap-2 rounded-full py-2 pl-3 pr-2 sm:gap-3 sm:pl-4">
          <Link href={home} className="flex min-h-[44px] min-w-0 items-center gap-2 no-underline" aria-label={SITE_NAME}>
            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron font-heading text-xl text-on-saffron">ॐ</span>
            <span className="truncate font-heading text-lg text-sindoor sm:text-xl">{SITE_NAME}</span>
          </Link>
          <nav aria-label="Primary" className="ml-2 hidden items-center gap-1 lg:flex">
            <Link className="pill !bg-transparent !border-transparent" href={pathFor(lang, "puja-basics", "aarti-sangrah")}>{t.aartiSangrah}</Link>
            <Link className="pill !bg-transparent !border-transparent" href={pathFor(lang, "puja-basics", "printable-aarti-sheets")}>{t.print}</Link>
          </nav>
          <div className="ml-auto hidden w-64 md:block xl:w-72"><SearchBox lang={lang} placeholder={t.searchPh} label={t.search} /></div>
          <Link href={twinHref} prefetch={false} hrefLang={lang === "hi" ? "en-IN" : "hi-IN"} lang={lang === "hi" ? "en-IN" : "hi-IN"} className="btn btn-ghost ml-auto !px-3 md:ml-0 sm:!px-4">{t.language}</Link>
          <span className="hidden sm:contents"><ThemeToggle label={t.theme} /></span>
          <NavMenu label={t.menu} closeLabel={t.closeMenu}>
            <div className="space-y-3">
              <div className="md:hidden"><SearchBox lang={lang} placeholder={t.searchPh} label={t.search} inline /></div>
              <div className="grid grid-cols-2 gap-2 lg:hidden">
                <Link href={pathFor(lang, "puja-basics", "aarti-sangrah")} className="btn btn-primary !text-center">{t.aartiSangrah}</Link>
                <Link href={pathFor(lang, "puja-basics", "printable-aarti-sheets")} className="btn btn-secondary">{t.print}</Link>
              </div>
              <p className="eyebrow px-2 pt-1">{t.allCategories}</p>
              <ul className="grid grid-cols-1 gap-1 min-[420px]:grid-cols-2 md:grid-cols-1">
                {CATEGORIES.map((c) => (
                  <li key={c.key}>
                    <Link href={pathFor(lang, c.key)} className="flex min-h-[44px] items-center gap-3 rounded-xl px-2 text-ink no-underline hover:bg-card">
                      <span className="icon-chip h-9 w-9 shrink-0 rounded-xl" style={{ "--chip": c.accent } as React.CSSProperties}><DeityIcon name={c.icon} size={20} /></span>{c.name[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-line px-2 pt-3 sm:hidden"><span className="text-sm font-semibold">{t.theme}</span><ThemeToggle label={t.theme} /></div>
            </div>
          </NavMenu>
        </div>
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
            <Link href={pathFor(lang, "about")} className="inline-flex min-h-[44px] min-w-[44px] items-center">{t.about}</Link>
            <Link href={pathFor(lang, "privacy")} className="inline-flex min-h-[44px] min-w-[44px] items-center">{t.privacy}</Link>
            <Link href={pathFor(lang, "terms")} className="inline-flex min-h-[44px] min-w-[44px] items-center">{t.terms}</Link>
            <Link href={pathFor(lang, "contact")} className="inline-flex min-h-[44px] min-w-[44px] items-center">{t.contact}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
