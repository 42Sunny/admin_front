import { createAction, handleActions } from 'redux-actions';

// actions
const LOGIN = 'login/LOGIN';
const LOGOUT = 'login/LOGOUT';

// action creators
export const loginAction = createAction(LOGIN);
export const logoutAction = createAction(LOGOUT);

// initalState
const initialState = true;

export type LoginType = boolean;

// reducer
export default handleActions(
  {
    [LOGIN]: () => true,
    [LOGOUT]: () => false,
  },
  initialState,
);
