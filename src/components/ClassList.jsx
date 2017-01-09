import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loading';
import Swipeable from 'react-swipeable';
import moment from 'moment';
import sortBy from 'lodash/sortBy';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import './ClassList.css';
import ClassTile from './ClassTile';
import DayPicker from './DayPicker';
import { loadClasses } from '../actions/classes';
import {
  getSelectedDay,
  getIsLoading,
  getIsFailed,
  getMappedClasses
} from '../selectors/classes';

class ClassList extends Component {
  componentDidMount() {
    if (this.props.initClassList && this.props.selectedDay) {
      const selectedDay = this.props.location.query.day ?
        this.props.location.query.day : this.props.selectedDay;
      this.props.initClassList(selectedDay);
    }
  }

  selectDayOnSwipe(direction) {
    const momentOperation = direction ===  'prev' ? 'subtract' : 'add';
    const newSelectedDay = moment(this.props.selectedDay)[momentOperation](1, 'day')
      .format('YYYY-MM-DD');
    this.props.initClassList(newSelectedDay);
  }

  render() {
    const { isLoading, selectedDay, onHeaderNext, onHeaderPrevious } = this.props;
    const classes = sortBy(this.props.classes, classItem => classItem.startDate)
      .map((classItem, idx) => <ClassTile key={`class-${idx}`} {...classItem} />);
    const onSwipedRight = () => this.selectDayOnSwipe('prev');
    const onSwipedLeft = () => this.selectDayOnSwipe('next');
    const classList = (
      <Swipeable
        onSwipedRight={onSwipedRight}
        onSwipedLeft={onSwipedLeft}
        className="class-tile-list"
      >
        {classes}
      </Swipeable>
    )
    return (
      <div className="class-list">
        <div className="header">
          <div className="header-description">
            <a
              onClick={onHeaderPrevious(selectedDay)}
              className="icon-horizontal-arrow previous week-picker"
            />
            { this.props.headerTitle }
            <a
              onClick={onHeaderNext(selectedDay)}
              className="icon-horizontal-arrow week-picker"
            />
            <Link to="/"  className="menu icon-left-arrow" />
          </div>
          <h5 className="no-margin">{this.props.selectedDay}</h5>
          <DayPicker
            selectedDay={this.props.selectedDay}
            onDaySelect={this.props.initClassList}
          />
        </div>
        { isLoading &&
          <Swipeable
            onSwipedRight={onSwipedRight}
            onSwipedLeft={onSwipedLeft}
            className="loading">
            <Loader type="bubbles" />
          </Swipeable>
        }
        { !isLoading && classList }
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
  onDaySelect: () => {},
  isLoading: true
};

const mapStateToProps = (state, ownProps) => {
  return {
    headerTitle: ownProps.bookableOnly ? 'Book a Class' : 'Class List',
    classes: getMappedClasses(state, ownProps),
    selectedDay: getSelectedDay(state),
    isLoading: getIsLoading(state),
    // TODO use this
    isFailed: getIsFailed(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initClassList: (startDate) => {
      dispatch(loadClasses(startDate));
      dispatch(push(`/classes?day=${startDate}`));
    },
    onHeaderPrevious: (startingDay) => () => {
      const newDate = moment(startingDay)
        .subtract(7, 'days').format('YYYY-MM-DD');
      dispatch(loadClasses(newDate));
      dispatch(push(`/classes?day=${newDate}`));
    },
    onHeaderNext: (startingDay) => () => {
      const newDate = moment(startingDay)
        .add(7, 'days').format('YYYY-MM-DD');
      dispatch(loadClasses(newDate));
      dispatch(push(`/classes?day=${newDate}`));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ClassList);
