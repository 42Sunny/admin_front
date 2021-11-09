import { createAction, handleActions } from 'redux-actions';

// actions
const SET_USER = '/user/SET_USER';

// action creators
export const setUser = createAction(SET_USER); // { login }

// initalState
const initialState = {
  id: '',
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) => ({
      id: action.payload,
    }),
  },
  initialState,
);
