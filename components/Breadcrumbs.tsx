import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print mb-4 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>›</span>}
            {i < items.length - 1 ? <Link href={it.path} className="inline-flex min-h-[44px] min-w-[44px] items-center">{it.name}</Link> : <span aria-current="page" className="font-semibold text-ink">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
