import { combineReducers } from 'redux';
import login from './login/login';
import criteria from './criteria/criteria';
import checkInLogs from './checkinLogs/checkInLogs';
import companyVisitor from './companyVisitor/companyVisitor';
import companyInfo from './companyInfo/companyInfo';
import { all } from 'redux-saga/effects';
import companyVisitorSaga from './companyVisitor/saga';

export function* rootSaga() {
  yield all([companyVisitorSaga()]);
}

const rootReducer = combineReducers({
  login,
  criteria,
  checkInLogs,
  companyVisitor,
  companyInfo,
});

export default rootReducer;
