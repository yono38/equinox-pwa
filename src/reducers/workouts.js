import { fromJS } from 'immutable';

import {
  WORKOUTS_REQUEST,
  WORKOUTS_SUCCESS,
  WORKOUTS_FAILURE
} from '../actions/workouts';

const initialState = fromJS({
  workouts: [],
  isLoading: false,
  isError: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    case WORKOUTS_REQUEST: {
      return state
        .set('isLoading', true)
        .set('isError', false);
    }

    case WORKOUTS_SUCCESS: {
      console.log('action', action)
      return state
        .set('workouts', fromJS(action.workouts))
        .set('isLoading', false);
    }

    case WORKOUTS_FAILURE: {
      return state
        .set('isLoading', false)
        .set('isError', true);
    }
    default:
      return state;
  }
}
