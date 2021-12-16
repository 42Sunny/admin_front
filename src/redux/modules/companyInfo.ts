import { createAction, handleActions } from 'redux-actions';

// actions
const SET_COMPANY_INFO = 'companyInfo/SET_COMPANY_INFO';

// action creators
export const setCompanyInfoAction = createAction(SET_COMPANY_INFO);

export type CompanyInfoType = {
  id: number;
  name: string;
  phone: string;
};

// initalState
const initialState: CompanyInfoType[] = [
  {
    id: 0,
    name: '42 Seoul',
    phone: '0000000000',
  },
  {
    id: 1,
    name: '42 Seoul',
    phone: '00000001111',
  },
  {
    id: 2,
    name: '42 Seoul',
    phone: '00000002222',
  },
];

// reducer
export default handleActions(
  {
    [SET_COMPANY_INFO]: (state, action) => action.payload,
  },
  initialState,
);
