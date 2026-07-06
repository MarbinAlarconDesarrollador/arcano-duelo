// service-worker.js
const CACHE_NAME = 'cybercard-v1';
const ASSETS = ['/', '/index.html', '/css/estilos.css', '/js/app.js', '/js/mazo.js', '/js/personajes.js', '/js/red.js', '/js/carta.js', '/img/personajes/dragon_cosmico.png', '/img/personajes/robot.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});