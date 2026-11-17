import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { CATEGORIES } from "@/lib/categories";
import { allPages } from "@/lib/content";
import { formatDate, pathFor } from "@/lib/site";
import type { Lang } from "@/lib/schema";

/** <AartiIndex /> : every aarti page grouped by category. Pages still in stub state are labelled. */
export function AartiIndex({ lang }: { lang: Lang }) {
  const pages = allPages(lang).map((p) => p.meta).filter((m) => m.type === "aarti");
  const soon = lang === "hi" ? "जल्द आ रहा है" : "jald aa raha hai";
  return (
    <div className="grid gap-4 sm:grid-cols-2 not-prose">
      {CATEGORIES.map((c) => {
        const list = pages.filter((p) => p.category === c.key);
        if (!list.length) return null;
        return (
          <section key={c.key} className="card card-accent !p-5" style={{ "--accent": c.accent } as React.CSSProperties}>
            <h3 className="font-heading text-lg">{c.name[lang]}</h3>
            <ul className="mt-2">
              {list.map((m) => (
                <li key={m.slug}>
                  <Link href={pathFor(lang, m.category, m.slug)} className="flex min-h-[44px] flex-wrap items-center gap-x-2">
                    {m.title}{m.status === "stub" && <span className="badge">{soon}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

interface Festival { id: string; name: { hinglish: string; hi: string }; date: string | null; path: string }
export function readFestivals(): Festival[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/festivals.json"), "utf8")).festivals;
}

/** Festival list. Dates come only from data/festivals.json (null until filled from a panchang source). */
export function FestivalCalendar({ lang }: { lang: Lang }) {
  const fs_ = readFestivals();
  return (
    <ul className="grid gap-3 sm:grid-cols-2 not-prose">
      {fs_.map((f) => (
        <li key={f.id} className="card !p-4">
          <Link href={(lang === "hi" ? "/hi" : "") + f.path} className="font-bold">{f.name[lang]}</Link>
          <p className="text-sm text-muted">{f.date ? formatDate(f.date, lang) : lang === "hi" ? "तिथि पंचांग स्रोत से भरी जानी है" : "Tareekh panchang source se bhari jaani hai"}</p>
        </li>
      ))}
    </ul>
  );
}
