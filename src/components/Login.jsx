import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import './Login.css'

import logo from '../equinox-logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  submitLogin = () => {
    this.props.onClickLogin(this.state, this.props.router.replace);
  }

  render() {
    const handleInput = refName =>
      event => this.setState({ [refName]: event.target.value });

    return (
      <div className="login-page">
        <div className="header">
          <img src={logo} className="equinox-logo" alt="logo" />
        </div>
        <h1>Welcome</h1>
        <div className="login-form">
          <input
            placeholder="Enter Email"
            ref="username"
            type="text"
            value={this.state.username}
            onChange={handleInput('username')}
          />
          <input
            placeholder="Enter Password"
            ref="password"
            type="password"
            value={this.state.password}
            onChange={handleInput('password')}
          />
          <button onClick={this.submitLogin} className="sign-in-button">
            Sign in to Equinox
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onClickLogin: PropTypes.fun
};

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLogin: (auth, replace) => dispatch(login(auth, replace))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
