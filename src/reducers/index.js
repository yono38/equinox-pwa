import { CLASSES_REQUEST, CLASSES_SUCCESS, CLASSES_FAILURE, SELECT_DAY } from '../actions';
import moment from 'moment';

const initialState = {
  classes: [],
  requestPending: false,
  error: false,
  selectedDay: moment().format('YYYY-MM-DD')
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CLASSES_REQUEST:
      return Object.assign({}, state, {
        requestPending: true,
        error: false
      });

    case CLASSES_SUCCESS: {
      return Object.assign({}, state, {
        requestPending: false,
        error: false,
        classes: action.classes
      });
    }

    case CLASSES_FAILURE: {
      return Object.assign({}, state, {
        requestPending: false,
        error: action.error
      })
    }

    case SELECT_DAY: {
      return Object.assign({}, state, {
        selectedDay: action.day
      });
    }

    default:
      return state;
  }
}
