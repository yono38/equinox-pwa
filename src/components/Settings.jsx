import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import moment from 'moment';
import { setBookingAlert } from '../actions/calendar';
import {
  getBookingAlertSettings,
  getNotificationSettings
} from '../selectors/settings';

import {
  enableBookingReminder,
  disableBookingReminder
} from '../actions/settings';

const Settings = (props) => {
  const {
    onEnableClick,
    onDisableClick,
    notificationPermission,
    bookingAlertPermission,
  } = props;
  let ctaBtn;
  let testNotification = null;
  const disabledBtnStates = ['denied', 'unavailable'];
  const isServiceWorkerReady = ('serviceWorker' in navigator)
    && navigator.serviceWorker.controller !== null;
  if (
    !isServiceWorkerReady
     || disabledBtnStates.includes(props.notificationPermission)
  ) {
    ctaBtn = (
      <button disabled className="cta-button disabled">
        Reminders Not Available
      </button>
    );
  } else if (bookingAlertPermission) {
    ctaBtn = (
      <button onClick={onDisableClick} className="cancel cta-button">
        Disable Reminders
      </button>
    );
    const onTestClick = () => {
      const mockData = {
        name: 'Some Awesome Class',
        status: {
          reservationStartDate: moment().add(5, 'seconds').toISOString()
        }
      };
      setBookingAlert(mockData);
    }
    testNotification = (
      <div className="settings-tile card flex">
        <div className="card-header">
          <h3>Send a test notification</h3>
        </div>
        <div className="card-cta">
          <button onClick={onTestClick} className="cta-button">
            Test Booking Alert
          </button>
        </div>
      </div>
    )
  } else {
    ctaBtn = (
      <button onClick={onEnableClick} className="cta-button">
        Enable Reminders
      </button>
    );
  }
  return (
    <div className="settings">
      <div className="header">
        Settings
        <Link className="menu icon-left-arrow" to="/" />
      </div>
      <div className="settings-tile card flex">
        <div className="card-header">
          <h3>Remind me when class booking opens</h3>
        </div>
        <div className="card-cta">
          {ctaBtn}
        </div>
      </div>
      {testNotification}
    </div>
  )
};

Settings.propTypes = {
  notificationPermission: PropTypes.string,
  bookingAlertPermission: PropTypes.bool,
  onEnableClick: PropTypes.func,
  onDisableClick: PropTypes.func
};

Settings.defaultProps = {
  notificationPermission: 'default',
  bookingAlertPermission: false
};

const mapStateToProps = (state) =>({
  notificationPermission: getNotificationSettings(state),
  bookingAlertPermission: getBookingAlertSettings(state)
});

const mapDispatchToProps = (dispatch) => ({
  onEnableClick: () => dispatch(enableBookingReminder()),
  onDisableClick: () => dispatch(disableBookingReminder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
