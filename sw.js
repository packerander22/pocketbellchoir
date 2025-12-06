// Simple PWA service worker for PocketChimes

const CACHE_NAME = "pocketchimes-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/favicons/favicon_16_transparent.png",
  "/favicons/favicon_32_transparent.png",
  "/favicons/favicon_48_transparent.png",
  "/favicons/favicon_64_transparent.png",
  "/favicons/favicon_180_transparent.png",
  "/favicons/favicon_192_transparent.png",
  "/favicons/favicon_256_transparent.png",
  "/favicons/favicon_384_transparent.png",
  "/favicons/favicon_512_transparent.png",
  "/favicons/favicon_2048_transparent.png",
  "/favicons/favicon_maskable_512_transparent.png",
  "/favicons/site.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});
