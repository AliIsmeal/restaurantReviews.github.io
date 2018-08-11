// resources:
// 1-udacity class room https://classroom.udacity.com/nanodegrees/nd001/parts/b29af831-fa50-4fe9-b30d-ad48476664d1/modules/83c4bddc-b362-4e71-8fa1-91f30ba57ab0/lessons/6381510081/concepts/63885494700923
// 2-https://developers.google.com/web/fundamentals/primers/service-workers/
// 3-https://www.youtube.com/watch?v=92dtrNU1GQc

var staticCacheName = "RestaurentRewies-static-v1";

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache
        .addAll([
          "./",
          "./index.html",
          "./restaurant.html",
          "./css/styles.css",
          "./js/main.js",
          "./data/restaurants.json",
          "./js/dbhelper.js",
          "./js/restaurant_info.js",
          "./img/1.jpg",
          "./img/2.jpg",
          "./img/2.jpg",
          "./img/3.jpg",
          "./img/4.jpg",
          "./img/5.jpg",
          "./img/6.jpg",
          "./img/7.jpg",
          "./img/8.jpg",
          "./img/9.jpg",
          "./img/noImage.png",
          "./register.js"
        ])
        .catch(error => {
          console.log(error);
        });
    })
  );
});

self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== staticCacheName) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {

  let cacheRequest = event.request;
  let cacheUrl = new URL(event.request.url);

  event.respondWith(
    caches.match(cacheRequest).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(error => {
            if (event.request.url.indexOf(".jpg") > -1) {
              return caches.match("/img/noImage.png");
            }
            return new Response(
              "Application is not connected to the internet",
              {
                status: 404,
                statusText: "Application is not connected to the internet"
              }
            );
          })
      );
    })
  );
});
