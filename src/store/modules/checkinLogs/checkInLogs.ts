import { GetCheckInResponseType } from 'API/checkin/log';
import { createAction, handleActions } from 'redux-actions';

// TODO: Response 타입 알아오기
// actions
const SET_CHECKIN_LOGS = 'checkInLogs/SET_CHECKIN_LOGS';

// action creators
export const setCheckInLogsAction = createAction(SET_CHECKIN_LOGS);

// initalState
const initialState: GetCheckInResponseType[] = [];

// reducer
export default handleActions(
  {
    [SET_CHECKIN_LOGS]: (state, action) => action.payload,
  },
  initialState,
);
