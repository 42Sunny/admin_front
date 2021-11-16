import { createAction, handleActions } from 'redux-actions';

// actions
const SET_LOGS = 'checkinLog/SET_LOGS';

// action creators
export const setLogs = createAction(SET_LOGS);

// initalState
const initialState = {
  logs: [],
};

// reducer
export default handleActions(
  {
    [SET_LOGS]: (state, action) => ({
      logs: action.payload,
    }),
  },
  initialState,
);
