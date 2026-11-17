/* PujaWidhi service worker: aarti pages you have opened keep working with no signal (temple, basement, bad 4G). */
const VERSION = "v1";
const PAGES = `pages-${VERSION}`;
const STATIC = `static-${VERSION}`;
const DATA = `data-${VERSION}`;
const MAX_PAGES = 120;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const data = await caches.open(DATA);
      await Promise.allSettled(["/data/lyrics.json", "/search-index.json"].map((u) => data.add(u)));
      const pages = await caches.open(PAGES);
      await Promise.allSettled(["/", "/hi", "/offline.html"].map((u) => pages.add(u)));
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [PAGES, STATIC, DATA];
      for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
      await self.clients.claim();
    })(),
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/og")) return;

  // JS/CSS/fonts/images: cache first (hashed filenames)
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/") || /\.(?:woff2?|png|svg|ico|webp|avif)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(STATIC).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      }),
    );
    return;
  }

  // lyrics + search index: stale-while-revalidate
  if (url.pathname === "/data/lyrics.json" || url.pathname === "/search-index.json") {
    event.respondWith(
      caches.open(DATA).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }),
    );
    return;
  }

  // pages (HTML and RSC payloads): network first, fall back to the saved copy, then the offline page
  event.respondWith(
    (async () => {
      const cache = await caches.open(PAGES);
      try {
        const res = await fetch(req);
        if (res.ok) { cache.put(req, res.clone()); trim(PAGES, MAX_PAGES); }
        return res;
      } catch (err) {
        const hit = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
        if (hit) return hit;
        if (req.mode === "navigate") return (await cache.match("/offline.html")) || Response.error();
        throw err;
      }
    })(),
  );
});
