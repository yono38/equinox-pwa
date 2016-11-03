import React, { PropTypes } from 'react';
import './ClassTile.css';
import BookingButton from './BookingButton';

const ClassTile = props => {
  const {
    name,
    instructor,
    displayTime,
    isCycling,
    hasReservation,
    isClassFull,
    isBookable,
    reservableItemsLeft
  } = props;

  const spotsLeftText = isCycling ? 'bikes' : 'spots';
  let spotsLeftElem = (reservableItemsLeft > 0) ?
    <p className="color-grey text-small">
      {reservableItemsLeft} {spotsLeftText} left
    </p> : null;
  const bookedBadge = hasReservation ?
    <div className="text-small">
      <span className="black-badge booked">Booked</span>
    </div> : null;
  const bookingBtn = isBookable ?
    <div className="card-cta">
      <BookingButton
        hasReservation={hasReservation}
        isClassFull={isClassFull}
      />
    </div> : null;
    
  return (
    <div className="class-tile card flex">
      <div className="card-body">
        <h3>{name}</h3>
        {spotsLeftElem}
        <p className="label color-grey">{instructor}</p>
        <p className="label color-grey">{displayTime}</p>
        {bookedBadge}
      </div>
      { bookingBtn }
    </div>
  )
}

ClassTile.propTypes = {
  name: PropTypes.string,
  instructor: PropTypes.string,
  displayTime: PropTypes.string,
  isBookable: PropTypes.bool,
  isCycling: PropTypes.bool,
  reservableItemsLeft: PropTypes.number,
  hasReservation: PropTypes.bool,
  isClassFull: PropTypes.bool
};

ClassTile.defaultProps = {
  name: 'The Pursuit: Burn',
  instructor: 'Arnold Schwartenzegger',
  displayTime: '06:30 AM - 07:20 AM',
  isBookable: true,
  isCycling: true,
  reservableItemsLeft: 10,
  hasReservation: false,
  isClassFull: false
};

export default ClassTile;
