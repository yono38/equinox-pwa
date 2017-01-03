import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loading';
import Swipeable from 'react-swipeable';
import moment from 'moment';
import sortBy from 'lodash/sortBy';
import { push } from 'react-router-redux';

import ClassTile from './ClassTile';
import DayPicker from './DayPicker';
import Header from './Header';
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
    const selectedDayIdx = moment(this.props.selectedDay).day();
    // TODO handle moving to previous/next week
    if ((direction === 'prev' && selectedDayIdx === 0)
      || (direction === 'next' && selectedDayIdx === 6)) {
      // If already on edge of week, do nothing
      return;
    }
    const momentOperation = direction ===  'prev' ? 'subtract' : 'add';
    const newSelectedDay = moment(this.props.selectedDay)[momentOperation](1, 'day')
      .format('YYYY-MM-DD');
    this.props.initClassList(newSelectedDay);
  }

  render() {
    const { isLoading } = this.props;
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
      <div>
        <Header title={this.props.headerTitle} />
        <DayPicker
          selectedDay={this.props.selectedDay}
          onDaySelect={this.props.initClassList}
        />
        { isLoading &&
          <div className="loading">
            <Loader type="bubbles" />
          </div>
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
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ClassList);
