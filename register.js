// resources:https://developers.google.com/web/fundamentals/primers/service-workers/

// Regiter serviceWorker

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}
