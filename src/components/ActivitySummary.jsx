import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loading';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {
  getIsLoading,
  getRecentWorkout,
} from '../selectors/workouts';
import { loadWorkouts } from '../actions/workouts';
import parseClassInfo from '../utils/parseClassInfo';

class ActivitySummary extends Component {
  componentDidMount() {
    const { isLoading, classItem, initWorkouts } = this.props;
    if (!isLoading && isEmpty(classItem)) {
      initWorkouts();
    }
  }

  render() {
    const { classItem, isLoading } = this.props;
    let classBody;
    if (isLoading) {
      classBody = (
        <div className="loading no-margin-top">
          <Loader type="bubbles" color="#1aeca9" />
        </div>
      );
    } else if (isEmpty(classItem)) {
      classBody = (
        <div className="card-body">
          <p>
            No recent activity found, maybe you should
            {' '}<Link to="/classes">book something</Link> now?
          </p>
        </div>
      );
    } else {
      classBody = (
        <div className="card-body">
          <h3>{classItem.name}</h3>
          <p className="color-grey">{moment(classItem.startDate).calendar()}</p>
        </div>
      )
    }

    return (
      <div className="card">
        <div className="card-header">
          <h2 className="color-lightgrey">Recent Activity</h2>
          <Link to="/activity" className="color-teal">
            See All Activity{' '}
            <span className="icon-horizontal-arrow" />
          </Link>
        </div>
        {classBody}

      </div>
    );
  }
}

ActivitySummary.propTypes = {
  classItem: PropTypes.object,
  isLoading: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  classItem: getRecentWorkout(state),
  // isFromCache: getIsFromCache(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  initWorkouts: () => dispatch(loadWorkouts({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySummary);
