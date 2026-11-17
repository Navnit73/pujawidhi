import { NextResponse } from "next/server";
import { CITIES } from "@/lib/cities";
import { fetchPanchang, istDate } from "@/lib/panchang";

/** Thin cached wrapper around the licensed panchang provider (see lib/panchang.ts). Cached for a day at the CDN. */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const city = u.searchParams.get("city") ?? "delhi";
  const date = u.searchParams.get("date") || istDate();
  if (!CITIES.some((c) => c.key === city) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "bad request" }, { status: 400 });
  const panchang = await fetchPanchang(city, date);
  return NextResponse.json({ configured: Boolean(process.env.PANCHANG_API_URL), panchang }, { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" } });
}
