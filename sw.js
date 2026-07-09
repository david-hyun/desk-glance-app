// Desk Glance 서비스워커: 앱 셸 캐시 (오프라인 동작 — 완전 온디바이스 앱이므로 전부 캐시 가능)
var CACHE = 'desk-glance-2026-07-09-1327';
var ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

// 네트워크 우선(새 버전 반영), 실패 시 캐시 (오프라인)
// 페이지 진입(navigate)은 HTTP 캐시를 재검증해 배포 후 즉시 새 버전을 받는다
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var req = e.request.mode === 'navigate'
    ? new Request(e.request.url, { cache: 'no-cache' })
    : e.request;
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
        return hit || caches.match('./index.html');
      });
    })
  );
});
