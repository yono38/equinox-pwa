// TODO use this array to persist notifications
// on reload with localStorage using metadata to recreate
self.importScripts('service-worker.js');

let notificationPromises = [];

self.addEventListener('message', function(event) {
    var data = event.data;
    console.log("Received Event: ", data);

    if (data.command == "addNotification") {
      function delayFunction(time) {
        return new Promise(function (fulfill) {
          setTimeout(fulfill, time);
        });
      }
      console.log("Add Notification: ", data.name);
      const delayTime = data.delay || 0;
      const bookAlert = delayFunction(delayTime).then(() => {
        console.log('Show Notification')
        const title = data.name || 'Test Notification';
        self.registration.showNotification(title, {
          body: 'Spots are open to book for this class',
          icon: './android-chrome-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
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
    }
});
