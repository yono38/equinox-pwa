import moment from 'moment';

const parseClassInfo = (classItem) => {
  let parsedClass = {};
  if (classItem) {
    const instructor = classItem.instructors[0].instructor;
    const startTime = moment(classItem.startDate).format('h:mm A');
    const endTime = moment(classItem.endDate).format('h:mm A');
    parsedClass = {
      instructor,
      startTime,
      endTime,
      ...classItem
    };
  }
  return parsedClass;
};

export default parseClassInfo;
