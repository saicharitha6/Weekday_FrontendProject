// jobReducer.js

import { FETCH_JOBS_SUCCESS, UPDATE_FILTERS } from '../actions/jobActions';

const initialState = {
  jobs: [],
  filteredJobs: [],
  filters: {
    companyName: '',
    location: '',
    jobRole: '',
    minJdSalary: '',
    minExp: '',
    remote: ''
  }
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        filteredJobs: action.payload
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default jobReducer;
