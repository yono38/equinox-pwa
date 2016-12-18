import { Map as immutableMap } from 'immutable';
import {
  BIKES_REQUEST,
  BIKES_SUCCESS,
  BIKES_FAILURE
} from '../actions/bikes';

const initialState = immutableMap({
  classId: null,
  bikes: [],
  isLoading: false,
  isError: false
});

export default function(state = initialState, action) {
  switch(action.type) {
    case BIKES_REQUEST: {
      return state
        .set('bikes', [])
        .set('classId', action.classId)
        .set('isLoading', true)
        .set('isError', false);
    }
    case BIKES_SUCCESS: {
      return state
        .set('bikes', action.bikes)
        .set('isLoading', false);
    }
    case BIKES_FAILURE: {
      return state
        .set('isError', true)
        .set('isLoading', false);
    }
    default:
      return state;
  }
}
