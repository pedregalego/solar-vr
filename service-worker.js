/* ============================================================
   SERVICE WORKER — Sistema Solar VR
   Estratégia: cache-first para assets estáticos,
   com atualização automática em segundo plano.
   ============================================================ */
const VERSAO_CACHE = 'solarvr-v1';

// Assets locais + Three.js do CDN (para funcionar 100% offline)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'
];

/* Instalação: pré-cacheia tudo (falhas individuais não abortam) */
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(VERSAO_CACHE).then((cache) =>
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

/* Ativação: remove caches de versões antigas */
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(
        chaves.filter((c) => c !== VERSAO_CACHE).map((c) => caches.delete(c))
      )
    ).then(() => self.clients.claim())
  );
});

/* Busca: cache-first + revalidação em segundo plano */
self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') return;

  evento.respondWith(
    caches.match(evento.request).then((emCache) => {
      // Atualiza a cópia em cache em segundo plano
      const atualizacao = fetch(evento.request)
        .then((resposta) => {
          if (resposta && (resposta.ok || resposta.type === 'opaque')) {
            const clone = resposta.clone();
            caches.open(VERSAO_CACHE)
              .then((cache) => cache.put(evento.request, clone));
          }
          return resposta;
        })
        .catch(() => emCache); // offline: mantém o cache

      // Cache primeiro; rede como reserva
      return emCache || atualizacao;
    })
  );
});
