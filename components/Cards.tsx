import Link from "next/link";
import { CATEGORY_MAP, type Category, type CategoryKey } from "@/lib/categories";
import { pathFor, T } from "@/lib/site";
import type { PageMeta } from "@/lib/content";
import type { Lang } from "@/lib/schema";
import { DeityIcon } from "./DeityIcon";

/** "What you get" line under each link pill. */
export const WHAT_YOU_GET: Record<string, { hinglish: string; hi: string }> = {
  aarti: { hinglish: "Devanagari + Hinglish lyrics, arth, reader mode", hi: "देवनागरी + हिंग्लिश बोल, अर्थ, रीडर मोड" },
  vidhi: { hinglish: "Samagri, mantra aur step-by-step vidhi", hi: "सामग्री, मंत्र और स्टेप-बाय-स्टेप विधि" },
  path: { hinglish: "Path ki vidhi, niyam aur Hindi arth", hi: "पाठ की विधि, नियम और हिंदी अर्थ" },
  chalisa: { hinglish: "Poora paath, arth aur jaap ki vidhi", hi: "पूरा पाठ, अर्थ और जाप की विधि" },
  stotra: { hinglish: "Poora paath, arth aur jaap ki vidhi", hi: "पूरा पाठ, अर्थ और जाप की विधि" },
  mantra: { hinglish: "Mantra, arth aur jaap ki saral vidhi", hi: "मंत्र, अर्थ और जाप की सरल विधि" },
  vrat: { hinglish: "Vrat niyam, katha aur puja vidhi", hi: "व्रत नियम, कथा और पूजा विधि" },
  guide: { hinglish: "Saaf, vyavharik guide aur printable list", hi: "साफ़, व्यावहारिक गाइड और प्रिंट सूची" },
  tool: { hinglish: "Seedha kaam karne wala tool", hi: "सीधा काम करने वाला टूल" },
  hub: { hinglish: "Sabhi zaroori pages ek jagah", hi: "सभी ज़रूरी पेज एक जगह" },
  city: { hinglish: "Verified pandal details, samay aur map", hi: "जाँची हुई पंडाल जानकारी, समय और मैप" },
};
const TYPE_LABEL: Record<string, { hinglish: string; hi: string }> = {
  aarti: { hinglish: "Aarti", hi: "आरती" }, vidhi: { hinglish: "Vidhi", hi: "विधि" }, path: { hinglish: "Path", hi: "पाठ" },
  chalisa: { hinglish: "Chalisa", hi: "चालीसा" }, stotra: { hinglish: "Stotra", hi: "स्तोत्र" }, mantra: { hinglish: "Mantra", hi: "मंत्र" },
  vrat: { hinglish: "Vrat", hi: "व्रत" }, guide: { hinglish: "Guide", hi: "गाइड" }, tool: { hinglish: "Tool", hi: "टूल" },
  hub: { hinglish: "Hub", hi: "हब" }, city: { hinglish: "City", hi: "शहर" },
};

export function CategoryCard({ lang, category, count }: { lang: Lang; category: Category; count?: number }) {
  const t = T[lang];
  return (
    <article className="card card-accent flex flex-col" style={{ "--accent": category.accent } as React.CSSProperties}>
      <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${category.accent}1f`, color: category.accent }}><DeityIcon name={category.icon} /></span>
      <h3 className="font-heading text-xl text-ink">{category.name[lang]}</h3>
      <p className="mt-1 text-muted">{category.short[lang]}</p>
      <div className="mt-auto pt-4">
        <Link href={pathFor(lang, category.key)} className="pill">{category.name[lang].split(" & ")[0]} {lang === "hi" ? "हब देखें" : "hub dekhein"} →</Link>
        {count !== undefined && <p className="mt-2 text-sm text-muted">{count} {t.pages}</p>}
      </div>
    </article>
  );
}

export function PageCard({ lang, page }: { lang: Lang; page: PageMeta }) {
  const cat = CATEGORY_MAP[page.category as CategoryKey];
  const soon = page.status === "stub";
  return (
    <article className="card card-accent flex flex-col" style={{ "--accent": cat.accent } as React.CSSProperties}>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${cat.accent}1f`, color: cat.accent }}><DeityIcon name={cat.icon} size={22} /></span>
        <span className="badge">{TYPE_LABEL[page.type]?.[lang] ?? page.type}</span>
        {soon && <span className="badge">{lang === "hi" ? "जल्द आ रहा है" : "Jald aa raha hai"}</span>}
      </div>
      <h3 className="text-lg font-bold leading-snug text-ink">{page.title}</h3>
      <div className="mt-auto pt-4">
        <Link href={pathFor(lang, page.category, page.slug)} className="pill">{page.keyword} →</Link>
        <p className="mt-2 text-sm text-muted">{WHAT_YOU_GET[page.type]?.[lang]}</p>
      </div>
    </article>
  );
}
