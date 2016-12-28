import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './BookingButton.css';

const BookingButton = (props) => {
  const { isClassFull, isBookingOpen, hasReservation, classId } = props;
  let buttonText = isClassFull ? 'Full' : 'Book';
  let cancelClass = '';
  if (hasReservation) {
    buttonText = 'Cancel';
    cancelClass = 'cancel';
  } else if (!isBookingOpen) {
    buttonText = 'Not Open';
  }
  return (
    <Link to={`/classes/${classId}`}>
      <button
        disabled={!hasReservation && (!isBookingOpen || isClassFull)}
        className={`cta-button booking-button ${cancelClass}`}
      >
        {buttonText}
      </button>
    </Link>
  )
}

BookingButton.propTypes = {
  classId: PropTypes.number,
  hasReservation: PropTypes.bool,
  isClassFull: PropTypes.bool,
};

export default BookingButton;
