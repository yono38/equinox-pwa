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
  events: localStorage.hasItem('calEvents') ?
    JSON.parse(localStorage.getItem('calEvents')) : {},
  fromCache: localStorage.hasItem('calEvents'),
  isLoading: false,
  isError: false
});

export default function(state = initialState, action) {
  // must be string instead of int for immutable key
  const classId = action.classId ? action.classId.toString() : '';
  switch(action.type) {
    case CALENDAR_REQUEST: {
      return state
        .set('isLoading', true)
        .set('isError', false);
    }
    case CALENDAR_SUCCESS: {
      const eventsById = keyBy(action.events, ev => ev.classInstanceId);
      // Add to local cache
      localStorage.setItem('calEvents', JSON.stringify(eventsById));
      return state
        .set('events', fromJS(eventsById))
        .set('isLoading', false);
    }
    case CALENDAR_FAILURE: {
      return state
        .set('isError', true)
        .set('isLoading', false);
    }
    case ADD_TO_CALENDAR: {
      const newState = state.setIn(['events', classId], fromJS(action.eventItem));
      // Update Cache
      localStorage.setItem('calEvents', JSON.stringify(newState.get('events').toJS()));
      return newState;
    }
    case REMOVE_FROM_CALENDAR: {
      const newState =  state.deleteIn(['events', classId]);
      // Update Cache
      localStorage.setItem('calEvents', JSON.stringify(newState.get('events').toJS()));
      return newState;
    }
    default:
      return state;
  }
}
