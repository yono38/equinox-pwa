import { CLASSES_REQUEST, CLASSES_SUCCESS, CLASSES_FAILURE } from '../actions';

const initialState = {
  classes: [],
  requestPending: false,
  error: false
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

    default:
      return state;
  }
}
