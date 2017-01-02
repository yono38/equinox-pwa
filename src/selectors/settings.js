import { createSelector } from 'reselect';

export const getSettingsModuleState = (state) => state.modules.settings

export const getNotificationSettings = createSelector(
  [getSettingsModuleState],
  (module) => module.get('notifications')
);

export const getBookingAlertSettings = createSelector(
  [getSettingsModuleState],
  (module) => module.getIn(['application', 'bookingAlert'])
);
