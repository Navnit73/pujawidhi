"use client";
import { useEffect, useState } from "react";
import { istDate } from "@/lib/panchang";

/** Days until an IST calendar date (YYYY-MM-DD). Computed in the browser so a static page never goes stale. */
export function Countdown({ date, lang }: { date: string; lang: "hinglish" | "hi" }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const [y, m, d] = date.split("-").map(Number);
    const [ty, tm, td] = istDate().split("-").map(Number);
    setDays(Math.round((Date.UTC(y, m - 1, d) - Date.UTC(ty, tm - 1, td)) / 86400000));
  }, [date]);
  if (days === null) return null;
  if (days < 0) return null;
  const n = days === 0 ? (lang === "hi" ? "आज" : "Aaj") : `${days} ${lang === "hi" ? "दिन" : days === 1 ? "din" : "din"}`;
  return <span className="font-bold text-sindoor">{n}</span>;
}
