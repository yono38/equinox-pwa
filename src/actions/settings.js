export const SET_NOTIFICATION_PERMISSION = 'settings/SET_NOTIFICATION_PERMISSION';
export const SET_BOOKING_ALERT_PERMISSION = 'settings/SET_BOOKING_ALERT_PERMISSION';

export const setNotificationPermission = (permission) => ({
  type: SET_NOTIFICATION_PERMISSION,
  permission
});

export const setBookingAlertPermission = (permission) => ({
  type: SET_BOOKING_ALERT_PERMISSION,
  permission
});

export const enableNotifications = (dispatch) => {
  let returnPromise;
  if ('Notification' in window) {
    returnPromise = Notification.requestPermission().then(function(result) {
      console.log('Notification request', result);
      dispatch(setNotificationPermission(result));
      if (result !== 'granted') {
        throw Error('Notifications permission not granted.');
      }
      return result;
    });
  } else {
    returnPromise = Promise.reject('Notification API not available.');
  }
  return returnPromise;
};

export const enableBookingReminder = () => {
   return (dispatch) => {
     return enableNotifications(dispatch).then((result) => {
       return dispatch(setBookingAlertPermission(true));
     }).catch((err) => {
       console.error(err);
     });
   };
};

export const disableBookingReminder = () => {
  return (dispatch) => {
  };
}
