"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA = process.env.NEXT_PUBLIC_GA_ID;
type Choice = "accepted" | "declined" | null;

/** DPDP-style notice: GA4 loads only after an explicit "accept". No other trackers. Renders nothing if GA is not configured. */
export function ConsentGate({ lang, privacyHref }: { lang: "hinglish" | "hi"; privacyHref: string }) {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setChoice((localStorage.getItem("consent") as Choice) ?? null); } catch {}
    setReady(true);
  }, []);
  if (!GA) return null;
  const save = (c: Exclude<Choice, null>) => { try { localStorage.setItem("consent", c); } catch {} setChoice(c); };
  const hi = lang === "hi";
  return (
    <>
      {choice === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {ready && choice === null && (
        <div role="dialog" aria-label="Analytics" className="no-print fixed inset-x-3 bottom-20 z-[90] mx-auto max-w-xl rounded-2xl border border-line bg-surface p-4 shadow-lg md:bottom-4">
          <p className="text-sm">{hi ? "हम साइट बेहतर बनाने के लिए सिर्फ़ गुमनाम Google Analytics उपयोग करते हैं, और केवल आपकी सहमति के बाद।" : "Hum site behtar banane ke liye sirf anonymous Google Analytics use karte hain, aur sirf aapki sehmati ke baad."} <a href={privacyHref}>{hi ? "गोपनीयता" : "Privacy"}</a></p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn btn-primary" onClick={() => save("accepted")}>{hi ? "ठीक है" : "Theek hai"}</button>
            <button type="button" className="btn btn-secondary" onClick={() => save("declined")}>{hi ? "नहीं" : "Nahi"}</button>
          </div>
        </div>
      )}
    </>
  );
}
