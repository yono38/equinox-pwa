import moment from 'moment';
import { fromJS } from 'immutable';
import keyBy from 'lodash/keyBy';
import {
  CLASSES_REQUEST,
  CLASSES_SUCCESS,
  CLASSES_FAILURE,
  BOOK_CLASS_SUCCESS,
  CANCEL_CLASS_SUCCESS,
  SELECT_DAY
} from '../actions/classes';

import {
  ADD_TO_CALENDAR,
  REMOVE_FROM_CALENDAR
} from '../actions/calendar';

const initialState = fromJS({
  list: {},
  classesByDay: {},
  inProgress: {},
  isError: {},
  selectedDay: moment().format('YYYY-MM-DD')
});

export default function(state = initialState, action) {
  // Need to convert classId from int to string for immutable key
  const classId = action.classId ? action.classId.toString() : '';
  switch(action.type) {
    case CLASSES_REQUEST: {
      if(!action.startDate) {
        throw Error('Cannot load class request without start date')
      };
      return state.setIn(['inProgress', action.startDate], true)
        .setIn(['isError', action.startDate], false);
    }

    case CLASSES_SUCCESS: {
      const storeClassList = state.get('list').toJS();
      const newClassList = keyBy(action.classes, classItem => classItem.id);
      return state
        .setIn(['inProgress', action.startDate], false)
        .set('list', fromJS(Object.assign({}, storeClassList, newClassList)))
        .setIn(['classesByDay', action.startDate], Object.keys(newClassList));
    }

    case CLASSES_FAILURE: {
      return state
        .setIn(['inProgress', action.startDate], false)
        .setIn(['isError', action.startDate], true);
    }

    case BOOK_CLASS_SUCCESS: {
      return state
        .setIn(['list', classId, 'status', 'localId'], action.bikeName)
        .setIn(['list', classId, 'status', 'hasReservation'], true);
    }

    case CANCEL_CLASS_SUCCESS:
      return state
        .setIn(['list', classId, 'status'], fromJS(action.reservationStatus));

    case SELECT_DAY:
      return state.set('selectedDay', action.startDate);

    // Update Classes to reflect current calendar status
    case ADD_TO_CALENDAR: {
      return state.setIn(['list', classId, 'isOnCalendar'], true);
    }

    case REMOVE_FROM_CALENDAR:
      return state.setIn(['list', classId, 'isOnCalendar'], false);

    default:
      return state;
  }
}
