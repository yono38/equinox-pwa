import React, { Component } from 'react';
import logo from './equinox-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <div className="App-intro">
          <div className="App-header">
            <img src={logo} className="equinox-logo" alt="logo" />
            <div className="icon-menu menu" />
          </div>
          <div className="App-welcome">
            <div className="App-welcome-text">
              <h1 className="no-margin">Jason</h1>
              <p className="text-small no-margin color-grey">Welcome to Brookfield Place</p>
            </div>
          </div>
          <div className="App-actions">
            <div className="App-action">
              <div className="icon-search color-teal" />
              <h2 className="text-small">Search Classes</h2>
            </div>
            <div className="App-action">
              <div className="icon-book-a-class color-teal" />
              <h2 className="text-small">Book a class</h2>
            </div>
            <div className="App-action">
              <div className="icon-heart color-teal" />
              <h2 className="text-small">View Activity</h2>
            </div>
          </div>
        </div>

        <div className="App-up-next card">
          <div className="App-up-next-header card-header">
            <h2 className="color-grey">Up Next</h2>
            <a href="#" className="color-teal">
              View Calendar{' '}
              <span className="icon-horizontal-arrow" />
            </a>
          </div>
          <div className="App-up-next-body card-body">
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
            <h2 className="color-grey">Recent Activity</h2>
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
            <h2 className="color-grey">Weekly Goal Check-ins</h2>
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

export default App;
