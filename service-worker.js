// service-worker.js
const CACHE_NAME = 'cybercard-v2.01';
const ASSETS = ['/', '/index.html', '/css/estilos.css', '/css/cartas.css', '/css/resonsive.css', '/img/personajes/black-clover', '/img/personajes/bleach', '/img/personajes/caballeros-del-zodiaco', '/img/personajes/demon-slayer', '/img/personajes/dragon-ball', '/img/personajes/fairy-tail', '/img/personajes/fullmetal-alchemist', '/img/personajes/hunter-x-hunter', '/img/personajes/naruto', '/img/personajes/one-piece', '/img/personajes/solo-leveling', '/img/personajes/spy-x-family', '/img/personajes/jujutsu-kaisen'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});