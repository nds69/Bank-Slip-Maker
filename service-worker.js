const CACHE_NAME = 'bank-card-maker-v6'; // Version Update
const urlsToCache = [
  '/',
  '/index.html',
  '/kbank.html',
  '/scb.html',
  '/bbl.html',
  '/ktb.html',
  '/krungsri.html',
  '/ttb.html',           // TTB HTML added
  '/logo.png',           // App Icon
  '/scb-logo.png',       
  '/bbl-logo.png',       
  '/ktb-logo.png',       
  '/krungsri-logo.png',
  '/ttb-logo.png'        // TTB Logo added
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
          return response;
        }
        return fetch(event.request);
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
