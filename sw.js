const CACHE_NAME = "calorify-cache-v3"; // <-- troquei para v3 pra forçar atualização

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/estilos.css",
  "/script.js",
  "/icone-192.png",
  "/icone-512.png",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // força instalar mesmo se existir outro ativo
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // ativa imediatamente para todos
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")
        )
      );
    })
  );
});
