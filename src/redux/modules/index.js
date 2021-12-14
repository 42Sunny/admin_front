import { combineReducers } from 'redux';
import login from './login';
import criteria from './criteria';
import checkInLogs from './checkInLogs';
import companyVisitor from './companyVisitor';
import companyInfo from './companyInfo';

const rootReducer = combineReducers({
  login,
  criteria,
  checkInLogs,
  companyVisitor,
  companyInfo,
});

export default rootReducer;
