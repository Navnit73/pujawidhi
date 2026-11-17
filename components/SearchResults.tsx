"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { match, SearchBox } from "./SearchBox";
import type { Lang } from "@/lib/schema";

export function SearchResults({ lang }: { lang: Lang }) {
  const q = useSearchParams().get("q") ?? "";
  const [items, setItems] = useState<ReturnType<typeof match>>([]);
  useEffect(() => {
    fetch("/search-index.json").then((r) => r.json()).then((idx) => setItems(match(idx[lang], q, 30))).catch(() => {});
  }, [q, lang]);
  const hi = lang === "hi";
  return (
    <div className="space-y-4">
      <SearchBox lang={lang} placeholder={hi ? "जैसे: गणेश जी की आरती" : "Jaise: Ganesh ji ki aarti"} label={hi ? "खोजें" : "Search"} large />
      {q && <p className="text-muted">“{q}”</p>}
      <ul className="space-y-2">{items.map((r) => <li key={r.u}><Link href={r.u} className="card !p-4 block no-underline"><span className="font-semibold text-ink">{r.t}</span><span className="block text-sm text-muted">{r.c}</span></Link></li>)}</ul>
    </div>
  );
}
