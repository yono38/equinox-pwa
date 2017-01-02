import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const onClick = () => { this.toggle() };
    return !this.state.expanded ?
      (<div className="icon-menu menu" onClick={onClick} />)
      : (
        <div className="menu">
          <div className="icon-dropdown" onClick={onClick} />
          <ul className="dropdown">
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <a onClick={this.props.logoutOnClick}>Logout</a>
            </li>
          </ul>
        </div>
      )
  }
};

HomeMenu.propTypes = {
  logoutOnClick: PropTypes.func.isRequired
};
