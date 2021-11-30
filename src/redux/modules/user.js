import { createAction, handleActions } from 'redux-actions';

// actions
const SET_USER = 'user/SET_USER';

// action creators
export const setUserAction = createAction(SET_USER);

// initalState
const initialState = '';

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) => action.payload,
  },
  initialState,
);
