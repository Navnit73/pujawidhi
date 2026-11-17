/**
 * npm run check:content  - fails the build when content breaks the rules in the spec:
 * missing twin / title / description / keyword / updated date, bad frontmatter, missing reviewer on
 * published vidhi/path/mantra pages, broken internal links, unknown MDX components, MDX syntax errors,
 * thin hubs, and redirect/page collisions.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { frontmatterSchema, REVIEWER_TYPES, type Lang } from "../lib/schema";
import { CATEGORY_KEYS } from "../lib/categories";
import { HUBS } from "../lib/hubs";
import { MDX_COMPONENT_NAMES } from "../lib/component-names";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const errors: string[] = [];
const warnings: string[] = [];
const err = (f: string, m: string) => errors.push(`${f}: ${m}`);
const warn = (f: string, m: string) => warnings.push(`${f}: ${m}`);

interface Entry { cat: string; slug: string; lang: Lang; file: string; fm: any; body: string }
const entries: Entry[] = [];

for (const d of fs.readdirSync(CONTENT, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  if (!CATEGORY_KEYS.includes(d.name as any)) { err(`content/${d.name}`, "unknown category folder"); continue; }
  for (const f of fs.readdirSync(path.join(CONTENT, d.name))) {
    const m = /^(.+)\.(hinglish|hi)\.mdx$/.exec(f);
    const rel = `content/${d.name}/${f}`;
    if (!m) { err(rel, "file name must be {slug}.hinglish.mdx or {slug}.hi.mdx"); continue; }
    const { data, content } = matter(fs.readFileSync(path.join(CONTENT, d.name, f), "utf8"));
    entries.push({ cat: d.name, slug: m[1], lang: m[2] as Lang, file: rel, fm: data, body: content });
  }
}

const key = (e: Entry) => `${e.cat}/${e.slug}`;
const byKey = new Map<string, Entry[]>();
for (const e of entries) byKey.set(key(e), [...(byKey.get(key(e)) ?? []), e]);
const allSlugs = new Map<string, string>(); // slug -> category (slugs must be globally unique)

for (const [k, list] of byKey) {
  const langs = list.map((e) => e.lang);
  for (const l of ["hinglish", "hi"] as Lang[]) if (!langs.includes(l)) err(`content/${k}`, `missing ${l} twin`);
  const [cat, slug] = k.split("/");
  if (allSlugs.has(slug) && allSlugs.get(slug) !== cat) err(`content/${k}`, `slug also used in ${allSlugs.get(slug)}`);
  allSlugs.set(slug, cat);
}

const titles = new Map<string, string>();
const allowed = new Set<string>(MDX_COMPONENT_NAMES);
let todoPages = 0;
const stats = { stub: 0, review: 0, published: 0 };

for (const e of entries) {
  const parsed = frontmatterSchema.safeParse(e.fm);
  if (!parsed.success) {
    for (const i of parsed.error.issues) err(e.file, `frontmatter ${i.path.join(".")}: ${i.message}`);
    continue;
  }
  const fm = parsed.data;
  stats[fm.status]++;
  if (fm.lang !== e.lang) err(e.file, `frontmatter lang "${fm.lang}" does not match file suffix`);
  if (fm.category !== e.cat) err(e.file, `frontmatter category "${fm.category}" does not match folder`);
  if (Number.isNaN(Date.parse(fm.updated))) err(e.file, "updated is not a valid date");
  if (fm.status === "published" && REVIEWER_TYPES.includes(fm.type) && !fm.reviewer?.trim()) err(e.file, `published ${fm.type} page needs a reviewer`);
  if (fm.category === "local" && fm.indexable && fm.status !== "published") err(e.file, "indexable: true needs status published");
  for (const r of fm.related) if (!allSlugs.has(r)) err(e.file, `related slug "${r}" does not exist`);
  const tk = `${e.lang}:${fm.title}`;
  if (titles.has(tk)) err(e.file, `duplicate title (also ${titles.get(tk)})`); else titles.set(tk, e.file);
  if (e.lang === "hinglish" && !fm.description.toLowerCase().includes(fm.keyword.split(" ")[0])) warn(e.file, "description may not include the keyword");
  if (e.lang === "hinglish" && fm.status !== "stub") {
    const t = fm.title.toLowerCase();
    if (!fm.keyword.split(" ").every((w) => t.includes(w))) warn(e.file, `title does not contain every word of keyword "${fm.keyword}"`);
  }
  if (e.body.includes("TODO")) todoPages++;

  // components
  for (const m of e.body.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) if (!allowed.has(m[1])) err(e.file, `unknown MDX component <${m[1]}>`);

  // internal links
  for (const m of e.body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const p = m[1].replace(/^\/hi(?=\/)/, "").split("#")[0];
    const [, c, s] = p.split("/");
    if (!c || !s || !allSlugs.has(s) || allSlugs.get(s) !== c) err(e.file, `broken internal link ${m[1]}`);
    if (e.lang === "hi" && !m[1].startsWith("/hi/")) err(e.file, `Hindi page links to Hinglish URL ${m[1]}`);
    if (e.lang === "hinglish" && m[1].startsWith("/hi/")) err(e.file, `Hinglish page links to Hindi URL ${m[1]}`);
  }
}

// MDX syntax (async)
async function compileAll() {
  const { compile } = await import("@mdx-js/mdx");
  for (const e of entries) {
    try { await compile(e.body); } catch (x: any) { err(e.file, `MDX syntax: ${String(x.message).split("\n")[0]}`); }
  }
}

// hubs
for (const c of CATEGORY_KEYS) {
  const h = HUBS[c];
  if (!h) { err(`lib/hubs.ts`, `missing hub copy for ${c}`); continue; }
  for (const l of ["hinglish", "hi"] as Lang[]) {
    const words = h.intro[l].trim().split(/\s+/).length;
    if (words < 150) err(`lib/hubs.ts`, `${c} ${l} intro has ${words} words (< 150)`);
    const dl = h.description[l].length;
    if (dl < 140 || dl > 155) err(`lib/hubs.ts`, `${c} ${l} description is ${dl} chars (need 140-155)`);
  }
}

// redirects must not shadow real pages
const rd = JSON.parse(fs.readFileSync(path.join(ROOT, "data/redirects.json"), "utf8")).redirects as { from: string[]; to: string; category: string }[];
for (const r of rd) {
  if (allSlugs.get(r.to) !== r.category) err("data/redirects.json", `target ${r.category}/${r.to} does not exist`);
  for (const f of r.from) if (allSlugs.has(f)) err("data/redirects.json", `variant "${f}" is also a real page; remove one`);
}

// plan: 120 pages
const pageCount = byKey.size;
if (pageCount !== 120) warn("content", `expected 120 pages, found ${pageCount}`);

compileAll().then(() => {
  console.log(`pages: ${pageCount} | files: ${entries.length} | status (files): stub ${stats.stub}, review ${stats.review}, published ${stats.published} | files with TODO: ${todoPages}`);
  for (const w of warnings) console.warn(`  warn  ${w}`);
  for (const x of errors) console.error(`  ERROR ${x}`);
  if (errors.length) { console.error(`\ncheck:content failed with ${errors.length} error(s).`); process.exit(1); }
  console.log(`check:content passed${warnings.length ? ` (${warnings.length} warning(s))` : ""}.`);
});
