import React, { PropTypes, Component } from 'react';
import ClassTile from './ClassTile';
import { Link } from 'react-router';

class ClassList extends Component {
  componentDidMount() {
    if (this.props.onDidMount && this.props.classes.length === 0) {
      this.props.onDidMount();
    }
  }

  render() {
    console.log(this.props)
    const classes = this.props.classes
      .map(classItem => <ClassTile {...classItem} />);
    const loader = this.props.isLoading ?
      (<div className="loader-wrapper">
        <div className="loader" />
      </div>) : null;
    return (
      <div>
        <div className="header">
          Book a class
          <Link className="menu icon-left-arrow" to="/" />
        </div>
        { loader }
        { classes }
      </div>
    );
  }
}

ClassList.propTypes = {
  onDidMount: PropTypes.function,
  isLoading: PropTypes.bool,
  classes: PropTypes.array
};

export default ClassList;
