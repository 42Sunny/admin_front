import { createAction, handleActions } from 'redux-actions';

// actions
const SET_COMPANY_INFO = 'companyInfo/SET_COMPANY_INFO';

// action creators
export const setCompanyInfoAction = createAction(SET_COMPANY_INFO, () => {});

export type CompanyInfoType = {
  id: number;
  name: string;
  phone: string;
};

// initalState
const initialState: CompanyInfoType[] = [];

// reducer
export default handleActions(
  {
    [SET_COMPANY_INFO]: (state, action) => action.payload,
  },
  initialState,
);
