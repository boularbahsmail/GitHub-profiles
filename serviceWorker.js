const cacheName = 'cache-v0';
const resourcesToPrecache = [
    '/',
    'index.html',
    'assets/css/style.css',
    'assets/js/script.css',
    'assets/images/logo.png'
];

// On install - the application shell cached
// Precaching resources
self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open('cache-v0')
            .then(cache => {
                // Static files the make up the applicaiton shell are cached
                return cache.addAll(resourcesToPrecache);

            })
    );
});

// Responding with only cached resources
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
    .then(cacheResponse => {
        // Return it if there is a response, or else fetch again
        return cacheResponse || fetch(event.request);
    })
    );
})
