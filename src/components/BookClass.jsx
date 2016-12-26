import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import logo from '../equinox-logo.png';
import './BookClass.css';

import { getClass } from '../selectors/classes';
import { getIsLoading, getIsFailed, getBikes } from '../selectors/bikes';
import { loadBikes } from '../actions/bikes';
import { bookBike, cancelBike } from '../actions/classes';

import Loader from 'react-loading';

class BookClass extends Component {
  componentDidMount() {
    const { classItem, isLoading, isFailed, bikes, router } = this.props;
    const classId = router.params.classId;
    const hasReservation = classItem && classItem.status ? classItem.status.hasReservation : false;
    console.log(hasReservation, classId, isLoading, isFailed, bikes)

    if (!hasReservation && classId && !isLoading && !isFailed && isEmpty(bikes)) {
      this.props.initBikeList(classId);
    }
  }

  render() {
    const {
      isLoading,
      isFailed,
      bikes,
      classItem,
      cancelBike,
      bookBike,
      router
    } = this.props;

    const hasReservation = classItem ? classItem.status.hasReservation : false;
    const classId = router.params.classId;

    const classInfoSection = !isEmpty(classItem) ?
      (<div className="class-info">
        <h2>{classItem.name} | {classItem.instructor}</h2>
        <h4>{classItem.displayTime}</h4>
      </div>) :
      (<div className="class-info">
       <h2>Book Your Bike</h2>
      </div>);

    const cancelBikeOnClick = () => cancelBike(classId);

    return (
      <div className="book-class-page">
        <div className="header">
          <a onClick={this.props.router.goBack} className="menu icon-left-arrow" />
          <img src={logo} className="equinox-logo" alt="logo" />
        </div>
        { classInfoSection }
        { isLoading &&
          <div className="loading">
            <Loader type="bubbles" />
          </div>
        }
        {
          hasReservation &&
          <div className="booked-bike">
            <p>You have booked bike: <strong>#{classItem.status.localId}</strong></p>
            <button onClick={cancelBikeOnClick} className="cancel-bike">Cancel this bike</button>
          </div>
        }
        {
          !hasReservation && !isEmpty(bikes) &&
          <div className="bikes">
            {bikes.map(bike => {
              const bikeOnClick = () => bookBike(classId, bike.id, bike.name);
              return (
                <div onClick={bikeOnClick} className="bike-item card">
                  Bike {bike.name}
                </div>
              );
            })}
          </div>
        }
        {
          !isLoading && !hasReservation && isEmpty(bikes) &&
          <div className="error-message">
            <h2>Sorry!</h2>
            <p>No bikes are available at this time, try another class.</p>
          </div>
        }
      </div>
    );
  }
};

BookClass.propTypes = {
  isLoading: PropTypes.bool,
  isFailed: PropTypes.bool,
  bikes: PropTypes.array,
  class: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const classId = ownProps.params.classId;
  return {
    isLoading: getIsLoading(state),
    isFailed: getIsFailed(state),
    bikes: getBikes(state),
    classItem: getClass(state, {classId})
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initBikeList: (classId) => dispatch(loadBikes(classId)),
    bookBike: (classId, bikeId, bikeName) => dispatch(bookBike(classId, bikeId, bikeName)),
    cancelBike: (classId) => dispatch(cancelBike(classId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);
