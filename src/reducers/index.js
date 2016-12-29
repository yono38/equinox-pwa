import { combineReducers } from 'redux';
import bikes from './bikes';
import calendar from './calendar';
import checkins from './checkins';
import classes from './classes';
import workouts from './workouts';

export default combineReducers({ bikes, calendar, checkins, classes, workouts });
