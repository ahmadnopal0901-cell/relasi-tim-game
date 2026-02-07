self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('relasi-tim-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        '/assets/music/background-music.mp3',
        '/assets/sound/click-card.wav'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
