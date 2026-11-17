"use client";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Menu button (lives in the floating bar) + dropdown panel anchored under the bar. Closes on link click, route change, Esc or outside tap. */
export function NavMenu({ label, closeLabel, children }: { label: string; closeLabel: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node) && !(e.target as HTMLElement).closest("[data-nav-bar]")) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);
  return (
    <span ref={root} className="contents">
      <button ref={btn} type="button" className="btn btn-ghost !px-3" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} aria-label={open ? closeLabel : label}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
        <span className="hidden lg:inline">{label}</span>
      </button>
      <div id={id} hidden={!open} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}
        className="absolute inset-x-0 top-full z-[70] mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-line bg-surface p-4 shadow-float md:left-auto md:w-[26rem]">
        {children}
      </div>
    </span>
  );
}
