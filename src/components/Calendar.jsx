import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loading';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {
  getIsLoading,
  getEventsByIsoWeekday,
  getIsFromCache
} from '../selectors/calendar';
import { loadCalendar } from '../actions/calendar';
import parseClassInfo from '../utils/parseClassInfo';
import Header from './Header';

import './Calendar.css';

class Calendar extends Component {
  componentDidMount() {
    const { isLoading, eventsByDay, initCalendar, isFromCache } = this.props;
    if (!isLoading && (isEmpty(eventsByDay) || isFromCache)) {
      initCalendar();
    }
  }

  render() {
    const { isLoading, eventsByDay } = this.props;
    const isoDays = [...Array(7).keys()];
    const calEvents = isoDays.map(day => {
      let eventInfoElem = null;
      const eventItem = parseClassInfo(eventsByDay[day]);
      if (!isEmpty(eventItem)) {
        eventInfoElem = (
          <div className="event-info">
            <h2>{eventItem.name}</h2>
            <p>{`${eventItem.instructor.firstName} ${eventItem.instructor.lastName}`}</p>
            <p>{`${eventItem.startTime} - ${eventItem.endTime}`}</p>
          </div>
        );
      }
      return (
        <div key={`day-${day}`} className="day-container">
          <div className="day-label">
            {moment().weekday(day).format('dd')}
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
        <Header title="Calendar" />
        { isLoading && isEmpty(eventsByDay) &&
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
  eventsByDay: PropTypes.object,
  isFromCache: PropTypes.bool,
  initCalendar: PropTypes.func,
  isLoading: PropTypes.bool
};

Calendar.defaultProps = {
  eventsByDay: {},
  initCalendar: () => {},
  isFromCache: false,
  isLoading: true
};

const mapStateToProps = (state, ownProps) => ({
  eventsByDay: getEventsByIsoWeekday(state),
  isFromCache: getIsFromCache(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  initCalendar: () => dispatch(loadCalendar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
