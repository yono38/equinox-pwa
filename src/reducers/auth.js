import { immutableMap } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth';

export default function(
  state = immutableMap({
    auth: window.localStorage.hasItem('auth')
  }),
  action
) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return state.delete('error');
    case LOGIN_SUCCESS:
      return state.set('auth', true);
    case LOGIN_FAILURE:
      return state.set('error', action.error);
    case LOGOUT:
      return state.set('auth', false);
    default:
      return state;
  }
}
