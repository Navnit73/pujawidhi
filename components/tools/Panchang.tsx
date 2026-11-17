"use client";
import { useEffect, useMemo, useState } from "react";
import { CITIES, DEFAULT_CITY, cityByKey } from "@/lib/cities";
import { fmtTime, istDate, solarTimes, type ProviderResponse } from "@/lib/panchang";
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

function useProvider(city: string, date: string) {
  const [data, setData] = useState<ProviderResponse | null>(null);
  useEffect(() => {
    let live = true;
    fetch(`/api/panchang?city=${city}&date=${date}`).then((r) => r.json()).then((j) => live && setData(j.panchang ?? null)).catch(() => {});
    return () => { live = false; };
  }, [city, date]);
  return data;
}

/** Compact strip for the homepage. Solar times are computed in the browser (tiny, no network). */
export function PanchangStrip({ lang }: { lang: Lang }) {
  const [city, setCity] = useCity();
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => setDate(istDate()), []);
  const times = useMemo(() => (date ? solarTimes(city, date) : null), [city, date]);
  const p = useProvider(city, date ?? "");
  const hi = lang === "hi";
  const cell = "rounded-2xl bg-surface border border-line px-4 py-3 min-w-[9rem]";
  return (
    <section aria-label={hi ? "आज का पंचांग" : "Aaj ka panchang"} className="card !bg-warm">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-xl text-sindoor">{hi ? "आज का पंचांग" : "Aaj ka panchang"}</h2>
        <CitySelect lang={lang} city={city} onChange={setCity} />
        {date && times && <span className="text-sm text-muted">{WEEKDAYS[lang][times.weekday]} · IST</span>}
      </div>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <div className={cell}><dt className="eyebrow">{hi ? "तिथि" : "Tithi"}</dt><dd>{p?.tithi?.[lang] ?? "-"}</dd></div>
        <div className={cell}><dt className="eyebrow">{hi ? "नक्षत्र" : "Nakshatra"}</dt><dd>{p?.nakshatra?.[lang] ?? "-"}</dd></div>
        <div className={cell}><dt className="eyebrow">{hi ? "राहु काल" : "Rahu kaal"}</dt><dd>{times ? `${fmtTime(times.rahuStart)} – ${fmtTime(times.rahuEnd)}` : "-"}</dd></div>
        <div className={cell}><dt className="eyebrow">{hi ? "सूर्योदय" : "Sunrise"}</dt><dd>{times ? fmtTime(times.sunrise) : "-"}</dd></div>
        <div className={cell}><dt className="eyebrow">{hi ? "सूर्यास्त" : "Sunset"}</dt><dd>{times ? fmtTime(times.sunset) : "-"}</dd></div>
      </dl>
      {!p && <p className="mt-3 text-sm text-muted">{hi ? "तिथि और नक्षत्र लाइसेंस प्राप्त पंचांग स्रोत से आएँगे। अभी सिर्फ़ सूर्य आधारित समय दिख रहे हैं।" : "Tithi aur nakshatra licensed panchang source se aayenge. Abhi sirf surya-aadharit samay dikh rahe hain."}</p>}
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
