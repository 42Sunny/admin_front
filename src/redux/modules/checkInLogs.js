import { createAction, handleActions } from 'redux-actions';

// actions
const SET_CHECKIN_LOGS = 'checkInLogs/SET_CHECKIN_LOGS';

// action creators
export const setCheckInLogsAction = createAction(SET_CHECKIN_LOGS);

// initalState
const initialState = [];

// reducer
export default handleActions(
  {
    [SET_CHECKIN_LOGS]: (state, action) => action.payload,
  },
  initialState,
);
