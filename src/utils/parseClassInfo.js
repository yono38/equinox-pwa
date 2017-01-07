import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

const parseClassInfo = (classItem = {}) => {
  let parsedClass = {};
  if (classItem && !isEmpty(classItem)) {
    const instructor = classItem.instructors[0].instructor;
    const startTime = moment(classItem.startDate).format('h:mm A');
    const displayWeekday = moment(classItem.startDate).format('dddd');
    const endTime = moment(classItem.endDate).format('h:mm A');
    parsedClass = {
      instructor,
      startTime,
      endTime,
      displayWeekday,
      ...classItem
    };
  }
  return parsedClass;
};

export default parseClassInfo;
