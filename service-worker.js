self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("dropkeys-cache").then(cache =>
      cache.addAll(["index.html", "style.css", "game.js", "icon.png"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});