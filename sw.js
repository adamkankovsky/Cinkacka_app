// sw.js

const CACHE_NAME = 'my-site-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v2';

// Seznam statickĂ˝ch souborĹŻ k uloĹľenĂ­ do cache bÄ›hem instalace
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Instalace Service Workera a uloĹľenĂ­ statickĂ˝ch souborĹŻ do cache
self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Soubory jsou uklĂˇdĂˇny do cache');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktivace Service Workera a odstranÄ›nĂ­ starĂ˝ch cache
self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('OdstraĹovĂˇnĂ­ starĂ© cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ZachytĂˇvĂˇnĂ­ a obsluha fetch udĂˇlostĂ­
self.addEventListener('fetch', function(evt) {
  const url = new URL(evt.request.url);

  // Kontrola, zda je poĹľadavek smÄ›rovĂˇn na OpenWeatherMap API
  if (url.origin === 'https://api.openweathermap.org') {
    evt.respondWith(
      fetch(evt.request)
        .then(networkResponse => {
          // Pokud je odpovÄ›ÄŹ ĂşspÄ›ĹˇnĂˇ, uloĹľ ji do cache a vraĹĄ uĹľivateli
          if (networkResponse.status === 200) {
            return caches.open(DATA_CACHE_NAME).then(cache => {
              cache.put(evt.request, networkResponse.clone());
              return networkResponse;
            });
          }
          // Pokud nenĂ­ odpovÄ›ÄŹ ĂşspÄ›ĹˇnĂˇ, pokus se zĂ­skat data z cache
          if (caches.match(evt.request)) {
            return caches.match(evt.request);
          } else {
            return "nenalezen zaznam";
          }
        })
        .catch(() => {
          // Pokud sĂ­ĹĄovĂ˝ poĹľadavek selĹľe (napĹ™. offline), vraĹĄ data z cache
          return caches.match(evt.request);
        })
    );
    return;
  }

  // Obsluha ostatnĂ­ch poĹľadavkĹŻ (statickĂ© soubory)
  evt.respondWith(
    caches.match(evt.request).then(response => {
      return response || fetch(evt.request);
    })
  );
});