import React, { PropTypes, Component } from 'react';

import ClassTile from './ClassTile';
import DayPicker from './DayPicker';
import Loader from './Loader';
import { Link } from 'react-router';
import moment from 'moment';

class ClassList extends Component {
  componentDidMount() {
    if (this.props.initClassList && this.props.selectedDay) {
      this.props.initClassList(this.props.selectedDay);
    }
  }

  render() {
    const classes = this.props.classes
      .map((classItem, idx) => <ClassTile key={`class-${idx}`} {...classItem} />);
    const loader = <Loader isLoading={this.props.isLoading} />;
    return (
      <div>
        <div className="header">
          {this.props.headerTitle}
          <Link className="menu icon-left-arrow" to="/" />
        </div>
        <DayPicker
          selectedDay={this.props.selectedDay}
          onDaySelect={this.props.initClassList}
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
  headerTitle: PropTypes.string,
  classes: PropTypes.array,
  selectedDay: PropTypes.string,
  onDaySelect: PropTypes.func
};

ClassList.defaultProps = {
  selectedDay: moment().format('YYYY-MM-DD'),
  headerTitle: 'Class List',
  onDaySelect: () => {}
};

export default ClassList;
