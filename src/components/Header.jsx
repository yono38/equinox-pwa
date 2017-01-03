import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import logo from '../equinox-logo.png';

const Header = (props) => {
  const { goBack, router, title } = props;
  const headerTitle = title ? title
    : <img src={logo} className="equinox-logo" alt="logo" />;
  const backIcon = goBack ?
      (<a onClick={router.goBack} className="menu icon-left-arrow" />)
      : (<Link to="/"  className="menu icon-left-arrow" />);
  return (
    <div className="header">
      { headerTitle }
      { backIcon }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  goBack: PropTypes.bool
};

export default withRouter(Header);
