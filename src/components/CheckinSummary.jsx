import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { loadCheckins } from '../actions/checkins';
import Loader from './Loader';
import './CheckinSummary.css';

export class CheckinSummary extends Component {
  componentDidMount() {
    if (this.props.onDidMount && isEmpty(this.props.totals)) {
      this.props.onDidMount();
    }
  }

  render() {
    console.log(this.props.totals.week);
    const dayCheckinBars = [1,2,3,4,5].map(idx =>
      <div
        key={`checkin-summary-${idx}`}
        className={idx <= this.props.totals.week ? 'checkin active': 'checkin'}
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
        <Loader isLoading={this.props.isLoading} className="color-teal small" />
        { !this.props.isLoading ?
          <div className="card-body">
            <div className="checkin-container">
              {dayCheckinBars}
            </div>
            <h4>Monthly Checkins: {this.props.totals.month}</h4>
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
