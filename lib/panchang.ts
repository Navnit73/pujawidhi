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

/* ---------- local tithi / nakshatra (approximate) ----------
 * Low-precision sun/moon longitudes (Meeus' main periodic terms, ~0.3 deg) + Lahiri ayanamsa. Good enough to name the
 * tithi/nakshatra at sunrise and estimate when it changes (within ~10-15 min); a licensed provider, if configured,
 * overrides this. Tithi = each 12 deg of moon-sun elongation; nakshatra = each 13.333 deg of sidereal moon longitude. */
const RAD = Math.PI / 180;
const norm = (x: number) => ((x % 360) + 360) % 360;
function sunMoon(ms: number) {
  const T = (ms / 86400000 - 10957.5) / 36525; // Julian centuries since J2000
  const Lm = 218.3164477 + 481267.88123421 * T, D = 297.8501921 + 445267.1114034 * T;
  const M = 357.5291092 + 35999.0502909 * T, Mm = 134.9633964 + 477198.8675055 * T, F = 93.272095 + 483202.0175233 * T;
  const sn = (a: number) => Math.sin(a * RAD);
  const moon = Lm + 6.288774 * sn(Mm) + 1.274027 * sn(2 * D - Mm) + 0.658314 * sn(2 * D) + 0.213618 * sn(2 * Mm) - 0.185116 * sn(M)
    - 0.114332 * sn(2 * F) + 0.058793 * sn(2 * D - 2 * Mm) + 0.057066 * sn(2 * D - M - Mm) + 0.053322 * sn(2 * D + Mm) + 0.045758 * sn(2 * D - M);
  const sun = 280.46646 + 36000.76983 * T + 1.914602 * sn(M) + 0.019993 * sn(2 * M);
  const ayanamsa = 23.85 + 1.396971 * T; // Lahiri, deg
  return { elong: norm(moon - sun), sidereal: norm(moon - ayanamsa) };
}
const tithiIdx = (ms: number) => Math.floor(sunMoon(ms).elong / 12); // 0..29
const nakIdx = (ms: number) => Math.floor(sunMoon(ms).sidereal / (360 / 27)); // 0..26

/** First time after `from` when idx(ms) changes (10-min scan, then 1-min refine). */
function nextChange(idx: (ms: number) => number, from: number): number {
  const base = idx(from);
  let t = from;
  for (let i = 0; i < 6 * 40; i++) { t += 600000; if (idx(t) !== base) break; }
  let lo = t - 600000, hi = t;
  while (hi - lo > 60000) { const mid = (lo + hi) / 2; if (idx(mid) === base) lo = mid; else hi = mid; }
  return hi;
}

const TITHI = [
  ["Pratipada", "प्रतिपदा"], ["Dwitiya", "द्वितीया"], ["Tritiya", "तृतीया"], ["Chaturthi", "चतुर्थी"], ["Panchami", "पंचमी"],
  ["Shashthi", "षष्ठी"], ["Saptami", "सप्तमी"], ["Ashtami", "अष्टमी"], ["Navami", "नवमी"], ["Dashami", "दशमी"],
  ["Ekadashi", "एकादशी"], ["Dwadashi", "द्वादशी"], ["Trayodashi", "त्रयोदशी"], ["Chaturdashi", "चतुर्दशी"],
];
const NAKSHATRA = [
  ["Ashwini", "अश्विनी"], ["Bharani", "भरणी"], ["Krittika", "कृत्तिका"], ["Rohini", "रोहिणी"], ["Mrigashira", "मृगशिरा"], ["Ardra", "आर्द्रा"],
  ["Punarvasu", "पुनर्वसु"], ["Pushya", "पुष्य"], ["Ashlesha", "आश्लेषा"], ["Magha", "मघा"], ["Purva Phalguni", "पूर्वा फाल्गुनी"],
  ["Uttara Phalguni", "उत्तरा फाल्गुनी"], ["Hasta", "हस्त"], ["Chitra", "चित्रा"], ["Swati", "स्वाति"], ["Vishakha", "विशाखा"],
  ["Anuradha", "अनुराधा"], ["Jyeshtha", "ज्येष्ठा"], ["Mula", "मूल"], ["Purva Ashadha", "पूर्वाषाढ़ा"], ["Uttara Ashadha", "उत्तराषाढ़ा"],
  ["Shravana", "श्रवण"], ["Dhanishta", "धनिष्ठा"], ["Shatabhisha", "शतभिषा"], ["Purva Bhadrapada", "पूर्वा भाद्रपद"],
  ["Uttara Bhadrapada", "उत्तरा भाद्रपद"], ["Revati", "रेवती"],
];

/** Tithi, nakshatra and paksha prevailing at the given moment (use sunrise), with estimated end times. */
export function localPanchang(at: Date): ProviderResponse {
  const ms = at.getTime();
  const ti = tithiIdx(ms), n = nakIdx(ms);
  const dayInPaksha = ti % 15; // 0..14
  const last = dayInPaksha === 14;
  const tn: [string, string] = last ? (ti === 14 ? ["Purnima", "पूर्णिमा"] : ["Amavasya", "अमावस्या"]) : (TITHI[dayInPaksha] as [string, string]);
  return {
    tithi: { hinglish: tn[0], hi: tn[1], endsAt: new Date(nextChange(tithiIdx, ms)).toISOString() },
    nakshatra: { hinglish: NAKSHATRA[n][0], hi: NAKSHATRA[n][1], endsAt: new Date(nextChange(nakIdx, ms)).toISOString() },
    paksha: ti < 15 ? { hinglish: "Shukla paksha", hi: "शुक्ल पक्ष" } : { hinglish: "Krishna paksha", hi: "कृष्ण पक्ष" },
  };
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
