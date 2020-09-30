const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;
// install SW
self.addEventListener('install', (e) => {
	// open cache
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log(`Opened Cache`);
			return cache.addAll(urlsToCache);
		})
	);
});

// Listen for request
self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then(() => {
			return fetch(e.request).catch(() => caches.match('offline.html'));
		})
	);
});

// activate the SW
self.addEventListener('activate', (e) => {
	const cacheWhiteList = [];
	cacheWhiteList.push(CACHE_NAME);

	e.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhiteList.includes(cacheNames)) {
						return caches.delete(cacheNames);
					}
				})
			)
		)
	);
});
