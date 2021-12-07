import { createAction, handleActions } from 'redux-actions';

// actions
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

// action creators
export const loginAction = createAction(LOGIN);
export const logoutAction = createAction(LOGOUT);

// initalState
const initialState = true;

// reducer
export default handleActions(
  {
    [LOGIN]: (state, action) => true,
    [LOGOUT]: (state, action) => false,
  },
  initialState,
);
