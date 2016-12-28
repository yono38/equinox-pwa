import { fromJS } from 'immutable';
import keyBy from 'lodash/keyBy';
import {
  CALENDAR_REQUEST,
  CALENDAR_SUCCESS,
  CALENDAR_FAILURE,
  ADD_TO_CALENDAR,
  REMOVE_FROM_CALENDAR
} from '../actions/calendar';

const initialState = fromJS({
  events: {},
  isLoading: false,
  isError: false
});

export default function(state = initialState, action) {
  // must be string instead of int for immutable key
  const classId = action.classId ? action.classId.toString() : '';
  switch(action.type) {
    case CALENDAR_REQUEST: {
      return state
        .set('events', fromJS({}))
        .set('isLoading', true)
        .set('isError', false);
    }
    case CALENDAR_SUCCESS: {
      const eventsById = keyBy(action.events, ev => ev.classInstanceId);
      return state
        .set('events', fromJS(eventsById))
        .set('isLoading', false);
    }
    case CALENDAR_FAILURE: {
      return state
        .set('isError', true)
        .set('isLoading', false);
    }
    case ADD_TO_CALENDAR:
      return state.setIn(['events', classId], fromJS(action.eventItem))
    case REMOVE_FROM_CALENDAR:
      return state.deleteIn(['events', classId]);
    default:
      return state;
  }
}
