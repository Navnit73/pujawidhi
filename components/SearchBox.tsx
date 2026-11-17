"use client";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Lang } from "@/lib/schema";

interface Item { t: string; u: string; c: string; k: string; s: number; p: string }
type Index = Record<Lang, Item[]>;

let cache: Promise<Index> | null = null;
const loadIndex = () => (cache ??= fetch("/search-index.json").then((r) => r.json()));

const PRI: Record<string, number> = { P1: 0, P2: 1, P3: 2, P4: 3, V: 4 };

/** Tiny matcher: every token must appear; title hits and whole-word hits score higher; published beats stubs. */
export function match(items: Item[], q: string, limit = 8): Item[] {
  const tokens = q.toLowerCase().normalize("NFC").split(/[\s,]+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: [number, Item][] = [];
  for (const it of items) {
    const title = it.t.toLowerCase();
    let score = 0;
    let ok = true;
    for (const tok of tokens) {
      const inTitle = title.indexOf(tok);
      const inKey = it.k.indexOf(tok);
      if (inTitle < 0 && inKey < 0) { ok = false; break; }
      score += inTitle >= 0 ? 10 - Math.min(inTitle, 9) / 2 : 4;
      if (new RegExp(`(^|\\s)${tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "u").test(title)) score += 3;
    }
    if (!ok) continue;
    score += it.s ? 6 : 0;
    score -= (PRI[it.p] ?? 4) * 0.5;
    scored.push([score, it]);
  }
  return scored.sort((a, b) => b[0] - a[0]).slice(0, limit).map((x) => x[1]);
}

export function SearchBox({ lang, placeholder, label, large = false, inline = false }: { lang: Lang; placeholder: string; label: string; large?: boolean; inline?: boolean }) {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Index | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const id = useId();
  const box = useRef<HTMLDivElement>(null);
  const results = useMemo(() => (index ? match(index[lang], q) : []), [index, lang, q]);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={box} className="relative w-full no-print" role="search">
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" value={q} placeholder={placeholder}
        onFocus={() => { setOpen(true); loadIndex().then(setIndex).catch(() => {}); }}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
        role="combobox" aria-expanded={open && !!q.trim()} aria-controls={`${id}-list`} aria-autocomplete="list" aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, results.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
          if (e.key === "Enter") { const t = results[active >= 0 ? active : 0]; if (t) window.location.href = t.u; }
        }}
        className={`w-full rounded-full border border-line bg-surface text-ink placeholder:text-muted px-5 ${large ? "min-h-[56px] text-lg" : "min-h-[44px]"}`}
      />
      {open && q.trim() && (
        <ul className={`${inline ? "mt-2" : "absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto shadow-float"} rounded-2xl border border-line bg-surface p-2`} id={`${id}-list`} role="listbox">
          {index === null ? <li className="px-3 py-2 text-muted">…</li> : results.length === 0 ? (
            <li className="px-3 py-2 text-muted">{lang === "hi" ? "कोई परिणाम नहीं" : "Koi result nahi mila"}</li>
          ) : results.map((r, i) => (
            <li key={r.u} role="option" id={`${id}-opt-${i}`} aria-selected={i === active}>
              <Link href={r.u} tabIndex={-1} className={`block min-h-[44px] rounded-xl px-3 py-2 no-underline hover:bg-warm ${i === active ? "bg-warm" : ""}`} onClick={() => setOpen(false)}>
                <span className="block font-semibold text-ink">{r.t}</span>
                <span className="block text-sm text-muted">{r.c}{r.s ? "" : lang === "hi" ? " · जल्द आ रहा है" : " · jald aa raha hai"}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
