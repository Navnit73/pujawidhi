import { notFound } from "next/navigation";
import { CATEGORY_KEYS, isCategory } from "./categories";
import { allPages, getPage } from "./content";
import { hubMetadata, pageMetadata } from "./seo";
import type { Lang } from "./schema";
import { HubView, PageView } from "@/components/views";

export const categoryParams = () => CATEGORY_KEYS.map((category) => ({ category }));
export const pageParams = () => allPages("hinglish").map((p) => ({ category: p.meta.category, slug: p.meta.slug }));

export async function pageMeta(lang: Lang, params: Promise<{ category: string; slug: string }>) {
  const { category, slug } = await params;
  const page = getPage(lang, category, slug);
  return page ? pageMetadata(lang, page.meta) : {};
}
export async function renderPage(lang: Lang, params: Promise<{ category: string; slug: string }>) {
  const { category, slug } = await params;
  const page = getPage(lang, category, slug);
  if (!page) notFound();
  return <PageView lang={lang} page={page} />;
}
export async function hubMeta(lang: Lang, params: Promise<{ category: string }>) {
  const { category } = await params;
  return isCategory(category) ? hubMetadata(lang, category) : {};
}
export async function renderHub(lang: Lang, params: Promise<{ category: string }>) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  return <HubView lang={lang} category={category} />;
}
