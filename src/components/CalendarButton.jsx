import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToCalendar, removeFromCalendar } from '../actions/calendar';

export const CalendarButton = props => {
  const { classId, isOnCalendar, onAddClick, onRemoveClick } = props;
  const buttonText = isOnCalendar ? 'Remove From Calendar' : 'Add to Calendar';
  const onClick = () =>
    isOnCalendar ? onRemoveClick(classId) : onAddClick(classId);
  const cancelClass = isOnCalendar ? 'cancel' : '';
  return (
    <button
     className={`cta-button ${cancelClass}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

CalendarButton.propTypes = {
  isOnCalendar: PropTypes.bool
};

CalendarButton.defaultProps = {
  isOnCalendar: false
};

const mapDispatchToProps = (dispatch) => ({
  onAddClick: (classId) => dispatch(addToCalendar(classId)),
  onRemoveClick: (classId) => dispatch(removeFromCalendar(classId))
});

export default connect(null, mapDispatchToProps)(CalendarButton);
