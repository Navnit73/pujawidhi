import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { frontmatterSchema, type Frontmatter, type Lang } from "./schema";
import { extractHeadings } from "./slug";
import { pathFor } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content");
const FILE_LANG: Record<Lang, string> = { hinglish: "hinglish", hi: "hi" };

export interface PageMeta extends Frontmatter {
  slug: string;
}
export interface Page {
  meta: PageMeta;
  body: string;
  headings: { id: string; text: string }[];
}

const PRIORITY_ORDER = { P1: 0, P2: 1, P3: 2, P4: 3, V: 4 } as const;
export const byPriority = (a: PageMeta, b: PageMeta) =>
  PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || b.volume - a.volume || a.slug.localeCompare(b.slug);

const cache = new Map<string, Page[]>();

function readAll(lang: Lang): Page[] {
  const hit = cache.get(lang);
  if (hit) return hit;
  const pages: Page[] = [];
  for (const cat of fs.readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue;
    const dir = path.join(CONTENT_DIR, cat.name);
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(`.${FILE_LANG[lang]}.mdx`)) continue;
      const slug = f.slice(0, -`.${FILE_LANG[lang]}.mdx`.length);
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      const meta = { ...frontmatterSchema.parse(data), slug };
      pages.push({ meta, body: content, headings: extractHeadings(content) });
    }
  }
  cache.set(lang, pages);
  return pages;
}

export const allPages = (lang: Lang) => readAll(lang);
export const getPage = (lang: Lang, category: string, slug: string) =>
  readAll(lang).find((p) => p.meta.category === category && p.meta.slug === slug);
export const pagesInCategory = (lang: Lang, category: string) =>
  readAll(lang).filter((p) => p.meta.category === category).map((p) => p.meta).sort(byPriority);
export const findBySlug = (lang: Lang, slug: string) => readAll(lang).find((p) => p.meta.slug === slug)?.meta;

/** Indexable = published, and (for /local) verified via `indexable: true`. */
export function isIndexable(m: Pick<Frontmatter, "status" | "category" | "indexable">): boolean {
  if (m.status !== "published") return false;
  if (m.category === "local") return m.indexable === true;
  return true;
}

export const urlOf = (lang: Lang, m: Pick<PageMeta, "category" | "slug">) => pathFor(lang, m.category, m.slug);
export const twinLang = (l: Lang): Lang => (l === "hi" ? "hinglish" : "hi");

const TOOLS_BY_TYPE: Record<string, string[]> = {
  aarti: ["aarti-reader-mode", "printable-aarti-sheets"],
  chalisa: ["aarti-reader-mode", "printable-aarti-sheets"],
  stotra: ["aarti-reader-mode"],
  path: ["aarti-reader-mode"],
  vidhi: ["puja-samagri-master-list"],
  vrat: ["puja-samagri-master-list"],
  mantra: ["aarti-reader-mode"],
  guide: ["puja-samagri-master-list"],
  city: ["aarti-sangrah"],
  hub: ["aarti-sangrah"],
  tool: ["aarti-sangrah"],
};

/** Related set: frontmatter `related` first, then up to 3 siblings (same category), plus the matching tools. */
export function relatedFor(lang: Lang, m: PageMeta) {
  const all = readAll(lang).map((p) => p.meta);
  const explicit = m.related.map((s) => all.find((x) => x.slug === s)).filter((x): x is PageMeta => !!x);
  const sameCat = all.filter((x) => x.category === m.category && x.slug !== m.slug).sort(byPriority);
  // Prefer siblings whose priority is closest to this page's, then the same type.
  const siblings = sameCat
    .filter((x) => !explicit.includes(x))
    .sort((a, b) => Number(b.type === m.type) - Number(a.type === m.type) || byPriority(a, b))
    .slice(0, 3);
  const tools = (TOOLS_BY_TYPE[m.type] ?? [])
    .filter((s) => s !== m.slug)
    .map((s) => all.find((x) => x.slug === s))
    .filter((x): x is PageMeta => !!x);
  return { explicit, siblings, tools };
}
