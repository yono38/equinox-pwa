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

const initialState = fromJS({
  list: {},
  classesByDay: {},
  inProgress: {},
  isError: {},
  selectedDay: moment().format('YYYY-MM-DD')
});

export default function(state = initialState, action) {
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
        .setIn(['list', action.classId, 'status', 'localId'], action.bikeName)
        .setIn(['list', action.classId, 'status', 'hasReservation'], true);
    }

    case CANCEL_CLASS_SUCCESS:
      return state
        .setIn(['list', action.classId, 'status'], fromJS(action.reservationStatus));

    case SELECT_DAY:
      return state.set('selectedDay', action.startDate);

    default:
      return state;
  }
}
