import { createSelector } from 'reselect';

const getClassModuleState = (state) => state.modules.classes;

const getBookableOnly = (state, ownProps) => ownProps.bookableOnly ||
    (state.routing && state.routing.locationBeforeTransitions.query.bookable === 'true');

export const getSelectedDay = createSelector(
  [getClassModuleState], module => module.get('selectedDay')
);

export const getIsLoading = createSelector(
  [getClassModuleState, getSelectedDay],
  (module, selectedDay) => module.getIn(['inProgress', selectedDay])
);

export const getIsFailed = createSelector(
  [getClassModuleState, getSelectedDay],
  (module, selectedDay) => module.getIn(['isError', selectedDay])
);

export const getClassIds = createSelector(
  [getClassModuleState, getSelectedDay],
  (module, selectedDay) => module.getIn(['classesByDay', selectedDay])
);

const getClassItems = createSelector(
  [getClassModuleState],
  (module) => module.get('list').toJS()
);

const getClasses = createSelector(
  [getIsLoading, getIsFailed, getClassIds, getClassItems, getBookableOnly],
  (inProgress, isFailed, classIds, classItems, bookableOnly) => {
    if (inProgress || isFailed || !classIds) {
      return [];
    } else {
      // Convert ID list to Class Items
      const classItemList = classIds.map(id => classItems[id]);
      // Filter Shown classes
      const shownClasses = bookableOnly ?
        classItemList.filter(classItem => classItem.isBookingRequired)
        : classItemList;
      return shownClasses;
    }
  }
);

// Pluck useful fields for UI
// TODO determine if class ready for booking
export const getMappedClasses = createSelector(
  [getClasses], (classItems) => classItems.map(
    classItem => ({
        classId: classItem.id,
        instructor: classItem.instructor,
        displayTime: classItem.displayTime,
        hasReservation: classItem.status.hasReservation,
        isBookable: classItem.isBookingRequired,
        isBookingOpen: classItem.status.isWithinReservationPeriod,
        isOnCalendar: classItem.isOnCalendar,
        isClassFull: classItem.status.isClassFull,
        isCycling: classItem.category === 'Cycling',
        name: classItem.name,
        reservationStartDate: classItem.status.reservationStartDate,
        reservableItemsLeft: classItem.status.reservableItemsLeft,
        startDate: classItem.startDate,
        timeLeftText: classItem.status.timeLeftText,
    })
  )
)

export const getClass = (state, ownProps) => {
  const classItem = state.modules.classes.getIn(['list', ownProps.classId]);
  return classItem ? classItem.toJS() : {};
};
