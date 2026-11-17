"use client";
import { useState } from "react";
import { ReaderOverlay } from "../ReaderMode";
import { useLyrics } from "./lyrics";
import type { Lang } from "@/lib/schema";

export function ReaderPicker({ lang }: { lang: Lang }) {
  const { data, error } = useLyrics();
  const [slug, setSlug] = useState<string | null>(null);
  const hi = lang === "hi";
  if (error) return <p className="card">{hi ? "आरती लोड नहीं हो पाईं। कृपया दोबारा कोशिश करें।" : "Aartiyan load nahi ho payin. Dobara koshish karein."}</p>;
  if (!data) return <p className="card text-muted">…</p>;
  const keys = Object.keys(data);
  return (
    <div className="card">
      <p className="mb-3">{hi ? "आरती चुनें और रीडर मोड खोलें। जैसे-जैसे और आरती प्रकाशित होंगी, वे यहाँ जुड़ती जाएँगी।" : "Aarti chunein aur reader mode kholein. Jaise-jaise aur aartiyan publish hongi, woh yahan judti jayengi."}</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {keys.map((k) => (
          <li key={k}><button type="button" onClick={() => setSlug(k)} className="btn btn-secondary w-full !justify-start">📖 {data[k].title[lang]}</button></li>
        ))}
      </ul>
      {slug && <ReaderOverlay verses={data[slug].verses} title={data[slug].title[lang]} lang={lang} onClose={() => setSlug(null)} />}
    </div>
  );
}
