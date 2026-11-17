import type { Metadata } from "next";
import { CATEGORY_MAP, type CategoryKey } from "./categories";
import { HUBS } from "./hubs";
import { isIndexable, twinLang, type PageMeta } from "./content";
import { absUrl, pathFor, SITE_NAME, htmlLang, SITE_URL } from "./site";
import type { Lang } from "./schema";

/** <title> <= 60 chars: append the brand only when it fits. */
export function seoTitle(title: string): string {
  const withBrand = `${title} | ${SITE_NAME}`;
  if (withBrand.length <= 60) return withBrand;
  if (title.length <= 60) return title;
  return title.slice(0, 59).replace(/\s+\S*$/, "") + "…";
}

const ogImage = (lang: Lang, category?: string, slug?: string, title?: string) => {
  const q = new URLSearchParams({ l: lang });
  if (category) q.set("c", category);
  if (slug) q.set("s", slug);
  else if (title) q.set("t", title);
  return `${SITE_URL}/og?${q.toString()}`;
};

function alternates(lang: Lang, category?: string, slug?: string): Metadata["alternates"] {
  const self = pathFor(lang, category, slug);
  return {
    canonical: absUrl(self),
    languages: {
      "en-IN": absUrl(pathFor("hinglish", category, slug)),
      "hi-IN": absUrl(pathFor("hi", category, slug)),
      "x-default": absUrl(pathFor("hinglish", category, slug)),
    },
  };
}

function build(lang: Lang, o: { title: string; description: string; category?: string; slug?: string; index: boolean; ogTitle?: string; type?: "article" | "website" }): Metadata {
  const url = absUrl(pathFor(lang, o.category, o.slug));
  const image = ogImage(lang, o.category, o.slug, o.ogTitle);
  return {
    title: { absolute: seoTitle(o.title) },
    description: o.description,
    alternates: alternates(lang, o.category, o.slug),
    robots: o.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title: o.title, description: o.description, url, siteName: SITE_NAME, locale: htmlLang(lang).replace("-", "_"), alternateLocale: htmlLang(twinLang(lang)).replace("-", "_"), type: o.type ?? "website", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: [image] },
  };
}

export const pageMetadata = (lang: Lang, m: PageMeta) =>
  build(lang, { title: m.title, description: m.description, category: m.category, slug: m.slug, index: isIndexable(m), type: "article" });

export const hubMetadata = (lang: Lang, c: CategoryKey) =>
  build(lang, { title: CATEGORY_MAP[c].name[lang], description: HUBS[c].description[lang], category: c, index: true });

export const simpleMetadata = (lang: Lang, o: { title: string; description: string; slug?: string; index?: boolean }) =>
  build(lang, { title: o.title, description: o.description, slug: o.slug, index: o.index ?? true });

/* ---------- JSON-LD ---------- */
export const organizationLd = () => ({ "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/icons/512` });

export function websiteLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd(),
      {
        "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, inLanguage: ["en-IN", "hi-IN"], publisher: { "@id": `${SITE_URL}/#org` },
        potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}${lang === "hi" ? "/hi" : ""}/search?q={search_term_string}` }, "query-input": "required name=search_term_string" },
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

export function articleLd(lang: Lang, m: PageMeta, crumbs: { name: string; path: string }[]) {
  const url = absUrl(pathFor(lang, m.category, m.slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article", headline: m.title, description: m.description, inLanguage: htmlLang(lang), url, mainEntityOfPage: url,
        dateModified: m.updated, datePublished: m.updated, image: ogImage(lang, m.category, m.slug),
        author: { "@id": `${SITE_URL}/#org` }, publisher: { "@id": `${SITE_URL}/#org` },
      },
      breadcrumbLd(crumbs),
      organizationLd(),
    ],
  };
}
