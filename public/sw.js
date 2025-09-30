// Service Worker for bruuce.com
// Precaches critical assets for optimal performance

const CACHE_NAME = 'bruuce-v1.2';
const STATIC_CACHE_NAME = 'bruuce-static-v1.2';

// Critical assets to precache
const PRECACHE_URLS = [
    '/',
    '/about/',
    '/projects/',
    '/blog/',
    '/work/',
    '/resume/',
    '/fonts/adobe-clean-400.woff2',
    '/fonts/adobe-clean-700.woff2',
    '/fonts/adobe-clean-300.woff2',
    '/images/bruce-denham-headshot.jpg',
    '/favicon.svg'
];

// Assets that should be cached on first request
const RUNTIME_CACHE_URLS = [
    '/fonts/adobe-clean-300-italic.woff2',
    '/fonts/adobe-clean-400-italic.woff2',
    '/fonts/adobe-clean-900.woff2'
];

// Install event - precache critical assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Precaching critical assets');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Only handle same-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Handle navigation requests (HTML pages)
    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        console.log('Serving from cache:', request.url);
                        return response;
                    }

                    return fetch(request)
                        .then(response => {
                            // Don't cache non-successful responses
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // Clone the response before caching
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });

                            return response;
                        });
                })
                .catch(() => {
                    // Fallback for offline navigation
                    return caches.match('/');
                })
        );
        return;
    }

    // Handle static assets (fonts, images, etc.)
    if (request.destination === 'font' ||
        request.destination === 'image' ||
        url.pathname.startsWith('/_astro/') ||
        url.pathname.startsWith('/fonts/') ||
        url.pathname.startsWith('/images/')) {

        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }

                    return fetch(request)
                        .then(response => {
                            // Don't cache non-successful responses
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            // Clone and cache static assets
                            const responseToCache = response.clone();
                            caches.open(STATIC_CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });

                            return response;
                        });
                })
        );
        return;
    }

    // For all other requests, try network first, then cache
    event.respondWith(
        fetch(request)
            .then(response => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone and cache the response
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(request, responseToCache);
                    });

                return response;
            })
            .catch(() => {
                // Try to serve from cache if network fails
                return caches.match(request);
            })
    );
});

// Handle messages from the main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
