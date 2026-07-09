// service-worker.js
const CACHE_NAME = 'cybercard-v2.04';
const ASSETS = ['/', '/index.html', '/css/estilos.css', '/css/cartas.css', '/css/resonsive.css', '/img/personajes/black-clover/asta.jpeg', '/img/personajes/bleach/ichigo-kurosaki.jpeg', '/img/personajes/caballeros-zodiaco/acua.jpeg', '/img/personajes/demon-slayer/genya-shinazugawa.jpeg', '/img/personajes/naruto/naruto.jpeg', '/img/personajes/one-piece/luffy.jpeg', '/img/personajes/solo-leveling/belion.jpeg', '/img/personajes/jujutsu-kaisen/choso.jpeg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});