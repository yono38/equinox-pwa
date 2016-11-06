import React, { PropTypes } from 'react';
import moment from 'moment';
import './DayPicker.css';

const DayPicker = props => {
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const selectedDayIdx = moment(props.selectedDay).day();
  const daysList = dayNames.map((day, idx) => (
    <li
       key={`day-${idx}`}
    >
      <a
       href="#"
       className={idx === selectedDayIdx ? 'active': ''}
       onClick={props.onDaySelect.bind(null, idx)}
       >
        {day}
       </a>
    </li>
  ));
  return (
    <ul className="day-picker">{daysList}</ul>
  )
}

DayPicker.propTypes = {
  onDaySelect: PropTypes.func.isRequired,
  selectedDay: PropTypes.string.isRequired
};

export default DayPicker;
