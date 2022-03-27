// VERSION: 1.0.2

self.addEventListener('install', function (e) {
    console.log('install');

    e.waitUntil(
        caches.open('selecaohinoscojdaeroporto').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/lib/onsenui/css/material-design-iconic-font/css/material-design-iconic-font.min.css',
                '/lib/onsenui/css/onsenui.css',
                '/lib/onsenui/css/onsen-css-components.min.css',
                '/lib/onsenui/js/onsenui.min.js',
                '/app.js',
            ]);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});