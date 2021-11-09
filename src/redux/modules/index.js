import { combineReducers } from 'redux';
import userReducer from './user';
import criteriaReducer from './criteria';

const rootReducer = combineReducers({
  userReducer,
  criteriaReducer,
});

export default rootReducer;
