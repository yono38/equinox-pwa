import { createSelector } from 'reselect';

const getBikeModuleState = (state) => state.modules.bikes;

export const getIsLoading = createSelector(
  [getBikeModuleState],
  (module, selectedDay) => module.get('isLoading')
);

export const getIsFailed = createSelector(
  [getBikeModuleState],
  (module, selectedDay) => module.get('isError')
);

export const getBikes = createSelector(
  [getBikeModuleState],
  (module, selectedDay) => module.get('bikes')
);
