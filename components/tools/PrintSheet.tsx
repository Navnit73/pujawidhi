"use client";
import { useMemo, useRef, useState } from "react";
import { printBlock } from "@/lib/print";
import { useLyrics } from "./lyrics";
import type { Lang } from "@/lib/schema";

/**
 * Print-sheet builder. Pure print CSS: picks A4/A5, 1 or 2 aartis per page, big black-on-white type.
 * No PDF library: "Save as PDF" in the print dialog makes the PDF.
 */
export function PrintSheet({ lang }: { lang: Lang }) {
  const { data, error } = useLyrics();
  const [picked, setPicked] = useState<string[]>([]);
  const [paper, setPaper] = useState<"A4" | "A5">("A4");
  const [per, setPer] = useState<1 | 2>(1);
  const [script, setScript] = useState<"both" | "dev" | "rom">("both");
  const [size, setSize] = useState(22);
  const sheet = useRef<HTMLDivElement>(null);
  const hi = lang === "hi";
  const keys = useMemo(() => Object.keys(data ?? {}), [data]);

  if (error) return <p className="card">{hi ? "आरती लोड नहीं हो पाईं।" : "Aartiyan load nahi ho payin."}</p>;
  if (!data) return <p className="card text-muted">…</p>;
  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const s = per === 2 ? size * 0.78 : size;

  return (
    <div className="space-y-6">
      <style>{`@media print { @page { size: ${paper}; margin: ${paper === "A5" ? "9mm" : "14mm"}; } }`}</style>
      <div className="card no-print space-y-5">
        <fieldset>
          <legend className="eyebrow mb-2">{hi ? "आरती चुनें" : "Aarti chunein"}</legend>
          <ul className="grid gap-1 sm:grid-cols-2">
            {keys.map((k) => (
              <li key={k}>
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl px-2 hover:bg-warm">
                  <input type="checkbox" className="h-5 w-5 accent-[#3f6b2b]" checked={picked.includes(k)} onChange={() => toggle(k)} />{data[k].title[lang]}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-4">
          <label className="grid gap-1 text-sm font-semibold">{hi ? "पेपर" : "Paper"}
            <select className="min-h-[44px] rounded-xl border border-line bg-surface px-3" value={paper} onChange={(e) => setPaper(e.target.value as "A4" | "A5")}><option>A4</option><option>A5</option></select></label>
          <label className="grid gap-1 text-sm font-semibold">{hi ? "प्रति पेज" : "Per page"}
            <select className="min-h-[44px] rounded-xl border border-line bg-surface px-3" value={per} onChange={(e) => setPer(+e.target.value as 1 | 2)}><option value={1}>1 {hi ? "आरती" : "aarti"}</option><option value={2}>2 {hi ? "आरती" : "aartis"}</option></select></label>
          <label className="grid gap-1 text-sm font-semibold">{hi ? "लिपि" : "Lipi"}
            <select className="min-h-[44px] rounded-xl border border-line bg-surface px-3" value={script} onChange={(e) => setScript(e.target.value as typeof script)}><option value="both">{hi ? "दोनों" : "Dono"}</option><option value="dev">{hi ? "देवनागरी" : "Devanagari"}</option><option value="rom">Hinglish</option></select></label>
          <label className="grid gap-1 text-sm font-semibold">{hi ? "फ़ॉन्ट" : "Font"} ({size}px)
            <input type="range" min={16} max={34} value={size} onChange={(e) => setSize(+e.target.value)} className="h-11 accent-[#c2410c]" /></label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" disabled={!picked.length} onClick={() => printBlock(sheet.current)}>🖨 {hi ? "प्रिंट / PDF" : "Print / PDF"}</button>
          <span className="text-sm text-muted">{hi ? "प्रिंट विंडो में 'Save as PDF' चुनने पर PDF बनती है।" : "Print window mein 'Save as PDF' chunne par PDF banti hai."}</span>
        </div>
      </div>

      <div ref={sheet} aria-label={hi ? "प्रिंट पूर्वावलोकन" : "Print preview"}>
        {picked.length === 0 && <p className="no-print text-muted">{hi ? "ऊपर से कम से कम एक आरती चुनें।" : "Upar se kam se kam ek aarti chunein."}</p>}
        {picked.map((k, i) => (
          <section key={k} className="mb-6 rounded-2xl border border-line bg-white p-6 text-black" style={{ breakInside: "avoid", breakAfter: per === 1 || i % 2 === 1 ? "page" : "auto" }}>
            <h2 className="mb-3 text-center font-heading" style={{ fontSize: s * 1.2, color: "#000" }}>{data[k].title[lang]}</h2>
            {data[k].verses.map((v, vi) => (
              <div key={vi} className="mb-3 text-center" style={{ breakInside: "avoid" }}>
                {script !== "rom" && <p lang="hi-IN" className="whitespace-pre-line font-heading" style={{ fontSize: s, lineHeight: 1.6 }}>{v.dev}</p>}
                {script !== "dev" && <p lang="en-IN" className="whitespace-pre-line italic" style={{ fontSize: s * 0.7, lineHeight: 1.45 }}>{v.rom}</p>}
              </div>
            ))}
            <p className="only-print mt-2 text-center text-xs">pujawidhi.co.in</p>
          </section>
        ))}
      </div>
    </div>
  );
}
