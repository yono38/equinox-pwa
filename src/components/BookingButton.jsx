import React, { PropTypes } from 'react';
import './BookingButton.css';

const BookingButton = (props) => {
  const { isClassFull, hasReservation } = props;
  let buttonText = isClassFull ? 'Full' : 'Book';
  let cancelClass = '';
  if (hasReservation) {
    buttonText = 'Cancel';
    cancelClass = 'cancel';
  }
  return (
    <button
      disabled={!hasReservation && isClassFull}
      className={`booking-button ${cancelClass}`}
    >
      {buttonText}
    </button>
  )
}

BookingButton.propTypes = {
  hasReservation: PropTypes.bool,
  isClassFull: PropTypes.bool
};

export default BookingButton;
