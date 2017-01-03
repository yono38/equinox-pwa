import React, { PropTypes } from 'react';
import moment from 'moment';
import './DayPicker.css';

const DayPicker = props => {
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const selectedDayIdx = moment(props.selectedDay).day();
  const firstDay = moment(props.selectedDay).subtract(selectedDayIdx, 'days');
  const daysList = dayNames.map((day, idx) => {
    const formattedDay = moment(firstDay).add(idx, 'days').format('YYYY-MM-DD');
    return (
      <li
         key={`day-${idx}`}
      >
        <a
         className={idx === selectedDayIdx ? 'active': ''}
         onClick={props.onDaySelect.bind(null, formattedDay)}
         >
          {day}
         </a>
      </li>
    )
  })
  return (
    <ul className="day-picker">{daysList}</ul>
  )
}

DayPicker.propTypes = {
  onDaySelect: PropTypes.func.isRequired,
  selectedDay: PropTypes.string.isRequired
};

export default DayPicker;
