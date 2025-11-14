// Versão atualizada do Service Worker
const CACHE_VERSION = "v3-calorify";
const CACHE_FILES = [
  "/",
  "/index.html",
  "/estilos.css",
  "/script.js",
  "/logo.png",
  "/icone-192.png",
  "/icone-512.png",
  "/manifest.json"
];

// Instalação
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
  self.skipWaiting();
});

// Ativação (limpa versões antigas)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return (
        resp ||
        fetch(event.request).catch(() => caches.match("/index.html"))
      );
    })
  );
});
