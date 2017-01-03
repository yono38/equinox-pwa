import { API_ROOT_URL } from '../constants';
import { getIsLoading } from '../selectors/calendar';
import { getClass } from '../selectors/classes';
import { getBookingAlertSettings } from '../selectors/settings';
import { getAuthToken } from '../utils';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

export const CALENDAR_REQUEST = 'calendar/CALENDAR_REQUEST';
export const CALENDAR_SUCCESS = 'calendar/CALENDAR_SUCCESS';
export const CALENDAR_FAILURE = 'calendar/CALENDAR_FAILURE';

export const ADD_TO_CALENDAR = 'calendar/ADD_TO_CALENDAR';
export const REMOVE_FROM_CALENDAR = 'calendar/REMOVE_FROM_CALENDAR';

export const requestCalendar = (classId) => ({
	type: CALENDAR_REQUEST,
  classId
});

export const processSuccess = (response) => ({
	type: CALENDAR_SUCCESS,
  events: (response && response.events) || []
});

export const processError = (error) => ({
	type: CALENDAR_FAILURE,
	error
});

export const loadCalendar = (
	fromDate = moment().isoWeekday(0).format('YYYY-MM-DD'),
	toDate = moment().isoWeekday(6).format('YYYY-MM-DD')
) => {
	return (dispatch, getState) => {
		// Set new date before loading state info
		const state = getState();
		const isLoading = getIsLoading(state);
		// Load classes if not already requested
		if (!isLoading) {
			dispatch(requestCalendar());
			const apiUrl = `${API_ROOT_URL}/calendar?fromDate=${fromDate}&toDate=${toDate}`;
			fetch(apiUrl, {
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

const addSuccess = (classId) => ({
  type: ADD_TO_CALENDAR,
  classId
});

const removeSuccess = (classId, eventItem) => ({
  type: REMOVE_FROM_CALENDAR,
  classId,
	eventItem
});

export const setBookingAlert = (classItem = { status: {} }) => {
	console.log('Preparing to set booking alert...');
	if ('serviceWorker' in navigator &&
		navigator.serviceWorker.controller) {
			const delay = moment(classItem.status.reservationStartDate).diff(moment());
			if (delay > 0) {
				console.log("Sending to service worker");
				navigator.serviceWorker.controller.postMessage({
						command: "addNotification",
						name: classItem.name || "Booking Has Opened",
						alertTime: classItem.status.reservationStartDate,
						delay
				});
			} else {
				console.log('Class booking has already opened, no alert needed');
			}
	} else {
		console.log('Service Worker not ready.');
	}
}

export const addToCalendar = (classId) => {
  return (dispatch, getState) => {
    fetch(`${API_ROOT_URL}/calendar/${classId}`, {
				method: 'POST',
        headers: {
          'Authorization': getAuthToken()
        }
      })
			.then(response => response.json())
      .then((response) => {
				dispatch(addSuccess(classId, response));
				const state = getState();
				// If booking reminders enabled, add booking alertTime if bookable
				if (getBookingAlertSettings(state)) {
					const classItem = getClass(state, { classId });
					if (classItem.isBookingRequired) {
						setBookingAlert(classItem);
					}
				}
				return response;
			})
  };
};

export const removeFromCalendar = (classId) => {
  return (dispatch) => {
    fetch(`${API_ROOT_URL}/calendar/${classId}`, {
				method: 'DELETE',
        headers: {
          'Authorization': getAuthToken()
        }
      })
      .then(() => dispatch(removeSuccess(classId)))
  };
};
