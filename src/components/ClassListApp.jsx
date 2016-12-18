// components/CounterApp.jsx
import { connect } from 'react-redux';
import { loadClasses } from '../actions/classes';
import ClassList from './ClassList';

import {
  getSelectedDay,
  getIsLoading,
  getIsFailed,
  getMappedClasses
} from '../selectors/classes';

const mapStateToProps = (state, ownProps) => {
  return {
    headerTitle: ownProps.bookableOnly ? 'Book a Class' : 'Class List',
    classes: getMappedClasses(state, ownProps),
    selectedDay: getSelectedDay(state),
    isLoading: getIsLoading(state),
    // TODO use this
    isFailed: getIsFailed(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initClassList: (startDate) => dispatch(loadClasses(startDate))
  }
};

const ClassListApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassList);


export default ClassListApp;
