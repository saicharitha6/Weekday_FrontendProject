// index.js

import { combineReducers } from 'redux';
import jobReducer from '../redux/jobReducer';

const rootReducer = combineReducers({
  jobs: jobReducer
});

export default rootReducer;
