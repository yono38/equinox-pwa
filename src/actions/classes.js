// Namespace actions
export const CLASSES_REQUEST = 'classList/CLASSES_REQUEST'
export const CLASSES_SUCCESS = 'classList/CLASSES_SUCCESS'
export const CLASSES_FAILURE = 'classList/CLASSES_FAILURE'
export const SELECT_DAY = 'classList/SELECT_DAY'

import fetch from 'isomorphic-fetch';

export const requestClasses = () => {
	return {
		type: CLASSES_REQUEST
	}
}

export const processSuccess = (response) => {
	console.log(response);
	return {
		type: CLASSES_SUCCESS,
		classes: (response && response.classes) || [],
	}
}

export const processError = error => {
	return {
		type: CLASSES_FAILURE,
		error
	}
}

export const loadClasses = (dispatch) => {
	dispatch(requestClasses());
	fetch(`http://localhost:4555/trackers/gym/classes`)
		.then(response => response.json())
		.then((response) => dispatch(processSuccess(response)))
		.catch((err) => dispatch(processError(err)));
}
