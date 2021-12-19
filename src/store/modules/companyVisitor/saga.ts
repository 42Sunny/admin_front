import { AxiosError, AxiosResponse } from 'axios';
import { getCompanyVisitorAction, GET_POST } from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getCompanyVisitor } from 'API/visitor/company/getCompanyVisitor';
import { GetCompanyVisitorResponseType } from 'API/visitor/company';

function* getPostSaga(action: ReturnType<typeof getCompanyVisitorAction.request>) {
  try {
    const response: AxiosResponse<GetCompanyVisitorResponseType> = yield call(
      getCompanyVisitor,
      action.payload,
    );
    yield put(getCompanyVisitorAction.success(response.data));
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(getCompanyVisitorAction.failure(axiosError));
  }
}

export function* companyVisitorSaga() {
  yield takeLatest(GET_POST, getPostSaga);
}

export default companyVisitorSaga;
