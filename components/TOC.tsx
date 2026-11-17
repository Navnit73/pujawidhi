"use client";
import { useEffect, useRef, useState } from "react";

export function TOC({ headings, title, variant }: { headings: { id: string; text: string }[]; title: string; variant: "mobile" | "desktop" }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const mobile = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!headings.length) return;
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  const list = (onClick?: () => void) => (
    <ul className="space-y-1">
      {headings.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} onClick={onClick} aria-current={active === h.id ? "location" : undefined}
            className={`block min-h-[44px] rounded-xl px-3 py-2 no-underline ${active === h.id ? "bg-warm font-bold text-sindoor" : "text-ink hover:bg-warm"}`}>
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
  if (variant === "mobile") {
    return (
      <details ref={mobile} className="sticky top-0 z-40 -mx-4 border-b border-line bg-bg px-4 lg:hidden no-print">
        <summary className="flex min-h-[48px] cursor-pointer items-center font-semibold text-tulsi">{title}</summary>
        <div className="max-h-[60vh] overflow-auto pb-3">{list(() => mobile.current?.removeAttribute("open"))}</div>
      </details>
    );
  }
  return (
    <nav aria-label={title} className="card hidden lg:block no-print">
      <h2 className="eyebrow mb-3">{title}</h2>
      {list()}
    </nav>
  );
}
