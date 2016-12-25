import { API_ROOT_URL } from '../constants';

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT = 'auth/LOGOUT';

import { getAuthToken } from '../utils';

export const login = (auth, replace = () => {}) => {
  const { username, password } = auth;
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST });
  	fetch(`${API_ROOT_URL}/auth`, {
        headers: {
          'Authorization': getAuthToken(auth)
        }
      })
      // TODO figure out better security
			.then(response => localStorage.setItem('auth', btoa(`${username}:${password}`)))
			.then(() => dispatch({ type: LOGIN_SUCCESS }))
			.then(() => replace('/'))
			.catch(error => { console.log(error); dispatch({ type: LOGIN_FAILURE, error }) });
  };
};

export const logout = (replace) => {
  return (dispatch, getState) => {
    dispatch({ type: LOGOUT });
    window.localStorage.removeItem('auth');
    replace('/login');
  }
};
