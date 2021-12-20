import { GetCompanyInfoResponseType } from 'API/visitor/company';
import { createReducer } from 'typesafe-actions';
import { GET_COMPANY_INFO_SUCCESS, SET_COMPANY_INFO } from './actions';

// initalState
const initialState: GetCompanyInfoResponseType[] = [];

// reducer
export default createReducer(initialState, {
  [SET_COMPANY_INFO]: (state, action) => action.payload,
  [GET_COMPANY_INFO_SUCCESS]: (state, action) => action.payload,
});
