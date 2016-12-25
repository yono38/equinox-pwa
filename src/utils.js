import isEmpty from 'lodash/isEmpty';

export const getAuthToken = (auth = {}) => {
  const token = !isEmpty(auth)
    ? btoa(`${auth.username}:${auth.password}`)
    : window.localStorage.getItem('auth');
  if (!token) {
    throw Error('getAuthToken: Cannot retrieve Auth Token');
  }
  return `Basic ${token}`;
};
