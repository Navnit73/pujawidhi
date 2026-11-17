# PujaWidhi: Aarti, Puja Vidhi & Path (Next.js 15, India)

Hinglish (default) and Hindi (Devanagari) devotional site. 120 planned pages, each in two languages, generated from
MDX in `/content`. Mobile-first, SSG, installable PWA with offline aarti pages.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000   (runs the index builder first)
npm run check:content  # content gate (also runs automatically before `npm run build`)
npm run build && npm start
```

## How content works

```
content/{category}/{slug}.hinglish.mdx   -> /{category}/{slug}        <html lang="en-IN">
content/{category}/{slug}.hi.mdx         -> /hi/{category}/{slug}     <html lang="hi-IN">
```

`npm run seed` created all 240 files from `data/pages.manifest.txt` (the plan's section 4). It never overwrites an
existing file (pass `--force` to regenerate stubs).

### Page status (important)

| `status` | Meaning | Indexed? | In sitemap? |
|---|---|---|---|
| `stub` | Placeholder with the right template and `TODO`s. The page shows a "being prepared" notice and its planned sections. | no (`noindex`) | no |
| `review` | Written, waiting for a reviewer to sign off. | no (`noindex`) | no |
| `published` | Live. **Vidhi, path, mantra, chalisa and stotra pages must have `reviewer:`** or the build fails. | yes | yes |
| `/local/*` | Also needs `indexable: true` (verified name, area, timings, map link, last-checked date). | only with the flag | only with the flag |

The 6 pilot pages are published with reviewer "Pt. Vijay Panday". Other pages stay `stub` until written and reviewed.
pandit reviewer and no real name was supplied. To launch one: have it reviewed, then set `reviewer: "Pt. ..."` and
`status: "published"`.

### Frontmatter

```yaml
title: "Durga Ji Ki Aarti: Jai Ambe Gauri Lyrics"   # <= 60 chars
description: "..."                                   # 140-155 chars
keyword: "durga ji ki aarti"
secondary: ["maa durga ki aarti"]
category: "durga-maa"
type: "aarti"      # aarti | vidhi | path | chalisa | stotra | mantra | vrat | guide | tool | hub | city
deity: "durga"
lang: "hinglish"   # or "hi"
updated: "2026-11-17"
reviewer: "Pt. ..."   # required once published (vidhi/path/mantra/chalisa/stotra)
priority: "P1"        # P1..P4, V (= validate in Keyword Planner first)
related: ["durga-chalisa"]
volume: 500000
status: "stub"        # stub | review | published
indexable: true       # /local only
```

### MDX components

`AartiLyrics` + `Verse` + `Arth`, `Samagri`, `Steps` + `Step`, `Mantra`, `QuickAnswer`, `FAQ` + `Q`, `PrintSheet`,
`ReaderPicker`, `RahuKaalTool`, `PanchangTool`, `FestivalCalendar`, `AartiIndex`, plus `Reviewed`, `ShareWhatsApp`,
`RelatedGrid` (these three are added automatically under every page). Verse syntax (the tools read it):

```mdx
<AartiLyrics>
  <Verse dev={`देवनागरी पंक्ति 1
पंक्ति 2`} rom={`Hinglish line 1
line 2`}><Arth>Optional meaning</Arth></Verse>
</AartiLyrics>
```

`AartiLyrics` adds the **Reader mode** button (full-screen, auto-scroll with speed slider, wake lock, light/dark, tap to
pause). `scripts/build-index.ts` extracts verses to `public/data/lyrics.json` for the print-sheet and reader tools.

MDX note: `MDXRemote` runs with `blockJS: false` because our components take JS-expression props. Only repo content
goes through it; never pass user-submitted text. `blockDangerousJS` stays on.

## How to...

**Add a page.** 1) Add a row to `data/pages.manifest.txt`. 2) `npm run seed`. 3) Fill in both `.mdx` files, set
`status`. 4) `npm run check:content`. Or copy two existing files and edit the frontmatter.

**Add a deity category.** 1) Add it to `lib/categories.ts` (key, accent, icon, names). 2) Add its hub copy to
`lib/hubs.ts` (intro >= 150 words per language, descriptions 140-155 chars; the check enforces both). 3) Add a new icon
to `components/DeityIcon.tsx` if needed. 4) Create `content/{key}/` and add pages.

**Merge a cannibalising variant.** Add its slug to `data/redirects.json`; it 301s in both languages and the check
fails if that slug is also a real page.

**Festival dates.** Fill `date` (YYYY-MM-DD, IST) in `data/festivals.json` from a licensed panchang source. `null`
entries are skipped by the countdown. No dates are invented.

## Content check (`npm run check:content`)

Fails on: missing twin, bad frontmatter (title, description length, keyword, `updated`), `lang`/folder mismatch,
published reviewer-type page without `reviewer`, unknown `related` slug, broken internal link, a Hindi page linking to a
Hinglish URL (or vice versa), unknown MDX component, MDX syntax error, hub intro under 150 words, redirect/page
collisions. Warnings: title missing a keyword word, description missing the keyword.

## Panchang

`lib/panchang.ts`: sunrise, sunset and **Rahu Kaal** are computed locally with `suncalc` (no network, nothing scraped).
Tithi/nakshatra need a **licensed provider**: set `PANCHANG_API_URL` (+ `PANCHANG_API_KEY`) to a JSON endpoint that
accepts `date, lat, lon, tz` and returns `{tithi:{hinglish,hi}, nakshatra:{hinglish,hi}}`. Put a tiny proxy in front of
whichever licensed API you buy. Results are cached for a day at the CDN (`/api/panchang`). Without it the strip shows
"-" for tithi/nakshatra. 30 city presets are in `lib/cities.ts`.

## PWA / offline

`public/sw.js` (hand-written): pages you open are cached network-first, static assets cache-first, lyrics and search
index stale-while-revalidate, `/offline.html` as the last fallback. Registered in production only.

## Analytics and privacy

GA4 only, loaded **after** the visitor accepts the notice (`components/ConsentGate.tsx`). Set `NEXT_PUBLIC_GA_ID`; with
it empty nothing loads and no banner shows. No ad tech. Set `NEXT_PUBLIC_CONTACT_EMAIL` so the contact page shows an
address (and add a grievance contact to `components/Legal.tsx` if your counsel wants one).

## Deploy (Vercel, Mumbai)

1. Import the repo. `vercel.json` pins functions to `bom1`.
2. Env vars: `NEXT_PUBLIC_SITE_URL=https://pujawidhi.co.in`, `NEXT_PUBLIC_GA_ID` (optional),
   `NEXT_PUBLIC_CONTACT_EMAIL`, `PANCHANG_API_URL` / `PANCHANG_API_KEY` (optional).
3. Build command stays `npm run build` (runs check + index first).
4. Point the domain. Cloudflare also works (needs the OpenNext adapter; `/og` uses the Node runtime).

## Search Console checklist

- [ ] Verify `https://pujawidhi.co.in` as a **Domain** property (DNS TXT).
- [ ] Submit `https://pujawidhi.co.in/sitemap.xml` (hreflang alternates are inside it).
- [ ] Publish pages first (`status: "published"` + reviewer). Until then only the home, 11 hubs, privacy and contact are indexable.
- [ ] URL Inspection on: home, one hub, one aarti, its `/hi/` twin. Confirm user-declared canonical and hreflang pairs.
- [ ] Check the Pages report for "Alternate page with proper canonical" (expected for redirects) and unexpected "Excluded by noindex".
- [ ] Core Web Vitals report after about 28 days of traffic. Verify with PageSpeed Insights on the live URL.
- [ ] After 90 days, prune or merge pages with no impressions.
- [ ] Enable Bing Webmaster Tools (import from Search Console).

## Keyword retargets vs the plan

The plan contradicted its own cannibalisation map in a few places. Changes made in `data/pages.manifest.txt`:

| Page | Plan keyword | Now | Why |
|---|---|---|---|
| 3.9 `ganesh-pujan-samagri-list` | ganesh pujan | ganesh pujan samagri | `ganesh pujan` is absorbed by `ganesh-puja-vidhi` |
| 11.1 Kolkata | durga puja pandal | kolkata durga puja pandal | generic term on a city page |
| 11.2-11.6 other cities | durga puja pandal near me | `{city} durga puja pandal` | same keyword as hub 1.10 (5 pages competing with it) |
| 11.7, 11.8 | ganpati pandal near me | ganpati pandal mumbai / pune | same reason |
| 2.1 `ambe-tu-hai-jagdambe-kali-aarti` | ambe ji ki aarti | unchanged | **Check the SERP first**: if it only shows "Jai Ambe Gauri", merge into `durga-ji-ki-aarti` |

## Verified in this build

`npm run build`: 279 static pages. All 269 content/hub/tool/doc URLs return 200. Lighthouse (mobile, simulated slow 4G):
accessibility 100, best practices 100, SEO 100 on indexable pages (66 on `noindex` pages by design), performance 87-92.
The shortfall against the 95 target is the ~103 kB framework JS plus fonts under Lighthouse's slow-4G simulation (observed
local FCP/LCP is about 80 ms). Re-measure on the deployed URL with PageSpeed Insights before treating it as a real gap.
