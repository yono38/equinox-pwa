import React, { PropTypes } from 'react';
import './Loader.css';

const Loader = ({ isLoading, className }) =>
    isLoading ?
      (<div className={`loader-wrapper ${className}`}>
        <div className="loader" />
      </div>) : null;

Loader.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

Loader.defaultProps = {
  isLoading: false,
  className: ''
};

export default Loader;
