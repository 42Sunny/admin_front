import { createAction, handleActions } from 'redux-actions';

// actions
const SET_CLUSTER_TYPE = 'criteria/SET_CLUSTER_TYPE';
const SET_INTRA_ID = 'criteria/SET_INTRA_ID';
const SET_CARD_NUM = 'criteria/SET_CARD_NUM';
const SET_CURRENT_PAGE = 'criteria/SET_CURRENT_PAGE';
const SET_LAST_PAGE = 'criteria/SET_LAST_PAGE';
const SET_LIST_SIZE = 'criteria/SET_LIST_SIZE';
const SET_LOG_TYPE = 'criteria/SET_LOG_TYPE';

// action creators
export const setClusterType = createAction(SET_CLUSTER_TYPE);
export const setIntraID = createAction(SET_INTRA_ID);
export const setCardNum = createAction(SET_CARD_NUM);
export const setCurrentPage = createAction(SET_CURRENT_PAGE);
export const setLastPage = createAction(SET_LAST_PAGE);
export const setListSize = createAction(SET_LIST_SIZE);
export const setLogType = createAction(SET_LOG_TYPE);

// initalState
const initialState = {
  clusterType: '0',
  intraId: '',
  cardNum: '',
  currentPage: 1,
  lastPage: 0,
  listSize: 50,
  logType: 0,
};

// reducer
export default handleActions(
  {
    [SET_CLUSTER_TYPE]: (state, action) => ({
      ...state,
      clusterType: action.payload,
    }),
    [SET_INTRA_ID]: (state, action) => ({
      ...state,
      intraId: action.payload,
    }),
    [SET_CARD_NUM]: (state, action) => ({
      ...state,
      cardNum: action.payload,
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
    [SET_LAST_PAGE]: (state, action) => ({
      ...state,
      lastPage: action.payload,
    }),
    [SET_LIST_SIZE]: (state, action) => ({
      ...state,
      listSize: action.payload,
    }),
    [SET_LOG_TYPE]: (state, action) => ({
      ...state,
      logType: action.payload,
    }),
  },
  initialState,
);
