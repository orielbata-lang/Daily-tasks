// Offline support: serve the app shell from cache, refresh it in the background.
// Bump VERSION when you change any file so phones pick up the update.
var VERSION = 'daily-tasks-v4';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    // Only remove this app's old caches; other apps on the same site keep theirs.
    var prefix = VERSION.replace(/v\d+$/, '');
    return Promise.all(keys.filter(function (k) { return k.indexOf(prefix) === 0 && k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: true }).then(function (cached) {
      var network = fetch(e.request).then(function (res) {
        if (res && res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    });
  }));
});
