import moment from 'moment';

const parseClassInfo = (classItem) => {
  let parsedClass = {};
  if (classItem) {
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
