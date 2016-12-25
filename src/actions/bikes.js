import { API_ROOT_URL } from '../constants';
import { getIsLoading } from '../selectors/bikes';
import { getAuthToken } from '../utils';
import fetch from 'isomorphic-fetch';

export const BIKES_REQUEST = 'bikes/BIKES_REQUEST'
export const BIKES_SUCCESS = 'bikes/BIKES_SUCCESS'
export const BIKES_FAILURE = 'bikes/BIKES_FAILURE'

export const requestBikes = (classId) => {
	return {
		type: BIKES_REQUEST,
    classId
	}
}

export const processSuccess = (response) => {
	return {
		type: BIKES_SUCCESS,
    bikes: (response && response.bikes) || []
	}
}

export const processError = (error) => {
	console.log(error);
	return {
		type: BIKES_FAILURE,
		error
	}
}

export const loadBikes = (classId) => {
	return (dispatch, getState) => {
		// Set new date before loading state info
		const state = getState();
		const isLoading = getIsLoading(state);
		// Load classes if not already requested
		if (!isLoading) {
			dispatch(requestBikes(classId));
			fetch(`${API_ROOT_URL}/classes/${classId}/bikes`, {
	        headers: {
	          'Authorization': getAuthToken()
	        }
				})
				.then(response => response.json())
				.then((response) => dispatch(processSuccess(response)))
				.catch((err) => dispatch(processError(err)));
		}
	}
}
