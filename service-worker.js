const CACHE_NAME = 'slip-maker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/kbank.html',
  '/scb.html',
  '/bbl.html',
  '/ktb.html',
  '/krungsri.html',
  '/logo.png',           // K-Bank Logo
  '/scb-logo.jpg',       // SCB Logo
  '/bbl-logo.png',       // Bangkok Bank Logo
  '/ktb-logo.png',       // KTB Logo
  '/krungsri-logo.png',  // Krungsri Logo
  '/icon.png'            // App Icon
];

// 1. Install Service Worker & Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch from Cache (Offline Support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache ထဲမှာရှိရင် Cache ကနေယူသုံးမယ် (Offline)
        if (response) {
          return response;
        }
        // မရှိရင် အင်တာနက်ကနေ ဆွဲမယ်
        return fetch(event.request);
      })
  );
});

// 3. Update Service Worker (Remove Old Cache)
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
