// TODO could be more efficient by referencing events by class ID
// and using original class module instance for data
// But would need to ensure class data is loaded / loadable
import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy';
import moment from 'moment';

const getCalendarModuleState = (state) => state.modules.calendar;

export const getIsFromCache = createSelector(
  [getCalendarModuleState],
  (module) => module.get('fromCache')
);

export const getIsLoading = createSelector(
  [getCalendarModuleState],
  (module) => module.get('isLoading')
);

export const getIsFailed = createSelector(
  [getCalendarModuleState],
  (module) => module.get('isError')
);

export const getEvents = createSelector(
  [getCalendarModuleState],
  (module) => module.get('events').toJS()
);

export const getEventsByIsoWeekday = createSelector(
  [getEvents],
  (events) =>
    keyBy(
      Object.values(events),
      (ev) => moment(ev.startDate).isoWeekday()
    )
);

export const getUpcomingEvent = createSelector(
  [getEventsByIsoWeekday],
  (eventsByDay) => {
    const isoToday = moment().isoWeekday();
    for (let i = isoToday; i < 6; i++) {
      if (eventsByDay[i]) {
        return eventsByDay[i];
      }
    }
    return null;
  }
);
