import { ImageResponse } from "next/og";
import pages from "@/generated/pages.json";
import { CATEGORY_MAP, isCategory } from "@/lib/categories";
import { SITE_NAME } from "@/lib/site";

/**
 * Per-page OG image (1200x630): deity accent colour + title (Devanagari for ?l=hi).
 * Only titles that exist in the content manifest are rendered, so the endpoint cannot be used to print arbitrary text.
 * Fonts are fetched from Google Fonts per request-text and cached in memory; if that fails the card still renders.
 */
const fontCache = new Map<string, ArrayBuffer>();
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  const key = `${family}:${weight}:${text}`;
  if (fontCache.has(key)) return fontCache.get(key)!;
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = /src: url\((.+?)\) format\('(opentype|truetype)'\)/.exec(css)?.[1];
    if (!url) return null;
    const buf = await (await fetch(url)).arrayBuffer();
    fontCache.set(key, buf);
    return buf;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const lang = q.get("l") === "hi" ? "hi" : "hinglish";
  const c = q.get("c");
  const s = q.get("s");
  const cat = c && isCategory(c) ? CATEGORY_MAP[c] : null;
  const page = cat && s ? pages.find((p) => p.lang === lang && p.category === c && p.slug === s) : null;

  const title = page?.title ?? (cat ? cat.name[lang] : lang === "hi" ? "आरती, पूजा विधि और पाठ" : "Aarti, Puja Vidhi aur Path");
  const eyebrow = cat ? cat.name[lang] : lang === "hi" ? "हिंदी और हिंग्लिश में" : "Hinglish aur Hindi mein";
  const accent = cat?.accent ?? "#F28C0F";
  const all = `${title}${eyebrow}${SITE_NAME}`;
  const fonts: { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[] = [];
  const [deva, latin] = await Promise.all([googleFont("Noto+Sans+Devanagari", 700, all), googleFont("Inter", 700, all)]);
  if (deva) fonts.push({ name: "Deva", data: deva, weight: 700, style: "normal" });
  if (latin) fonts.push({ name: "Latin", data: latin, weight: 700, style: "normal" });

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", background: "#FFF8EC", fontFamily: "Latin, Deva" }}>
        <div style={{ width: 28, background: accent, display: "flex" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px" }}>
          <div style={{ display: "flex", fontSize: 34, color: accent, fontWeight: 700 }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 78, lineHeight: 1.25, color: "#2B1A12", fontWeight: 700 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 54, height: 54, borderRadius: 27, background: "#F28C0F", display: "flex" }} />
            <div style={{ display: "flex", fontSize: 38, color: "#8E1B2D", fontWeight: 700 }}>{SITE_NAME}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fonts.length ? fonts : undefined, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" } },
  );
}
