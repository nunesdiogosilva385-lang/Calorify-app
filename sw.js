self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open("calorify-cache-v1").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./estilos.css",
        "./script.js",
        "./icone-192.png",
        "./icone-512.png",
        "./logo.png",
        "./manifest.json",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respostaCache) => {
      return (
        respostaCache ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});
