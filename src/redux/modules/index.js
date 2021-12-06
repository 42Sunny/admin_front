import { combineReducers } from 'redux';
import login from './login';
import criteria from './criteria';
import checkInLogs from './checkInLogs';

const rootReducer = combineReducers({
  login,
  criteria,
  checkInLogs,
});

export default rootReducer;
