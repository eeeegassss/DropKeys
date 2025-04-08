const CACHE_NAME = "dropkeys-cache-v1";
const ASSETS_TO_CACHE = [
  "index.html",
  "style.css",
  "game.js",
  "manifest.json",
  "images/survival.jpg",
  "images/time.jpg",
  "images/endless.jpg",
  "images/2player.jpg",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});