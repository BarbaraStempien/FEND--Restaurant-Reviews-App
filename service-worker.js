
const CacheVersion = 'restaurant-app-v1';

/*
* Install the service worker, cache files
*/

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CacheVersion).then( cache => {
        return cache.addAll([
          '/',
          'index.html',
          'restaurant.html',
          'css/styles.css',
          'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700',
          'js/main.js',
          'js/restaurant_info.js',
          'js/dbhelper.js',
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'img/10.jpg',
        ]);
      })
  );
});

/*
* Activate the new service worker, delete old cache
*/

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheName => {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != CacheVersion;
				}).map(cacheName => {
					return caches.delete(cacheName);
				})
			);
		})
	);
})


self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
