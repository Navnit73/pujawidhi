import React from "react";
import { ReaderMode } from "../ReaderMode";
import type { Lang } from "@/lib/schema";

/** Declarative only: AartiLyrics reads these props and renders them. */
export function Verse(_props: { dev: string; rom: string; children?: React.ReactNode }) {
  return null;
}
/** Meaning (arth) block, used inside a <Verse> or on its own. */
export function Arth({ children }: { children?: React.ReactNode }) {
  return <p className="rounded-xl bg-warm px-3 py-2 text-[.95rem]">{children}</p>;
}

export function AartiLyrics({ children, title = "", lang = "hinglish" }: { children?: React.ReactNode; title?: string; lang?: Lang }) {
  const verses = React.Children.toArray(children)
    .filter((c): c is React.ReactElement<{ dev?: string; rom?: string; children?: React.ReactNode }> => React.isValidElement(c))
    .filter((c) => typeof c.props.dev === "string" && c.props.dev.trim())
    .map((c) => ({ dev: c.props.dev as string, rom: (c.props.rom as string) ?? "", arth: c.props.children }));
  if (!verses.length) return null;
  return (
    <section id="aarti-lyrics" aria-label={title || "Lyrics"} className="not-prose">
      <div className="mb-4 no-print"><ReaderMode verses={verses.map(({ dev, rom }) => ({ dev, rom }))} title={title} lang={lang} /></div>
      <ol className="space-y-5">
        {verses.map((v, i) => (
          <li key={i} className="card !p-5">
            <div className="grid gap-3 md:grid-cols-2 md:gap-8">
              <p lang="hi-IN" className="verse-dev">{v.dev}</p>
              <p lang="en-IN" className="verse-rom">{v.rom}</p>
            </div>
            {v.arth ? <div className="mt-3">{v.arth}</div> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
