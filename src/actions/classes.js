// Namespace actions
export const CLASSES_REQUEST = 'classList/CLASSES_REQUEST'
export const CLASSES_SUCCESS = 'classList/CLASSES_SUCCESS'
export const CLASSES_FAILURE = 'classList/CLASSES_FAILURE'

export const BOOK_CLASS_REQUEST = 'classList/BOOK_CLASS_REQUEST'
export const BOOK_CLASS_SUCCESS = 'classList/BOOK_CLASS_SUCCESS'
export const BOOK_CLASS_FAILURE = 'classList/BOOK_CLASS_FAILURE'

export const CANCEL_CLASS_REQUEST = 'classList/CANCEL_CLASS_REQUEST'
export const CANCEL_CLASS_SUCCESS = 'classList/CANCEL_CLASS_SUCCESS'
export const CANCEL_CLASS_FAILURE = 'classList/CANCEL_CLASS_FAILURE'

export const SELECT_DAY = 'classList/SELECT_DAY'

import {
	getIsLoading,
	getIsFailed,
	getClassIds,
} from '../selectors/classes';

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

export const bookBike = (classId, bikeId, bikeName) => {
	return (dispatch, getState) => {
		fetch(`https://jason-tracker.herokuapp.com/trackers/gym/classes/${classId}/book/${bikeId}`)
			.then(response => response.json())
			.then(response => {
				if (response.reservationSuccess === true) {
					dispatch({
						type: BOOK_CLASS_SUCCESS,
						classId,
						bikeName
					});
				} else {
					const errorMessage = (response.error && response.error[0]) ?
						response.error[0].userFriendlyDescription : 'Failed to book class';
					dispatch({
						type: BOOK_CLASS_FAILURE,
						error: new Error(errorMessage)
					});
				}
			})
			.catch(error => dispatch({ type: BOOK_CLASS_FAILURE, error }));
		};
}

export const cancelBike = (classId) => {
	return (dispatch, getState) => {
		fetch(`https://jason-tracker.herokuapp.com/trackers/gym/classes/${classId}/cancel`)
			.then(response => response.json())
			.then(response => {
				if (response.success === true) {
					dispatch({
						type: CANCEL_CLASS_SUCCESS,
						reservationStatus: response.reservationStatus,
						classId
					});
				} else {
					dispatch({
						type: CANCEL_CLASS_FAILURE,
						error: new Error('Failed to cancel class')
					});
				}
			})
			.catch((error) => dispatch({ type: CANCEL_CLASS_FAILURE, error }));
	};
}
