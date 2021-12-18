import {
  getCompanyVisitor,
  GetCompanyVisitorArgTypes,
  GetCompanyVisitorResponseType,
} from 'API/Visitor/getCompanyVisitor';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';

// actions
const SET_COMPANY_VISITOR = 'companyVisitor/SET_COMPANY_VISITOR';
const GET_POST = 'companyVisitor/GET_POST';
const GET_POST_SUCCESS = 'companyVisitor/GET_POST_SUCCESS';
const GET_POST_ERROR = 'companyVisitor/GET_POST_ERROR';

// action creators
export const setCompanyVisitorAction = createAction(SET_COMPANY_VISITOR);
export const getCompanyVisitorAction = createAction(
  GET_POST,
  (startDate: string, endDate: string, page?: number, size?: number) => ({
    start: new Date(startDate),
    end: new Date(endDate),
    pagination: {
      page: page ?? 0,
      size: size ?? 1000,
    },
  }),
);
// function* getPostSaga(action: GetCompanyVisitorArgTypes) {
//   try {
//     const response = yield call(getCompanyVisitor(action));
//   } catch {}
// }

// initalState
const initialState: GetCompanyVisitorResponseType[] = [];

// reducer
export default handleActions(
  {
    [SET_COMPANY_VISITOR]: (state, action) => action.payload,
  },
  initialState,
);
