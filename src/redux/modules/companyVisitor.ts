import { createAction, handleActions } from 'redux-actions';

// actions
const SET_COMPANY_VISITOR = 'companyVisitor/SET_COMPANY_VISITOR';
const UPDATE_COMPANY_VISITOR = 'companyVisitor/UPDATE_COMPANY_VISITOR';

// action creators
export const setCompanyVisitorAction = createAction(SET_COMPANY_VISITOR, () => [
  {
    companyName: '42 Seoul',
    visitorName: '이재하',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    id: 1,
  },
  {
    companyName: '42 Seoul',
    visitorName: 'jayi',
    checkinTime: new Date(),
    checkoutTime: null,
    id: 2,
  },
  {
    companyName: '42 Seoul',
    visitorName: 'hello',
    checkinTime: new Date(),
    checkoutTime: null,
    id: 3,
  },
]);
export const updateCompanyVisitorAction = createAction(UPDATE_COMPANY_VISITOR);

export type CompanyVisitorType = {
  id: number;
  companyName: string;
  visitorName: string;
  checkinTime: Date;
  checkoutTime: Date | null;
};

// initalState
const initialState: CompanyVisitorType[] = [];

// reducer
export default handleActions(
  {
    [SET_COMPANY_VISITOR]: (state, action) => action.payload,
  },
  initialState,
);
