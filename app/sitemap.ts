import type { MetadataRoute } from "next";
import { CATEGORY_KEYS } from "@/lib/categories";
import { allPages, isIndexable } from "@/lib/content";
import { absUrl, pathFor } from "@/lib/site";

const TODAY = new Date().toISOString().slice(0, 10);

function entry(category?: string, slug?: string, lastModified: string = TODAY): MetadataRoute.Sitemap[number] {
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
  const out: MetadataRoute.Sitemap = [...pair(), ...CATEGORY_KEYS.flatMap((c) => pair(c)), ...pair("privacy"), ...pair("contact")];
  // Only pages that are published (and verified, for /local) enter the sitemap.
  for (const { meta } of allPages("hinglish")) if (isIndexable(meta)) out.push(...pair(meta.category, meta.slug, meta.updated));
  return out;
}
