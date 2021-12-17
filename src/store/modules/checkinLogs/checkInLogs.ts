import { createAction, handleActions } from 'redux-actions';

// TODO: Response 타입 알아오기
// actions
const SET_CHECKIN_LOGS = 'checkInLogs/SET_CHECKIN_LOGS';

// action creators
export const setCheckInLogsAction = createAction(SET_CHECKIN_LOGS);

export type CheckinLogType = {
  card_no: number;
  created_at: string;
  log_id: number;
  login: string;
  state: string;
  _id: number;
};

// initalState
const initialState: CheckinLogType[] = [];

// reducer
export default handleActions(
  {
    [SET_CHECKIN_LOGS]: (state, action) => action.payload,
  },
  initialState,
);
