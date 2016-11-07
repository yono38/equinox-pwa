import {
  CHECKINS_REQUEST,
  CHECKINS_SUCCESS,
  CHECKINS_FAILURE
} from '../actions/checkins';

const initialState = {
  checkins: [],
  totals: {},
  requestPending: false,
  error: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CHECKINS_REQUEST: {
      return Object.assign({}, state, {
        requestPending: true,
        error: false
      });
    }

    case CHECKINS_SUCCESS: {
      return Object.assign({}, state, {
        requestPending: false,
        error: false,
        checkins: action.checkins,
        totals: action.totals,
      });
    }

    case CHECKINS_FAILURE: {
      return Object.assign({}, state, {
        requestPending: false,
        error: action.error
      })
    }
    default:
      return state;
  }
}
