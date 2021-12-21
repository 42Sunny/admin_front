import { AxiosError, AxiosResponse } from 'axios';
import {
  enterCompanyVisitorAction,
  ENTER_COMPANY_VISITOR,
  ENTER_COMPANY_VISITOR_SUCCESS,
  exitCompanyVisitorAction,
  EXIT_COMPANY_VISITOR,
  EXIT_COMPANY_VISITOR_SUCCESS,
  getCompanyVisitorAction,
  GET_COMPANY_VISITOR,
} from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { enterCompanyVisitor, getCompanyVisitor } from 'API/visitor/company';
import { exitCompanyVisitor, GetCompanyVisitorResponseType } from 'API/visitor/company';

function* getSaga(action: ReturnType<typeof getCompanyVisitorAction.request>) {
  try {
    const response: AxiosResponse<GetCompanyVisitorResponseType[]> = yield call(
      getCompanyVisitor,
      action.payload,
    );
    yield put(getCompanyVisitorAction.success(response.data));
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(getCompanyVisitorAction.failure(axiosError));
  }
}

function* exitSaga(action: ReturnType<typeof exitCompanyVisitorAction.request>) {
  try {
    yield call(exitCompanyVisitor, action.payload);
    yield put(exitCompanyVisitorAction.success());
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(exitCompanyVisitorAction.failure(axiosError));
  }
}

function* enterSaga(action: ReturnType<typeof enterCompanyVisitorAction.request>) {
  try {
    yield call(enterCompanyVisitor, action.payload);
    yield put(enterCompanyVisitorAction.success());
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(enterCompanyVisitorAction.failure(axiosError));
  }
}

export function* companyVisitorSaga() {
  yield takeLatest(GET_COMPANY_VISITOR, getSaga);
  yield takeLatest(EXIT_COMPANY_VISITOR, exitSaga);
  yield takeLatest(ENTER_COMPANY_VISITOR, enterSaga);
  yield takeLatest(EXIT_COMPANY_VISITOR_SUCCESS, getSaga);
  yield takeLatest(ENTER_COMPANY_VISITOR_SUCCESS, getSaga);
}

export default companyVisitorSaga;
