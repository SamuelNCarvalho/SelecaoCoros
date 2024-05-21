// VERSION: 1.0.105

self.addEventListener('install', function (e) {
    console.log('install');

    e.waitUntil(
        caches.open('selecaohinoscojdaeroporto').then(cache => {
            return cache.addAll([
                'https://samuelncarvalho.github.io/SelecaoCoros',
                'https://samuelncarvalho.github.io/SelecaoCoros/',
                'https://samuelncarvalho.github.io/SelecaoCoros/index.html',
                'https://samuelncarvalho.github.io/SelecaoCoros/manifest.json',
                'https://samuelncarvalho.github.io/SelecaoCoros/lib/onsenui/css/material-design-iconic-font/css/material-design-iconic-font.min.css',
                'https://samuelncarvalho.github.io/SelecaoCoros/lib/onsenui/css/onsenui.css',
                'https://samuelncarvalho.github.io/SelecaoCoros/lib/onsenui/css/onsen-css-components.min.css',
                'https://samuelncarvalho.github.io/SelecaoCoros/lib/onsenui/js/onsenui.min.js',
                'https://samuelncarvalho.github.io/SelecaoCoros/app.js',
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
