import { API_ROOT_URL } from '../constants';
import { getAuthToken } from '../utils';
import fetch from 'isomorphic-fetch';

export const CHECKINS_REQUEST = 'checkins/CHECKINS_REQUEST'
export const CHECKINS_SUCCESS = 'checkins/CHECKINS_SUCCESS'
export const CHECKINS_FAILURE = 'checkins/CHECKINS_FAILURE'

export const requestCheckins = () => {
	return {
		type: CHECKINS_REQUEST
	}
}

export const processSuccess = (response) => {
	console.log(response);
	return {
		type: CHECKINS_SUCCESS,
		checkins: (response && response.checkins) || [],
    totals: (response && response.totals) || []
	}
}

export const processError = error => {
	return {
		type: CHECKINS_FAILURE,
		error
	}
}

export const loadCheckins = (dispatch) => {
	dispatch(requestCheckins());
	fetch(`${API_ROOT_URL}/checkins`, {
      headers: {
        'Authorization': getAuthToken()
      }
		})
		.then(response => response.json())
		.then((response) => dispatch(processSuccess(response)))
		.catch((err) => dispatch(processError(err)));
}
