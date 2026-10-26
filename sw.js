// Offline support: serve the app shell from cache and refresh it in the background
// (stale-while-revalidate), so a launch never waits on the network.
// Bump VERSION when you change any file, together with APP_VERSION in index.html; they must
// match ('daily-tasks-vN' and 'vN'). A new VERSION installs fresh copies, takes over at once,
// and the open page reloads into it when it is idle.
var VERSION = 'daily-tasks-v6';
var FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png'];

function noop() {}

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    // cache:'reload' skips the HTTP cache, so a new version never stores a stale index.html.
    return c.addAll(FILES.map(function (u) { return new Request(u, { cache: 'reload' }); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    // Only remove this app's old caches; other apps on the same site keep theirs.
    var prefix = VERSION.replace(/v\d+$/, '');
    return Promise.all(keys.filter(function (k) { return k.indexOf(prefix) === 0 && k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Only this app's own files: anything in a subfolder other than icons/ (such as the
  // separate money/ app) is left to the network and never cached here.
  var scope = new URL(self.registration.scope).pathname;
  if (url.pathname.indexOf(scope) !== 0) return;
  var rel = url.pathname.slice(scope.length);
  if (rel.indexOf('/') !== -1 && rel.indexOf('icons/') !== 0) return;

  var key = url.origin + url.pathname; // stored without the query string
  var cacheP = caches.open(VERSION);
  var network = cacheP.then(function (cache) {
    return fetch(req).then(function (res) {
      return res.ok && res.type === 'basic' ? cache.put(key, res.clone()).then(function () { return res; }) : res;
    });
  });
  e.waitUntil(network.catch(noop));
  e.respondWith(cacheP.then(function (cache) {
    return cache.match(req, { ignoreSearch: true }).then(function (cached) {
      return cached || network.catch(function () {
        return req.mode === 'navigate' ? cache.match('./') : Response.error();
      });
    });
  }));
});
