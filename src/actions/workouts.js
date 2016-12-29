import { API_ROOT_URL } from '../constants';
import { getIsLoading } from '../selectors/workouts';
import { getAuthToken } from '../utils';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

export const WORKOUTS_REQUEST = 'workouts/WORKOUTS_REQUEST'
export const WORKOUTS_SUCCESS = 'workouts/WORKOUTS_SUCCESS'
export const WORKOUTS_FAILURE = 'workouts/WORKOUTS_FAILURE'

export const requestWorkouts = (month, year) => {
	return {
		type: WORKOUTS_REQUEST,
    month,
    year
	}
}

export const processSuccess = (response, month, year) => {
	return {
		type: WORKOUTS_SUCCESS,
    workouts: (response && response.workouts) || [],
    month,
    year
	}
}

export const processError = (error) => {
	console.log(error);
	return {
		type: WORKOUTS_FAILURE,
		error
	}
}

export const loadWorkouts = ({
  month = moment().format('M'),
  year = moment().year()
}) => {
	return (dispatch, getState) => {
		// Set new date before loading state info
		const state = getState();
		const isLoading = getIsLoading(state);
		// Load classes if not already requested
		if (!isLoading) {
			dispatch(requestWorkouts(month, year));
			fetch(`${API_ROOT_URL}/workouts?month=${month}&year=${year}`, {
	        headers: {
	          'Authorization': getAuthToken()
	        }
				})
				.then(response => response.json())
				.then((response) => dispatch(processSuccess(response, month, year)))
				.catch((err) => dispatch(processError(err)));
		}
	}
}
