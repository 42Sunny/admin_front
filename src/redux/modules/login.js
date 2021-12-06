import { createAction, handleActions } from 'redux-actions';

// actions
const SET_LOGIN = 'user/SET_LOGIN';

// action creators
export const setLoginAction = createAction(SET_LOGIN);

// initalState
const initialState = true;

// reducer
export default handleActions(
  {
    [SET_LOGIN]: (state, action) => action.payload,
  },
  initialState,
);
