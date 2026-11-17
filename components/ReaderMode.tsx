"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/schema";

export interface ReaderVerse { dev: string; rom: string }

const L = {
  hinglish: { open: "Reader mode", close: "Band karein", font: "Font", speed: "Auto-scroll", pause: "Ruko", play: "Chalu karein", theme: "Theme", script: "Lipi", both: "Dono", dev: "Devanagari", rom: "Hinglish", tap: "Rokne ya chalane ke liye text par tap karein", off: "Band", slow: "Dheere", fast: "Tez" },
  hi: { open: "रीडर मोड", close: "बंद करें", font: "फ़ॉन्ट", speed: "ऑटो-स्क्रॉल", pause: "रुकें", play: "चालू करें", theme: "थीम", script: "लिपि", both: "दोनों", dev: "देवनागरी", rom: "हिंग्लिश", tap: "रोकने या चलाने के लिए टेक्स्ट पर टैप करें", off: "बंद", slow: "धीरे", fast: "तेज़" },
} as const;

/** Full-screen reader: large font, auto-scroll with speed slider, wake lock, light/dark, tap to pause. */
export function ReaderOverlay({ verses, title, lang, onClose }: { verses: ReaderVerse[]; title: string; lang: Lang; onClose: () => void }) {
  const t = L[lang];
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(3); // 0..10
  const [paused, setPaused] = useState(false);
  const [dark, setDark] = useState(true);
  const [script, setScript] = useState<"both" | "dev" | "rom">("both");
  const scroller = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const live = speed > 0 && !paused;

  // auto-scroll loop (fractional position kept separately because scrollTop is rounded)
  useEffect(() => {
    const el = scroller.current;
    if (!el || !live) return;
    pos.current = el.scrollTop;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (Math.abs(el.scrollTop - pos.current) > 2) pos.current = el.scrollTop; // user scrolled manually
      pos.current += speed * 9 * dt; // px/sec
      el.scrollTop = pos.current;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [live, speed]);

  // keep the screen awake while reading
  useEffect(() => {
    let lock: WakeLockSentinel | null = null;
    const request = async () => { try { lock = (await navigator.wakeLock?.request("screen")) ?? null; } catch {} };
    request();
    const onVis = () => { if (document.visibilityState === "visible") request(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { document.removeEventListener("visibilitychange", onVis); lock?.release().catch(() => {}); };
  }, []);

  // modal behaviour: scroll lock, Esc, focus
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const bg = dark ? "#120a06" : "#fff8ec";
  const fg = dark ? "#f7ebdd" : "#2b1a12";
  const muted = dark ? "#c9b5a0" : "#6b5444";
  const bar = dark ? "#2a1a12" : "#ffffff";
  const border = dark ? "#4a3224" : "#ead9bc";
  const ctl = "min-h-[44px] min-w-[44px] rounded-full border px-3 font-semibold";

  return (
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={title || t.open} tabIndex={-1} className="fixed inset-0 z-[100] flex flex-col outline-none" style={{ background: bg, color: fg }}>
      <div className="flex flex-wrap items-center gap-2 px-3 py-2" style={{ background: bar, borderBottom: `1px solid ${border}` }}>
        <button type="button" onClick={onClose} className={ctl} style={{ borderColor: border }}>✕ {t.close}</button>
        <button type="button" onClick={() => setPaused((p) => !p)} className={ctl} style={{ borderColor: border }} aria-pressed={paused}>{live ? `⏸ ${t.pause}` : `▶ ${t.play}`}</button>
        <label className="flex items-center gap-2 text-sm" style={{ color: muted }}>{t.speed}
          <input type="range" min={0} max={10} step={1} value={speed} onChange={(e) => { setSpeed(+e.target.value); if (+e.target.value > 0) setPaused(false); }} aria-valuetext={speed === 0 ? t.off : String(speed)} className="h-11 w-28 accent-[#f28c0f]" />
        </label>
        <div className="flex items-center gap-1" role="group" aria-label={t.font}>
          <button type="button" className={ctl} style={{ borderColor: border }} onClick={() => setSize((s) => Math.max(20, s - 2))} aria-label={`${t.font} −`}>A−</button>
          <button type="button" className={ctl} style={{ borderColor: border }} onClick={() => setSize((s) => Math.min(56, s + 2))} aria-label={`${t.font} +`}>A+</button>
        </div>
        <select value={script} onChange={(e) => setScript(e.target.value as typeof script)} aria-label={t.script} className="min-h-[44px] rounded-full border px-3" style={{ borderColor: border, background: bar, color: fg }}>
          <option value="both">{t.both}</option><option value="dev">{t.dev}</option><option value="rom">{t.rom}</option>
        </select>
        <button type="button" onClick={() => setDark((d) => !d)} className={ctl} style={{ borderColor: border }} aria-label={t.theme}>{dark ? "☀" : "☾"}</button>
      </div>
      <div ref={scroller} className="flex-1 overflow-y-auto px-5 py-8" onClick={() => setPaused((p) => !p)} aria-label={t.tap}>
        <div className="mx-auto max-w-3xl text-center">
          {title && <h2 className="mb-8 font-heading" style={{ fontSize: size * 0.85, color: dark ? "#ffa63d" : "#8e1b2d" }}>{title}</h2>}
          {verses.map((v, i) => (
            <div key={i} className="mb-10">
              {script !== "rom" && <p lang="hi-IN" className="font-heading whitespace-pre-line" style={{ fontSize: size, lineHeight: 1.7 }}>{v.dev}</p>}
              {script !== "dev" && <p lang="en-IN" className="mt-2 whitespace-pre-line italic" style={{ fontSize: size * 0.62, lineHeight: 1.6, color: muted }}>{v.rom}</p>}
            </div>
          ))}
          <div style={{ height: "60vh" }} aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function ReaderMode({ verses, title, lang }: { verses: ReaderVerse[]; title: string; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); trigger.current?.focus(); }, []);
  return (
    <>
      <button ref={trigger} type="button" className="btn btn-primary" onClick={() => setOpen(true)}>📖 {L[lang].open}</button>
      {open && <ReaderOverlay verses={verses} title={title} lang={lang} onClose={close} />}
    </>
  );
}
