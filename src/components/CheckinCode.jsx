import React, { Component } from 'react';
import Barcode from 'react-barcode';

import './CheckinCode.css'
import Header from './Header';

export default class CheckinCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: window.localStorage.getItem('barcode') || '',
      codeInput: ''
    };
  }

  generateBarcode = () => {
    window.localStorage.setItem('barcode', this.state.codeInput);
    this.setState({
      barcode: this.state.codeInput
    });
  }

  resetBarcode = () => {
    const oldCode = window.localStorage.getItem('barcode');
    window.localStorage.removeItem('barcode');
    this.setState({
      barcode: null,
      codeInput: oldCode || ''
    });
  }

  update = (event) => {
    this.setState({
      codeInput: event.target.value,
    });
  }

  render() {
    let body;
    if (!this.state.barcode) {
      body = (
        <form className="barcode-form">
          <h4>Enter the Number on your Gym Card</h4>
          <label htmlFor="barcode">Member Barcode:</label>
          <input
            placeholder="T1234567"
            name="barcode"
            ref="barcode"
            type="text"
            value={this.state.codeInput}
            onChange={this.update}
          />
          <button onClick={this.generateBarcode} className="submit-button barcode-button">
            Generate Barcode
          </button>
        </form>
      );
    } else {
      body = (
        <div className="checkin-barcode">
          <Barcode
            value={this.state.barcode}
            format="CODE39"
          />
          <button onClick={this.resetBarcode} className="submit-button barcode-button">
            Change Member Number
          </button>
        </div>
      )
    }
    return (
      <div className="gym-checkin">
        <Header title="Equinox Check In" />
        {body}
      </div>
    )
  }
}

CheckinCode.PropTypes = {};
