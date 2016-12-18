import React, { Component } from 'react';
import logo from './equinox-logo.png';
import './Home.css';
import { Link } from 'react-router';
import CheckinSummary from './components/CheckinSummary';
import ClassSummary from './components/ClassSummary';

class Home extends Component {
  render() {
    return (
      <div className="Home">
       <div className="Home-intro">
          <div className="header Home-header">
            <img src={logo} className="equinox-logo" alt="logo" />
            <div className="icon-menu menu" />
          </div>
          <div className="Home-welcome">
            <div className="Home-welcome-text">
              <h1 className="no-margin">Jason</h1>
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
            <div className="Home-action">
              <div className="icon-heart color-teal" />
              <h2 className="text-small">View Activity</h2>
            </div>
          </div>
        </div>

        <ClassSummary />

        <div className="card">
          <div className="card-header">
            <h2 className="color-lightgrey">Recent Activity</h2>
            <a href="#" className="color-teal">
              See All Activity{' '}
              <span className="icon-horizontal-arrow" />
            </a>
          </div>
          <div className="card-body">
            <h3>Vinyasa Yoga</h3>
            <p className="color-grey">2 Days Ago</p>
          </div>
        </div>

        <CheckinSummary />

      </div>
    );
  }
}

export default Home;
