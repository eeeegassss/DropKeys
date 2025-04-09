self.addEventListener('install', event => {
  console.log('Service worker installed.');
});

self.addEventListener('fetch', event => {
  // For offline support, cache logic would go here
});