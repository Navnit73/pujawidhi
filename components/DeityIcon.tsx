import type { IconKey } from "@/lib/categories";

/** One distinct glyph per deity group (24x24, stroke icons, inherit currentColor). */
const PATHS: Record<IconKey, React.ReactNode> = {
  trishul: <><path d="M12 2v20" /><path d="M6 4v5a6 6 0 0 0 12 0V4" /><path d="M9 21h6" /></>,
  diya: <><path d="M3 14h18a9 6 0 0 1-18 0z" /><path d="M12 3c2.5 3 3 5 0 8-3-3-2.5-5 0-8z" /></>,
  ganesh: <><circle cx="12" cy="9" r="5" /><path d="M5 7c-3 1-3 6 1 7M19 7c3 1 3 6-1 7" /><path d="M12 14v4a2.5 2.5 0 0 0 5 0" /><path d="M9.5 13.5l-1 3" /></>,
  shiv: <><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /><path d="M12 12h.01M3 21c3-3 6-3 9 0s6 3 9 0" /></>,
  gada: <><circle cx="12" cy="7" r="4.5" /><path d="M12 11.5V21M9 21h6" /></>,
  lotus: <><path d="M12 20c-4-2-6-6-5-10 2 1 4 3 5 6 1-3 3-5 5-6 1 4-1 8-5 10z" /><path d="M12 16c-1-3-1-7 0-11 1 4 1 8 0 11z" /></>,
  flute: <><path d="M3 18L20 5" /><circle cx="8" cy="14.5" r=".8" /><circle cx="11" cy="12.2" r=".8" /><circle cx="14" cy="9.9" r=".8" /><path d="M18 3c3 0 3 5 0 5-2.5 0-2.5-5 0-5z" /></>,
  bell: <><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6z" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  kalash: <><path d="M8 4h8M9 4c-3 3-3 8 0 10h6c3-2 3-7 0-10" /><path d="M10 14l-1 6h6l-1-6" /><path d="M12 4V2" /></>,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
};

export function DeityIcon({ name, size = 28, className = "" }: { name: IconKey; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {PATHS[name]}
    </svg>
  );
}
