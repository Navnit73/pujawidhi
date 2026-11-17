"use client";
import { useEffect, useMemo, useState } from "react";
import { CITIES, DEFAULT_CITY, cityByKey } from "@/lib/cities";
import { fmtTime, istDate, localPanchang, solarTimes, type ProviderResponse } from "@/lib/panchang";
import type { Lang } from "@/lib/schema";

const WEEKDAYS = {
  hinglish: ["Ravivar", "Somvar", "Mangalvar", "Budhvar", "Guruvar", "Shukravar", "Shanivar"],
  hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
};

function useCity() {
  const [city, setCity] = useState(DEFAULT_CITY);
  useEffect(() => { try { setCity(cityByKey(localStorage.getItem("city")).key); } catch {} }, []);
  const change = (k: string) => { setCity(k); try { localStorage.setItem("city", k); } catch {} };
  return [city, change] as const;
}

function CitySelect({ lang, city, onChange }: { lang: Lang; city: string; onChange: (k: string) => void }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm font-semibold">
      {lang === "hi" ? "शहर" : "Shehar"}
      <select value={city} onChange={(e) => onChange(e.target.value)} className="min-h-[44px] rounded-full border border-line bg-surface px-3 font-normal">
        {CITIES.map((c) => <option key={c.key} value={c.key}>{c.name[lang]}</option>)}
      </select>
    </label>
  );
}

function dayLabel(date: string, weekday: number, lang: Lang) {
  const [y, m, d] = date.split("-").map(Number);
  const mon = new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
  return `${WEEKDAYS[lang][weekday]}, ${d} ${mon} ${y}`;
}

/** "tak 3:12 PM" / "Ends 3:12 PM", with the day when it spills past today. */
function endsText(iso: string | undefined, date: string, hi: boolean) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const next = istDate(d) !== date;
  const t = fmtTime(d);
  return hi ? `${t}${next ? " (अगले दिन)" : ""} तक` : `${t}${next ? " (agle din)" : ""} tak`;
}

function Cell({ label, children, sub, badge, className = "" }: { label: string; children: React.ReactNode; sub?: React.ReactNode; badge?: string; className?: string }) {
  return (
    <div className={`rounded-2xl bg-surface p-4 shadow-[0_1px_2px_rgba(43,26,18,.06)] ${className}`}>
      <dt className="eyebrow flex items-center justify-between gap-2">{label}{badge && <span className="rounded-full bg-saffron px-2 py-0.5 text-[.7rem] normal-case tracking-normal text-on-saffron">{badge}</span>}</dt>
      <dd className="mt-1 text-lg font-semibold leading-snug tabular-nums text-ink">{children}</dd>
      {sub && <dd className="mt-0.5 text-sm text-muted">{sub}</dd>}
    </div>
  );
}

/** Compact strip for the homepage. Solar times are computed in the browser (tiny, no network). */
export function PanchangStrip({ lang }: { lang: Lang }) {
  const [city, setCity] = useCity();
  const [date, setDate] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const d = new Date(); setNow(d.getTime()); setDate(istDate(d)); };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  const times = useMemo(() => (date ? solarTimes(city, date) : null), [city, date]);
  // Static hosting: tithi/nakshatra are computed locally at sunrise (no server provider).
  const local = useMemo(() => (times ? localPanchang(times.sunrise) : null), [times]);
  const p = local;
  const hi = lang === "hi";
  const rahuNow = !!(times && now && now >= times.rahuStart.getTime() && now < times.rahuEnd.getTime());
  const dash = "–";
  return (
    <section aria-label={hi ? "आज का पंचांग" : "Aaj ka panchang"} className="card">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div>
          <h2 className="font-heading text-2xl text-sindoor">{hi ? "आज का पंचांग" : "Aaj ka panchang"}</h2>
          <p className="min-h-[1.5rem] text-sm text-muted">{date && times ? `${dayLabel(date, times.weekday, lang)} · IST` : "\u00a0"}</p>
        </div>
        <CitySelect lang={lang} city={city} onChange={setCity} />
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <Cell label={hi ? "तिथि" : "Tithi"} sub={p?.tithi ? <>{p.paksha?.[lang]}<br />{endsText(p.tithi.endsAt, date ?? "", hi)}</> : undefined}>{p?.tithi?.[lang] ?? dash}</Cell>
        <Cell label={hi ? "नक्षत्र" : "Nakshatra"} sub={p?.nakshatra ? endsText(p.nakshatra.endsAt, date ?? "", hi) : undefined}>{p?.nakshatra?.[lang] ?? dash}</Cell>
        <Cell label={hi ? "राहु काल" : "Rahu kaal"} badge={rahuNow ? (hi ? "अभी" : "Abhi") : undefined} className="col-span-2 sm:col-span-1">{times ? `${fmtTime(times.rahuStart)} – ${fmtTime(times.rahuEnd)}` : dash}</Cell>
        <Cell label={hi ? "सूर्योदय" : "Sunrise"}>{times ? fmtTime(times.sunrise) : dash}</Cell>
        <Cell label={hi ? "सूर्यास्त" : "Sunset"}>{times ? fmtTime(times.sunset) : dash}</Cell>
      </dl>
      <p className="mt-3 text-sm text-muted">{hi ? "तिथि और नक्षत्र सूर्योदय के समय के हैं और अनुमानित हैं; व्रत-त्योहार या मुहूर्त के लिए अपने पंचांग से मिलान करें।" : "Tithi aur nakshatra sunrise ke samay ke hain aur anumanit hain; vrat-tyohaar ya muhurat ke liye apne panchang se milaan karein."}</p>
    </section>
  );
}

export function RahuKaalTool({ lang }: { lang: Lang }) {
  const [city, setCity] = useCity();
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => setDate(istDate()), []);
  const times = useMemo(() => (date ? solarTimes(city, date) : null), [city, date]);
  const hi = lang === "hi";
  return (
    <div className="card space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <CitySelect lang={lang} city={city} onChange={setCity} />
        <label className="inline-flex items-center gap-2 text-sm font-semibold">{hi ? "तारीख़" : "Tareekh"}
          <input type="date" value={date ?? ""} onChange={(e) => e.target.value && setDate(e.target.value)} className="min-h-[44px] rounded-full border border-line bg-surface px-3 font-normal" /></label>
      </div>
      {times && (
        <div role="status" aria-live="polite">
          <p className="text-sm text-muted">{WEEKDAYS[lang][times.weekday]} · {cityByKey(city).name[lang]} · IST</p>
          <p className="mt-1 font-heading text-4xl text-sindoor">{fmtTime(times.rahuStart)} – {fmtTime(times.rahuEnd)}</p>
          <p className="mt-2 text-muted">{hi ? "सूर्योदय" : "Sunrise"} {fmtTime(times.sunrise)} · {hi ? "सूर्यास्त" : "Sunset"} {fmtTime(times.sunset)}</p>
        </div>
      )}
      <p className="text-sm text-muted">{hi ? "राहु काल दिन (सूर्योदय से सूर्यास्त) का आठवाँ हिस्सा होता है और हर वार का स्थान तय है। यह समय अनुमानित है, महत्वपूर्ण मुहूर्त के लिए पंचांग से मिलान करें।" : "Rahu kaal din (sunrise se sunset) ka aathva hissa hota hai aur har vaar ka sthaan tay hai. Yeh samay anumanit hai, mahatvapurn muhurat ke liye panchang se milaan karein."}</p>
    </div>
  );
}

export function PanchangTool({ lang }: { lang: Lang }) {
  return <PanchangStrip lang={lang} />;
}
