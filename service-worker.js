const CACHE_NAME = 'bank-card-maker-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/kbank.html',
  '/scb.html',
  '/bbl.html',
  '/ktb.html',
  '/krungsri.html',
  '/logo.png',           // K-Bank Logo
  '/scb-logo.png',       // SCB Logo (png as per screenshot)
  '/bbl-logo.png',       // BBL Logo
  '/ktb-logo.png',       // KTB Logo
  '/krungsri-logo.png',  // Krungsri Logo
  '/icon.png'            // App Icon if you have one
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch (Offline Strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return from cache
        }
        return fetch(event.request); // Fetch from net
      })
  );
});

// Activate (Cleanup old caches)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
