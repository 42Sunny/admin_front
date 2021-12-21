import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GetCompanyInfoResponseType } from 'API/visitor/company';
import {
  createCompanyInfoAction,
  CREATE_COMPANY_INFO,
  CREATE_COMPANY_INFO_SUCCESS,
  deleteCompanyInfoAction,
  DELETE_COMPANY_INFO,
  DELETE_COMPANY_INFO_SUCCESS,
  getCompanyInfoAction,
  GET_COMPANY_INFO,
} from './actions';
import { getCompanyInfo } from 'API/visitor/company';
import { createCompanyInfo } from 'API/visitor/company/createCompanyInfo';
import { deleteCompanyInfo } from 'API/visitor/company/deleteCompanyInfo';

function* getSaga(action: ReturnType<typeof getCompanyInfoAction.request>) {
  try {
    const response: AxiosResponse<GetCompanyInfoResponseType[]> = yield call(getCompanyInfo);
    yield put(getCompanyInfoAction.success(response.data));
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(getCompanyInfoAction.failure(axiosError));
  }
}

function* createSaga(action: ReturnType<typeof createCompanyInfoAction.request>) {
  try {
    yield call(createCompanyInfo, action.payload);
    yield put(createCompanyInfoAction.success());
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(createCompanyInfoAction.failure(axiosError));
  }
}

function* deleteSaga(action: ReturnType<typeof deleteCompanyInfoAction.request>) {
  try {
    yield call(deleteCompanyInfo, action.payload);
    yield put(deleteCompanyInfoAction.success());
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(deleteCompanyInfoAction.failure(axiosError));
  }
}

export function* companyInfoSaga() {
  yield takeLatest(GET_COMPANY_INFO, getSaga);
  yield takeLatest(CREATE_COMPANY_INFO, createSaga);
  yield takeLatest(DELETE_COMPANY_INFO, deleteSaga);
  yield takeLatest(CREATE_COMPANY_INFO_SUCCESS, getSaga);
  yield takeLatest(DELETE_COMPANY_INFO_SUCCESS, getSaga);
}

export default companyInfoSaga;
