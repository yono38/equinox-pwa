import React, { PropTypes, Component } from 'react';

import ClassTile from './ClassTile';
import DayPicker from './DayPicker';
import Loader from './Loader';
import { Link } from 'react-router';
import moment from 'moment';

class ClassList extends Component {
  componentDidMount() {
    if (this.props.onDidMount && this.props.classes.length === 0) {
      this.props.onDidMount();
    }
  }

  render() {
    const classes = this.props.classes
      .map((classItem, idx) => <ClassTile key={`class-${idx}`} {...classItem} />);
    const loader = <Loader isLoading={this.props.isLoading} />;
    return (
      <div>
        <div className="header">
          Book a class
          <Link className="menu icon-left-arrow" to="/" />
        </div>
        <DayPicker
          selectedDay={this.props.activeDayIdx}
          onDaySelect={this.props.onDaySelect}
        />
        { loader }
        { classes }
      </div>
    );
  }
}

ClassList.propTypes = {
  onDidMount: PropTypes.function,
  isLoading: PropTypes.bool,
  classes: PropTypes.array,
  activeDayIdx: PropTypes.string,
  onDaySelect: PropTypes.func
};

ClassList.defaultProps = {
  activeDayIdx: moment().format('YYYY-MM-DD'),
  onDaySelect: () => {}
};

export default ClassList;
