const CACHE_NAME = 'mini-game-hub-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/game.js',
  '/manifest.json',
  '/icons/bolt.svg',
  '/icons/star.svg',
  '/images/darts.jpg',
  '/images/snake.jpg',
  '/images/colorcards.jpg',
  '/images/colorconnect.jpg',
  '/images/watersort.jpg',
  '/images/blockfill.jpg'
];

self.addEventListener('install', event => {
  console.log('Service worker installed.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});
