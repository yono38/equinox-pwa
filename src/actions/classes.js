// Namespace actions
export const CLASSES_REQUEST = 'classList/CLASSES_REQUEST'
export const CLASSES_SUCCESS = 'classList/CLASSES_SUCCESS'
export const CLASSES_FAILURE = 'classList/CLASSES_FAILURE'
export const SELECT_DAY = 'classList/SELECT_DAY'
import {
	getIsLoading,
	getIsFailed,
	getClassIds,
} from '../selectors';

import fetch from 'isomorphic-fetch';

export const requestClasses = (startDate) => {
	return {
		type: CLASSES_REQUEST,
		startDate,
	}
}

export const processSuccess = (response, startDate) => {
	return {
		type: CLASSES_SUCCESS,
		classes: (response && response.classes) || [],
		startDate,
	}
}

export const processError = (error, startDate) => {
	return {
		type: CLASSES_FAILURE,
		error,
		startDate,
	}
}
export const selectDay = (startDate) => {
	return {
		type: SELECT_DAY,
		startDate,
	}
}

export const loadClasses = (startDate) => {
	return (dispatch, getState) => {
		dispatch(selectDay(startDate));
		// Set new date before loading state info
		const state = getState();
		const isLoading = getIsLoading(state);
		const hasClasses = getClassIds(state);
		// Load classes if not already requested
		if (!isLoading && !hasClasses) {
			dispatch(requestClasses(startDate));
			fetch(`https://jason-tracker.herokuapp.com/trackers/gym/classes?startDate=${startDate}`)
				.then(response => response.json())
				.then((response) => dispatch(processSuccess(response, startDate)))
				.catch((err) => dispatch(processError(err, startDate)));
		}
	}

}
