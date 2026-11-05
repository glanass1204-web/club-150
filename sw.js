// The app moved to /iron-cycle/. This worker clears the old offline copy, removes itself and reloads open pages.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('club150-') === 0; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.registration.unregister(); }).then(function () { return self.clients.matchAll(); }).then(function (cs) {
    cs.forEach(function (c) { if (c.navigate) c.navigate(c.url); });
  }));
});
