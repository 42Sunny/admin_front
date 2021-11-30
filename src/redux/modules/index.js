import { combineReducers } from 'redux';
import user from './user';
import criteria from './criteria';
import checkInLogs from './checkInLogs';

const rootReducer = combineReducers({
  user,
  criteria,
  checkInLogs,
});

export default rootReducer;
