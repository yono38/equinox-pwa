import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './equinox-logo.png';
import './Home.css';
import { Link } from 'react-router';
import CheckinSummary from './components/CheckinSummary';
import ClassSummary from './components/ClassSummary';
import ActivitySummary from './components/ActivitySummary';
import HomeMenu from './components/HomeMenu';
import { logout } from './actions/auth';

class Home extends Component {
  render() {
    const logoutOnClick = () => {
      this.props.onClickLogout(this.props.router.replace);
    }
    return (
      <div className="Home">
       <div className="Home-intro">
          <div className="header Home-header">
            <img src={logo} className="equinox-logo" alt="logo" />
            <HomeMenu logoutOnClick={logoutOnClick} />
          </div>
          <div className="Home-welcome">
            <div className="Home-welcome-text">
              <h1 className="no-margin">{this.props.firstName}</h1>
              <p className="text-small no-margin color-lightgrey">Welcome to Brookfield Place</p>
            </div>
            <div className="Home-checkin-wrHomeer">
              <a href="#" className="Home-checkin-button text-small">
              <span className="icon-marker-dot" />
              {' '}
              Check In
              </a>
            </div>
          </div>
          <div className="Home-actions">
            <Link to="/classes" className="Home-action">
              <div className="icon-training color-teal" />
              <h2 className="text-small">Class List</h2>
            </Link>
            <Link to="/classes?bookable=true" className="Home-action">
              <div className="icon-book-a-class color-teal" />
              <h2 className="text-small">Book a class</h2>
            </Link>
            <Link to="/activity" className="Home-action">
              <div className="icon-heart color-teal" />
              <h2 className="text-small">View Activity</h2>
            </Link>
          </div>
        </div>

        <ClassSummary />

        <ActivitySummary />

        <CheckinSummary />

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const firstName = localStorage.getItem('name') || 'Welcome back';
  return { firstName };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLogout: (replace) => dispatch(logout(replace))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
