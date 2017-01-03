import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import {
  getIsLoading,
  getUpcomingEvent,
  getIsFromCache
} from '../selectors/calendar';
import { loadCalendar } from '../actions/calendar';
import parseClassInfo from '../utils/parseClassInfo';

class ClassSummary extends Component {
  componentDidMount() {
    const { isLoading, eventItem, initCalendar, isFromCache } = this.props;
    if (!isLoading && (isEmpty(eventItem) || isFromCache)) {
      initCalendar();
    }
  }

  render() {
    const classItem = parseClassInfo(this.props.classItem);
    let classBody;
    if (isEmpty(classItem)) {
      classBody = (
        <div className="Home-up-next-body card-body">
          <p>
            You have not booked any upcoming classes yet, why not
            {' '}<Link to="/classes">find one</Link> now?
          </p>
        </div>
      );
    } else {
      const bookedStatus = classItem.status && classItem.status.hasReservation ?
        <div className="text-small">
          <span className="black-badge booked">Booked</span>
          {' '}
          <strong>Bike #22</strong>
        </div> : null;
      classBody = (
        <div className="Home-up-next-body card-body">
          <h3>{classItem.name}</h3>
          <p className="color-grey">
            {`${classItem.instructor.firstName} ${classItem.instructor.lastName}`}
          </p>
          <p className="color-grey">{classItem.startTime} - {classItem.endTime}</p>
          <p className="color-grey">{classItem.displayWeekday}</p>
          {bookedStatus}
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-header">
          <h2 className="color-lightgrey">Up Next</h2>
          <Link to="/calendar" className="color-teal">
            View Calendar{' '}
            <span className="icon-horizontal-arrow" />
          </Link>
        </div>
        {classBody}
      </div>
    );
  }
}

ClassSummary.propTypes = {
  classItem: PropTypes.object,
  isLoading: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  classItem: getUpcomingEvent(state),
  isFromCache: getIsFromCache(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  initCalendar: () => dispatch(loadCalendar())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassSummary);
