import React, { PropTypes } from 'react';
import './ClassTile.css';
import BookingButton from './BookingButton';
import CalendarButton from './CalendarButton';

const ClassTile = props => {
  const {
    bikeId,
    classId,
    name,
    instructor,
    displayTime,
    isCycling,
    hasReservation,
    isOnCalendar,
    isClassFull,
    isBookable,
    isBookingOpen,
    reservableItemsLeft,
    timeLeftText
  } = props;

  const spotsLeftText = isCycling ? 'bikes' : 'spots';
  let spotsLeftElem = (isBookingOpen && reservableItemsLeft > 0) ?
    <p className="color-grey text-small">
      {reservableItemsLeft} {spotsLeftText} left
    </p> : null;
  const timeLeftLabel = timeLeftText ? (
    <p className="text-small">
      <span className="icon-lock" />
      <strong>&nbsp;{timeLeftText}</strong>
    </p>
  ) : null;
  const bookedBadge = hasReservation ?
    <div className="text-small">
      <span className="black-badge booked">Booked</span>
      {' '}
      <strong>Bike #{bikeId}</strong>
    </div> : null;
  const ctaBtn = (isBookable && isBookingOpen && !isOnCalendar) ?
      <BookingButton
        classId={classId}
        hasReservation={hasReservation}
        isClassFull={isClassFull}
        isBookingOpen={isBookingOpen}
      /> :
      <CalendarButton
        classId={classId}
        isOnCalendar={isOnCalendar}
      />;

  return (
    <div className="class-tile card flex">
      <div className="card-body">
        <h3>{name}</h3>
        {timeLeftLabel}
        {spotsLeftElem}
        <p className="label color-grey">{instructor}</p>
        <p className="label color-grey">{displayTime}</p>
        {bookedBadge}
      </div>
      <div className="card-cta">
        { ctaBtn }
      </div>
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

export default ClassTile;
