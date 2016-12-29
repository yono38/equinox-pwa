import { createSelector } from 'reselect';

const getWorkoutModuleState = (state) => state.modules.workouts;

export const getIsLoading = createSelector(
  [getWorkoutModuleState],
  (module) => module.get('isLoading')
);

export const getIsFailed = createSelector(
  [getWorkoutModuleState],
  (module) => module.get('isError')
);

export const getWorkouts = createSelector(
  [getWorkoutModuleState],
  (module) => module.get('workouts').toJS() || []
);
