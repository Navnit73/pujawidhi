"use client";
import { useId, useRef, useState } from "react";
import { printBlock } from "@/lib/print";

interface Item { name: string; qty?: string; note?: string }
interface Group { title: string; items: Item[] }

/** Checklist with quantities. Tick state lives in React state. Print and "PDF" both use the browser print dialog. */
export function Samagri({ id, items, groups, title, lang = "hinglish" }: { id?: string; items?: Item[]; groups?: Group[]; title?: string; lang?: "hinglish" | "hi" }) {
  const gs: Group[] = groups ?? [{ title: "", items: items ?? [] }];
  const uid = useId();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const ref = useRef<HTMLDivElement>(null);
  const total = gs.reduce((n, g) => n + g.items.length, 0);
  const ticked = Object.values(done).filter(Boolean).length;
  if (!total) return null;
  const hi = lang === "hi";
  return (
    <div id={id} ref={ref} className="card">
      <div className="no-print mb-4 flex flex-wrap items-center gap-2">
        <p className="mr-auto font-semibold" aria-live="polite">✓ {ticked}/{total}</p>
        <button type="button" className="btn btn-secondary" onClick={() => printBlock(ref.current)}>🖨 {hi ? "प्रिंट" : "Print"}</button>
        <button type="button" className="btn btn-primary" onClick={() => printBlock(ref.current)} title={hi ? "प्रिंट विंडो में 'Save as PDF' चुनें" : "Print window mein 'Save as PDF' chunein"}>⬇ {hi ? "PDF डाउनलोड" : "PDF download"}</button>
      </div>
      <p className="only-print mb-2 text-lg font-bold">{title ?? "Puja samagri"} · pujawidhi.co.in</p>
      {gs.map((g, gi) => (
        <fieldset key={gi} className="mb-5 last:mb-0">
          {g.title && <legend className="eyebrow mb-2">{g.title}</legend>}
          <ul className="space-y-1">
            {g.items.map((it, ii) => {
              const k = `${gi}-${ii}`;
              return (
                <li key={k}>
                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-warm">
                    <input type="checkbox" checked={!!done[k]} onChange={(e) => setDone((d) => ({ ...d, [k]: e.target.checked }))} className="mt-1 h-5 w-5 shrink-0 accent-[#3f6b2b]" aria-describedby={`${uid}-${k}`} />
                    <span id={`${uid}-${k}`} className={done[k] ? "text-muted line-through" : ""}>
                      <span className="font-semibold">{it.name}</span>
                      {it.qty && <span className="text-muted"> · {it.qty}</span>}
                      {it.note && <span className="block text-sm text-muted">{it.note}</span>}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
