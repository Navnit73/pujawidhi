/**
 * Builds the generated data files used at runtime:
 *   public/search-index.json   client-side aarti/puja search (both languages)
 *   public/data/lyrics.json    verses extracted from <Verse dev={`..`} rom={`..`}> (reader + print tools)
 *   generated/pages.json       light page manifest for the OG image route and sitemap helpers
 */
import fs from "node:fs";
import path from "node:path";
import { allPages, isIndexable } from "../lib/content";
import { CATEGORY_MAP, type CategoryKey } from "../lib/categories";
import { pathFor } from "../lib/site";
import type { Lang } from "../lib/schema";

const ROOT = process.cwd();
const langs: Lang[] = ["hinglish", "hi"];

const search: Record<Lang, unknown[]> = { hinglish: [], hi: [] };
const manifest: unknown[] = [];

for (const lang of langs) {
  for (const { meta } of allPages(lang)) {
    const cat = CATEGORY_MAP[meta.category as CategoryKey];
    search[lang].push({
      t: meta.title,
      u: pathFor(lang, meta.category, meta.slug),
      c: cat.name[lang],
      k: [meta.keyword, ...meta.secondary, meta.deity, meta.slug.replace(/-/g, " ")].join(" ").toLowerCase(),
      s: meta.status === "stub" ? 0 : 1,
      p: meta.priority,
    });
    manifest.push({ lang, category: meta.category, slug: meta.slug, title: meta.title, type: meta.type, status: meta.status, indexable: isIndexable(meta) });
  }
}

// lyrics
const lyrics: Record<string, unknown> = {};
const re = /<Verse\s+dev=\{`([\s\S]*?)`\}\s+rom=\{`([\s\S]*?)`\}/g;
const hinglish = allPages("hinglish");
const hi = new Map(allPages("hi").map((p) => [p.meta.slug, p.meta.title]));
for (const p of hinglish) {
  const verses = [...p.body.matchAll(re)].map((m) => ({ dev: m[1], rom: m[2] })).filter((v) => v.dev.trim());
  if (!verses.length) continue;
  lyrics[p.meta.slug] = {
    category: p.meta.category,
    title: { hinglish: p.meta.title, hi: hi.get(p.meta.slug) ?? p.meta.title },
    verses,
  };
}

fs.mkdirSync(path.join(ROOT, "public/data"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "generated"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "public/search-index.json"), JSON.stringify(search));
fs.writeFileSync(path.join(ROOT, "public/data/lyrics.json"), JSON.stringify(lyrics));
fs.writeFileSync(path.join(ROOT, "generated/pages.json"), JSON.stringify(manifest));
console.log(`index: ${search.hinglish.length} pages x 2 langs | lyrics: ${Object.keys(lyrics).length} texts`);
