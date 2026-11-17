/**
 * Panchang layer. Two parts:
 *
 * 1. `solarTimes()` - sunrise, sunset and Rahu Kaal computed locally with `suncalc` (MIT, widely used astronomy
 *    maths). Rahu Kaal is 1/8th of the day (sunrise to sunset), at a fixed slot per weekday. No network, no scraping.
 * 2. `fetchPanchang()` - tithi / nakshatra / paksha from a LICENSED provider you configure with
 *    PANCHANG_API_URL (+ PANCHANG_API_KEY). Tithi needs sun-moon longitude tables and we do not hand-roll or scrape
 *    that. The adapter expects a JSON response (see ProviderResponse); put a small proxy in front of whichever
 *    licensed API you buy and map its fields. Without configuration the site shows only the solar times.
 *
 * All times are IST (Asia/Kolkata).
 */
import { getTimes } from "suncalc";
import { cityByKey, type City } from "./cities";

export const TZ = "Asia/Kolkata";

/** Today's calendar date in IST as YYYY-MM-DD. */
export function istDate(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

export function fmtTime(d: Date | null): string {
  if (!d || Number.isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(d).toUpperCase();
}

/** Weekday (0=Sun..6=Sat) of an IST calendar date string. */
function istWeekday(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

// Rahu Kaal slot (1..8) of the day, by weekday Sun..Sat.
const RAHU_SLOT = [8, 2, 7, 5, 6, 4, 3];

export interface SolarTimes { sunrise: Date; sunset: Date; rahuStart: Date; rahuEnd: Date; weekday: number }

export function solarTimes(cityKey: string, date: string): SolarTimes {
  const c: City = cityByKey(cityKey);
  // noon IST of that date -> SunCalc finds that day's sunrise/sunset
  const noonIst = new Date(`${date}T12:00:00+05:30`);
  const t = getTimes(noonIst, c.lat, c.lon);
  // suncalc returns null only at polar latitudes; fall back to 06:00/18:00 IST so the UI never breaks.
  const sunrise = t.sunrise ?? new Date(`${date}T06:00:00+05:30`);
  const sunset = t.sunset ?? new Date(`${date}T18:00:00+05:30`);
  const weekday = istWeekday(date);
  const slot = RAHU_SLOT[weekday];
  const part = (sunset.getTime() - sunrise.getTime()) / 8;
  const rahuStart = new Date(sunrise.getTime() + part * (slot - 1));
  return { sunrise, sunset, rahuStart, rahuEnd: new Date(rahuStart.getTime() + part), weekday };
}

export interface ProviderResponse {
  tithi?: { hinglish: string; hi: string; endsAt?: string };
  nakshatra?: { hinglish: string; hi: string; endsAt?: string };
  paksha?: { hinglish: string; hi: string };
}

export function panchangProviderConfigured(): boolean {
  return Boolean(process.env.PANCHANG_API_URL);
}

/** Server-only. Returns null when no provider is configured or the call fails. Never throws. */
export async function fetchPanchang(cityKey: string, date: string): Promise<ProviderResponse | null> {
  const base = process.env.PANCHANG_API_URL;
  if (!base) return null;
  const c = cityByKey(cityKey);
  try {
    const url = new URL(base);
    url.searchParams.set("date", date);
    url.searchParams.set("lat", String(c.lat));
    url.searchParams.set("lon", String(c.lon));
    url.searchParams.set("tz", TZ);
    const res = await fetch(url, {
      headers: process.env.PANCHANG_API_KEY ? { Authorization: `Bearer ${process.env.PANCHANG_API_KEY}` } : undefined,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ProviderResponse;
  } catch {
    return null;
  }
}
