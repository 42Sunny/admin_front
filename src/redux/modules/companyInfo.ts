import { getCompanies } from 'api/companyAPI';
import { createAction, handleActions } from 'redux-actions';

// actions
const SET_COMPANY_INFO = 'companyInfo/SET_COMPANY_INFO';
const UPDATE_COMPANY_INFO = 'companyInfo/UPDATE_COMPANY_INFO';

// action creators
export const setCompanyInfoAction = createAction(SET_COMPANY_INFO, () => {});
// export const updateCompanyInfoAction = () => async (dispatch: Dispatch) => {
//   const companyInfo = await getCompanies();
//   return {
//     type: UPDATE_COMPANY_INFO,
//   }
// };

export const updateCompanyInfoAction = createAction(UPDATE_COMPANY_INFO, async () => {
  const companyInfo = await getCompanies();
  return companyInfo;
});

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
