import React, { Component } from 'react';
import logo from './equinox-logo.png';
import './Home.css';
import { Link } from 'react-router';

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
              <div className="icon-search color-teal" />
              <h2 className="text-small">Search Classes</h2>
            </Link>
            <div className="Home-action">
              <div className="icon-book-a-class color-teal" />
              <h2 className="text-small">Book a class</h2>
            </div>
            <div className="Home-action">
              <div className="icon-heart color-teal" />
              <h2 className="text-small">View Activity</h2>
            </div>
          </div>
        </div>

        <div className="Home-up-next card">
          <div className="Home-up-next-header card-header">
            <h2 className="color-lightgrey">Up Next</h2>
            <a href="#" className="color-teal">
              View Calendar{' '}
              <span className="icon-horizontal-arrow" />
            </a>
          </div>
          <div className="Home-up-next-body card-body">
            <h3>The Pursuit: Burn</h3>
            <p className="color-grey">Arnold Schwartenzegger</p>
            <p className="color-grey">12-1 @ Brookfield Place</p>
            <div className="text-small">
              <span className="black-badge booked">Booked</span>
              {' '}
              <strong>Bike #22</strong>
            </div>
          </div>
        </div>

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

        <div className="card">
          <div className="card-header">
            <h2 className="color-lightgrey">Weekly Goal Check-ins</h2>
            <a href="#" className="color-teal">
              See All Check-ins
              {' '}
              <span className="icon-horizontal-arrow" />
            </a>
          </div>
          <div className="card-body">
            <div className="checkin-container">
              <div className="checkin active">1</div>
              <div className="checkin active">2</div>
              <div className="checkin">3</div>
              <div className="checkin">4</div>
              <div className="checkin">5</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
