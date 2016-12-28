import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loading';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import { getIsLoading, getEventsByIsoWeekday } from '../selectors/calendar';
import { loadCalendar } from '../actions/calendar';

import './Calendar.css';

class Calendar extends Component {
  componentDidMount() {
    const { isLoading, eventsByDay, initCalendar } = this.props;
    if (!isLoading && isEmpty(eventsByDay)) {
      initCalendar();
    }
  }
  render() {
    const { isLoading, eventsByDay } = this.props;
    console.log(eventsByDay);
    const isoDays = [...Array(7).keys()];
    const calEvents = isoDays.map(day => {
      let eventInfoElem = null;
      const eventItem = eventsByDay[day];
      if (eventItem) {
        const instructor = eventItem.instructors[0].instructor;
        const startTime = moment(eventItem.startDate).format('h:mm A');
        const endTime = moment(eventItem.endDate).format('h:mm A');
        eventInfoElem = (
          <div className="event-info">
            <h2>{eventItem.name}</h2>
            <p>{`${instructor.firstName} ${instructor.lastName}`}</p>
            <p>{`${startTime} - ${endTime}`}</p>
          </div>
        );
      }

      return (
        <div key={`day-${day}`} className="day-container">
          <div className="day-label">
            {moment().isoWeekday(day).format('dd')}
          </div>
          <div className="event-container">
            {eventInfoElem}
          </div>
        </div>
      )
    });

    const emptyCalCta = isEmpty(eventsByDay) ? (
      <div className="empty-cal-cta">
        You have not booked any classes yet, why not
        <Link to="/classes">find one</Link> now?
      </div>
    ) : null;

    return (
      <div className="calendar">
        <div className="header">
          Calendar
          <Link className="menu icon-left-arrow" to="/" />
        </div>
        { isLoading &&
          <div className="loading">
            <Loader type="bubbles" />
          </div>
        }
        { !isLoading && emptyCalCta }
        { !isLoading && calEvents }
      </div>
    );
  }
}

Calendar.propTypes = {
  isLoading: PropTypes.bool,
  eventsByDay: PropTypes.object,
  initCalendar: PropTypes.func
};

Calendar.defaultProps = {
  isLoading: true,
  eventsByDay: {},
  initCalendar: () => {}
};

const mapStateToProps = (state, ownProps) => ({
  isLoading: getIsLoading(state),
  eventsByDay: getEventsByIsoWeekday(state)
});

const mapDispatchToProps = (dispatch) => ({
  initCalendar: () => dispatch(loadCalendar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
