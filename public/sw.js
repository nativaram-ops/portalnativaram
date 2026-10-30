/* Service Worker leve — Cooperativa Nativaram
 * Objetivo: manter o Portal do Dirigente (incl. Segurança Integrativa e SOS
 * Interações) consultável offline durante trabalhos em locais de sinal instável.
 * Regras: nunca intercepta /api/ nem métodos diferentes de GET.
 */
const CACHE = "nativaram-offline-v1";
const PORTAL = "/portal-dirigente";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(PORTAL).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  // Assets imutáveis do Next: cache-first
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copia = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copia));
            return res;
          })
      )
    );
    return;
  }

  // Portal do Dirigente: network-first com fallback offline
  if (req.mode === "navigate" && url.pathname.startsWith(PORTAL)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(PORTAL, copia));
          return res;
        })
        .catch(() => caches.match(PORTAL).then((hit) => hit || Response.error()))
    );
  }
});

