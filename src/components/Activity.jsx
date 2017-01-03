import React, { Component, PropTypes } from 'react';
import Loader from 'react-loading';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import {
  getIsLoading,
  getWorkouts
} from '../selectors/workouts';
import { loadWorkouts } from '../actions/workouts';
import Header from './Header';

import './Activity.css';

class Activity extends Component {
  componentDidMount() {
    const { isLoading, workouts, initActivity } = this.props;
    if (!isLoading && isEmpty(workouts)) {
      initActivity();
    }
  }

  render() {
    const { isLoading, workouts } = this.props;
    const monthName = moment().format('MMMM');
    const workoutsElem = workouts.map((workout) => {
      const totalDistance = workout.totalDistance ?
          <p>{`${workout.totalDistance} MI`}</p> : null;
      return (<div className="card">
        <p className="color-grey">
          {moment(workout.startDate).format('MMM D')}
        </p>
        <p><strong>{workout.name}</strong></p>
        <p>{workout.trainerName}</p>
        <p className="calories">{workout.totalCalories} Cal</p>
        { totalDistance }
      </div>);
    });
    const recentActivity = (
      <div className="recent-activity-body">
        <h2>All {monthName} Workouts</h2>
        { isEmpty(workouts) &&
          <p className="empty-workouts">You currently have no workouts for this month.</p>
        }
        { workoutsElem }
      </div>
    );

    return (
      <div className="activity">
        <Header title="Recent Activity" />
        { isLoading && isEmpty(workouts) &&
          <div className="loading">
            <Loader type="bubbles" />
          </div>
        }
        { !isLoading && recentActivity }
      </div>
    );
  }
};

Activity.propTypes = {
  workouts: PropTypes.array,
  isLoading: PropTypes.bool,
  initActivity: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  workouts: getWorkouts(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  initActivity: () => dispatch(loadWorkouts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
