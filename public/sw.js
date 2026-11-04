/* Service Worker leve — Cooperativa Nativaram
 * Objetivo: acelerar os assets imutáveis do Next (/_next/static) em locais de
 * sinal instável.
 * Regras: nunca intercepta /api/ nem métodos diferentes de GET, e nunca guarda
 * HTML do Portal do Dirigente (área autenticada): no aparelho compartilhado, a
 * página de um dirigente não pode ficar disponível offline para o próximo usuário.
 */
const VERSAO = "2026-11-03";
const PREFIXO = "nativaram-";
const CACHE_STATIC = `${PREFIXO}static-${VERSAO}`;
const LIMITE_STATIC = 60;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Remove caches de versões anteriores (inclui o antigo "nativaram-offline-v1",
  // que guardava o HTML do portal).
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith(PREFIXO) && k !== CACHE_STATIC)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

/** Mantém no máximo LIMITE_STATIC entradas, removendo as mais antigas (ordem de inserção). */
async function limitarCache(nome, limite) {
  const cache = await caches.open(nome);
  const chaves = await cache.keys();
  const excesso = chaves.length - limite;
  for (let i = 0; i < excesso; i++) {
    await cache.delete(chaves[i]);
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  // Assets imutáveis do Next: cache-first, com teto de entradas.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copia = res.clone();
              event.waitUntil(
                caches
                  .open(CACHE_STATIC)
                  .then((c) => c.put(req, copia))
                  .then(() => limitarCache(CACHE_STATIC, LIMITE_STATIC))
              );
            }
            return res;
          })
      )
    );
  }
  // Navegação (inclusive /portal-dirigente) segue direto para a rede, sem cache.
});
