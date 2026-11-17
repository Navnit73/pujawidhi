import type { MetadataRoute } from "next";
import { CATEGORY_KEYS } from "@/lib/categories";
import { allPages, isIndexable } from "@/lib/content";
import { absUrl, pathFor } from "@/lib/site";

// lastModified must reflect real content changes, not build time: use the newest `updated` among published pages.
const PUBLISHED = allPages("hinglish").map((p) => p.meta).filter(isIndexable);
const LATEST = PUBLISHED.reduce((m, p) => (p.updated > m ? p.updated : m), "2026-01-01");
const latestIn = (c: string) => PUBLISHED.filter((p) => p.category === c).reduce((m, p) => (p.updated > m ? p.updated : m), LATEST);

function entry(category?: string, slug?: string, lastModified: string = LATEST): MetadataRoute.Sitemap[number] {
  return {
    url: absUrl(pathFor("hinglish", category, slug)),
    lastModified,
    alternates: { languages: { "en-IN": absUrl(pathFor("hinglish", category, slug)), "hi-IN": absUrl(pathFor("hi", category, slug)), "x-default": absUrl(pathFor("hinglish", category, slug)) } },
  };
}
/** Hinglish URL entry with hreflang alternates; the Hindi twin is emitted as its own entry with the same alternates. */
function pair(category?: string, slug?: string, lastModified?: string): MetadataRoute.Sitemap {
  const e = entry(category, slug, lastModified);
  return [e, { ...e, url: absUrl(pathFor("hi", category, slug)) }];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [...pair(), ...CATEGORY_KEYS.flatMap((c) => pair(c, undefined, latestIn(c))), ...pair("about"), ...pair("privacy"), ...pair("terms"), ...pair("contact")];
  // Only pages that are published (and verified, for /local) enter the sitemap.
  for (const meta of PUBLISHED) out.push(...pair(meta.category, meta.slug, meta.updated));
  return out;
}
