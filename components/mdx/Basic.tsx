import Link from "next/link";
import React from "react";

/** <QuickAnswer rows={[{label,value}]} /> */
export function QuickAnswer({ rows = [] }: { rows?: { label: string; value: string }[] }) {
  return (
    <dl className="card !bg-warm grid gap-3 sm:grid-cols-2" style={{ borderColor: "var(--gold)" }}>
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="eyebrow">{r.label}</dt>
          <dd className="mt-0.5">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="steps">{children}</ol>;
}
export function Step({ title, children }: { title?: string; children?: React.ReactNode }) {
  return (
    <li className="step">
      {title && <h3 className="!mt-0 text-lg font-bold">{title}</h3>}
      <div className="mt-1 space-y-3">{children}</div>
    </li>
  );
}

/** <Mantra dev rom arth /> : Devanagari + Hinglish + meaning. Spans only: MDX often puts it inside a paragraph. */
export function Mantra({ dev, rom, arth }: { dev: string; rom: string; arth?: string }) {
  return (
    <span className="my-3 block rounded-2xl border border-line bg-warm p-4">
      <span lang="hi-IN" className="verse-dev block !text-[1.25rem]">{dev}</span>
      <span lang="en-IN" className="verse-rom mt-1 block">{rom}</span>
      {arth && <span className="mt-2 block text-sm"><strong>Arth:</strong> {arth}</span>}
    </span>
  );
}

export function FAQ({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}
export function Q({ q, children }: { q: string; children?: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border border-line bg-surface p-4 open:bg-warm">
      <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-3 font-semibold">
        <span>{q}</span><span aria-hidden className="text-saffron-text transition group-open:rotate-45 text-2xl leading-none">+</span>
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

/** Markdown links: internal ones use next/link (client-side nav + prefetch). */
export function MdLink({ href = "", children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  if (href.startsWith("#")) return <a href={href} {...rest}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}
