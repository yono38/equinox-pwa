// TODO use this array to persist notifications
// on reload with localStorage using metadata to recreate
try {
  self.importScripts('service-worker.js');
} catch(err) {
  console.log('[Service Worker] Failed to import precache SW')
}

let notificationPromises = [];

self.addEventListener('message', function(event) {
    var data = event.data;
    console.log("[Service Worker] Received Event: ", data);

    if (data.command == "addNotification") {
      function delayFunction(time) {
        return new Promise(function (fulfill) {
          setTimeout(fulfill, time);
        });
      }
      console.log("[Service Worker] Add Notification: ", data.name);
      const delayTime = data.delay || 0;
      const bookAlert = delayFunction(delayTime).then(() => {
        console.log('[Service Worker] Show Notification')
        const title = data.name || 'Test Notification';
        return self.registration.showNotification(title, {
          body: 'Spots are open to book for this class',
          icon: './android-chrome-192x192.png',
          vibrate: [200, 100, 200],
          tag: 'vibration-sample'
        });
      });
      notificationPromises.push({
        job: bookAlert,
        meta: {
          name: data.name,
          runTime: data.alertTime
        }
      });
      event.waitUntil(bookAlert);
    }
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  const bookingUrl = 'https://equinox-pwa.herokuapp.com/classes?bookable=true';
  event.notification.close();

  event.waitUntil(
    clients.openWindow(bookingUrl)
  );
});
