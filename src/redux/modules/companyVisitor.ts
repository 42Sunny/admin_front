import { createAction, handleActions } from 'redux-actions';

// actions
const SET_COMPANY_VISITOR = 'companyVisitor/SET_COMPANY_VISITOR';
const UPDATE_COMPANY_VISITOR = 'companyVisitor/UPDATE_COMPANY_VISITOR';
const EXIT_COMPANY_VISITOR = 'companyVisitor/EXIT_COMPANY_VISITOR';

// action creators
export const setCompanyVisitorAction = createAction(SET_COMPANY_VISITOR);

export type CompanyVisitorResponseType = {
  id: number;
  companyName: string;
  visitorName: string;
  place: string;
  checkinTime: Date;
  checkoutTime: Date | null;
};

// initalState
const initialState: CompanyVisitorResponseType[] = [];

// reducer
export default handleActions(
  {
    [SET_COMPANY_VISITOR]: (state, action) => action.payload,
    [UPDATE_COMPANY_VISITOR]: (state, action) => action.payload,
    [EXIT_COMPANY_VISITOR]: (state, action) => state,
  },
  initialState,
);
