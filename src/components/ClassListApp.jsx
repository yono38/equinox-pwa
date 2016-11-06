// components/CounterApp.jsx
import { connect } from 'react-redux';
import { loadClasses } from '../actions';
import ClassList from './ClassList';

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.classes.map(classItem => {
      return {
        name: classItem.name,
        instructor: classItem.instructor,
        displayTime: classItem.displayTime,
        isCycling: false,
        hasReservation: classItem.status.hasReservation,
        isClassFull: classItem.status.isClassFull,
        isBookable: classItem.isBookingRequired,
        reservableItemsLeft: classItem.status.reservableItemsLeft
      };
    }),
    isLoading: state.requestPending || false
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDidMount: () => {
      loadClasses(dispatch);
    }
  }
};

const ClassListApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassList);

export default ClassListApp;