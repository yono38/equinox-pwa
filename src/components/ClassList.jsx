import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import sortBy from 'lodash/sortBy';

import ClassTile from './ClassTile';
import DayPicker from './DayPicker';
import Loader from 'react-loading';

class ClassList extends Component {
  componentDidMount() {
    if (this.props.initClassList && this.props.selectedDay) {
      this.props.initClassList(this.props.selectedDay);
    }
  }

  render() {
    // const { isLoading } = this.props;
    const isLoading = true;
    const classes = sortBy(this.props.classes, classItem => classItem.startDate)
      .map((classItem, idx) => <ClassTile key={`class-${idx}`} {...classItem} />);
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
        { isLoading &&
          <div className="loading">
            <Loader type="bubbles" />
          </div>
        }
        { !isLoading && classes }
      </div>
    );
  }
}

ClassList.propTypes = {
  classes: PropTypes.array,
  headerTitle: PropTypes.string,
  initClassList: PropTypes.func,
  isLoading: PropTypes.bool,
  onDaySelect: PropTypes.func,
  selectedDay: PropTypes.string,
};

ClassList.defaultProps = {
  headerTitle: 'Class List',
  selectedDay: moment().format('YYYY-MM-DD'),
  onDaySelect: () => {}
};

export default ClassList;
