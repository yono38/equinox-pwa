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
    const { username, password } = this.state;
    const cleanedAuth = {
      username: username.trim(),
      password: password.trim()
    };
    this.props.onClickLogin(cleanedAuth, this.props.router.replace);
  }

  loginOnEnter = (e) => {
    if (e.key === 'Enter') {
      this.submitLogin();
    }
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
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter Email"
            name="email"
            ref="username"
            type="text"
            value={this.state.username}
            onChange={handleInput('username')}
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter Password"
            name="password"
            ref="password"
            type="password"
            value={this.state.password}
            onChange={handleInput('password')}
            onKeyPress={this.loginOnEnter}
          />
          <button onClick={this.submitLogin} className="submit-button sign-in-button">
            Sign in to Equinox
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onClickLogin: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
  onClickLogin: (auth, replace) => dispatch(login(auth, replace))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
