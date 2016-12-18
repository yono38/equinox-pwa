import { combineReducers } from 'redux';
import bikes from './bikes';
import classes from './classes';
import checkins from './checkins';

export default combineReducers({bikes, classes, checkins});
