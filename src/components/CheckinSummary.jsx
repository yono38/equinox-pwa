import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { loadCheckins } from '../actions/checkins';
import Loader from 'react-loading';
import './CheckinSummary.css';

export class CheckinSummary extends Component {
  componentDidMount() {
    if (this.props.onDidMount && isEmpty(this.props.totals)) {
      this.props.onDidMount();
    }
  }

  render() {
    const { totals, isLoading } = this.props;
    const dayCheckinBars = [1,2,3,4,5].map(idx =>
      <div
        key={`checkin-summary-${idx}`}
        className={idx <= totals.week ? 'checkin active': 'checkin'}
      >
        {idx}
      </div>
    );
    return (
      <div className="checkin-summary card">
        <div className="card-header">
          <h2 className="color-lightgrey">Weekly Goal Check-ins</h2>
          <a href="#" className="color-teal">
            See All Check-ins
            {' '}
            <span className="icon-horizontal-arrow" />
          </a>
        </div>
        { isLoading &&
          <div className="loading no-margin-top">
            <Loader type="bubbles" color="#1aeca9" />
          </div>
        }
        { !isLoading ?
          <div className="card-body">
            <div className="checkin-container">
              {dayCheckinBars}
            </div>
            <h4>Monthly Checkins: {totals.month}</h4>
          </div> : null
        }
      </div>
    )
  }
}

CheckinSummary.propTypes = {
  totals: PropTypes.object,
  isLoading: PropTypes.bool
};

CheckinSummary.defaultProps = {
  totals: {}
};

const mapStateToProps = (state, ownProps) => {
  const checkInState = state.modules.checkins;
  return {
    totals: checkInState.totals,
    isLoading: checkInState.requestPending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      loadCheckins(dispatch);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckinSummary);
