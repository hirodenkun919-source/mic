// Service Worker for PWA - Offline Caching Strategy
const CACHE_NAME = 'mic-assistant-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.log('Some assets failed to cache:', err);
        // Continue even if some assets fail
        return Promise.resolve();
      });
    })
  );
  // Skip the waiting phase to activate immediately
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim clients immediately
  self.clients.claim();
});

// Fetch Event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const { request } = event;

  // Skip cross-origin requests and external APIs
  if (request.url.includes('googleapis.com') || 
      request.url.includes('googlesyndication.com')) {
    return;
  }

  event.respondWith(
    // Try network first
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache on network error
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page if neither network nor cache available
          return new Response(
            `<!DOCTYPE html>
             <html>
             <head>
               <meta charset="utf-8">
               <meta name="viewport" content="width=device-width">
               <title>オフラインです</title>
               <style>
                 body { font-family: sans-serif; text-align: center; padding: 50px; background: #000; color: #fff; }
                 h1 { color: #ff8c00; }
               </style>
             </head>
             <body>
               <h1>📡 オフライン状態です</h1>
               <p>インターネット接続を確認してください</p>
             </body>
             </html>`,
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html; charset=utf-8'
              })
            }
          );
        });
      })
  );
});

// Background Sync (optional)
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);
});

// Message Handler (optional)
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
});
