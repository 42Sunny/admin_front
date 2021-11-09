import { combineReducers } from 'redux';
import userReducer from './user';
import criteriaReducer from './criteria';
import checkinLogReducer from './checkinLog';

const rootReducer = combineReducers({
  userReducer,
  criteriaReducer,
  checkinLogReducer,
});

export default rootReducer;
