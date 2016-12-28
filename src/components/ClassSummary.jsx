import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ClassSummary extends Component {
  render() {
    const classItem = this.props.classItem;
    const bookedStatus = classItem.status.hasReservation ?
      <div className="text-small">
        <span className="black-badge booked">Booked</span>
        {' '}
        <strong>Bike #22</strong>
      </div> : null;
    return (
    <div className="card">
      <div className="card-header">
        <h2 className="color-lightgrey">Up Next</h2>
        <Link to="/calendar" className="color-teal">
          View Calendar{' '}
          <span className="icon-horizontal-arrow" />
        </Link>
      </div>
      <div className="Home-up-next-body card-body">
        <h3>{classItem.name}</h3>
        <p className="color-grey">{classItem.instructor}</p>
        <p className="color-grey">{classItem.displayTime} @ {classItem.facility}</p>
        {bookedStatus}
      </div>
    </div>
  );
  }
}

ClassSummary.propTypes = {
  classItem: PropTypes.object,
  isLoading: PropTypes.bool
}

ClassSummary.defaultProps = {
  classItem: {
     "name":"The Pursuit: Build",
     "startDate":"2016-11-02T10:30:00Z",
     "endDate":"2016-11-02T11:20:00Z",
     "displayTime":"06:30 AM - 07:20 AM",
     "timeSlot":"Morning",
     "status":{
        "isWithinReservationPeriod":true,
        "isWithinCancelPeriod":true,
        "isClassFull":true,
        "totalReservableItems":0,
        "reservableItemsLeft":0,
        "hasReservation":true,
        "localId":null,
        "reservationStartTimeLeft":-66750,
        "reservationEndTimeLeft":24748,
        "reservationStartDaysLeft":0,
        "reservationStartDate":"0001-01-01T00:00:00",
        "timeLeftText":null,
        "isBookingClosedClassPending":false
     },
     "id":5907151,
     "facility":"Brookfield",
     "instructor":"Shanda Woods",
     "category":"Cycling",
     "isBookingRequired":true
  },
  isLoading: false,
}

export default ClassSummary;
