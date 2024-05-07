// jobActions.js

export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs
});

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters
});
