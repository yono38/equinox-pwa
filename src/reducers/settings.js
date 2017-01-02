// TODO move localStorage cache writing into the action creator thunks
import { fromJS } from 'immutable';

import {
  SET_NOTIFICATION_PERMISSION,
  SET_BOOKING_ALERT_PERMISSION
} from '../actions/settings';

const initialState = fromJS({
  events: localStorage.getItem('calEvents') ?
    JSON.parse(localStorage.getItem('calEvents')) : {},
  fromCache: !!localStorage.getItem('calEvents'),
  isLoading: false,
  isError: false
});
const getInitialState = () => {
  const notificationsEnabled = window.Notification
    ? window.Notification.permission : 'unavailable';
  const defaultSettings = {
    bookingAlert: false
  };
  const application = localStorage.getItem('appSettings')
    ? JSON.parse(localStorage.getItem('appSettings')) : defaultSettings;
  return fromJS({
    notificationsEnabled,
    application
  });
};

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case SET_NOTIFICATION_PERMISSION:
      return state.set('notifications', action.permission);
    case SET_BOOKING_ALERT_PERMISSION: {
      const newState = state.setIn(['application', 'bookingAlert'], action.permission);
      const appSettings = newState.get('application').toJS();
      localStorage.setItem('appSettings', JSON.stringify(appSettings));
      return newState;
    }

    default:
      return state;
  }
}
