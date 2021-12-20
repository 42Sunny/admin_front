import { GetCompanyVisitorResponseType } from 'API/visitor/company';
import { createReducer } from 'typesafe-actions';
import { GET_COMPANY_VISITOR_SUCCESS, SET_COMPANY_VISITOR } from './actions';

// initalState
const initialState: GetCompanyVisitorResponseType[] = [];

// reducer
export default createReducer(initialState, {
  [SET_COMPANY_VISITOR]: (state, action) => action.payload,
  [GET_COMPANY_VISITOR_SUCCESS]: (state, action) => action.payload,
});
