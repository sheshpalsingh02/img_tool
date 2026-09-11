/* ImgTool Studio Service Worker — Production PWA, offline-first, privacy-first */
const CACHE_NAME = 'imgtool-v5-prod-2026-09-11';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/robots.txt'
];

// CDN assets to cache for offline (best-effort)
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js',
  'https://cdn.jsdelivr.net/npm/pica@9.0.1/dist/pica.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(() => {
        // fallback: at least cache index
        return cache.add('/index.html');
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Strategy:
// - Same-origin: Cache-first, then network, then fallback to index.html for navigations
// - CDN: Stale-while-revalidate
// - Images (unsplash samples): Network-first, cache 1 day
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // Skip non-GET and chrome-extension
  if (req.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Same-origin
  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate') {
      e.respondWith(
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
          return res;
        }).catch(() => caches.match('/index.html'))
      );
      return;
    }
    e.respondWith(
      caches.match(req).then((cached) => {
        if (cached) {
          // update in background
          e.waitUntil(
            fetch(req).then((res) => caches.open(CACHE_NAME).then(c => c.put(req, res)))
          );
          return cached;
        }
        return fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // CDN - stale while revalidate
  if (CDN_ASSETS.some(cdn => req.url.startsWith(cdn)) || 
      url.hostname.includes('cdnjs.cloudflare.com') ||
      url.hostname.includes('cdn.jsdelivr.net') ||
      url.hostname.includes('unpkg.com') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com') ||
      url.hostname.includes('cdn.tailwindcss.com')) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Sample images - network first
  if (url.hostname.includes('images.unsplash.com')) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req))
    );
  }
});

// Handle file handling API
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
