import { createAction, handleActions } from 'redux-actions';

// actions
const SET_CLUSTER_NUMBER = 'criteria/SET_CLUSTER_NUMBER';
const SET_INTRA_ID = 'criteria/SET_INTRA_ID';
const SET_CARD_NUM = 'criteria/SET_CARD_NUM';
const SET_CURRENT_PAGE = 'criteria/SET_CURRENT_PAGE';
const SET_LAST_PAGE = 'criteria/SET_LAST_PAGE';
const SET_LIST_SIZE = 'criteria/SET_LIST_SIZE';
const SET_LOG_TYPE = 'criteria/SET_LOG_TYPE';
const SET_MAX_SEOCHO = 'criteria/SET_MAX_SEOCHO';
const SET_MAX_GAEPO = 'criteria/SET_MAX_GAEPO';

// action creators
export const setClusterNumberAction = createAction(SET_CLUSTER_NUMBER);
export const setIntraIDAction = createAction(SET_INTRA_ID);
export const setCardNumAction = createAction(SET_CARD_NUM);
export const setCurrentPageAction = createAction(SET_CURRENT_PAGE);
export const setLastPageAction = createAction(SET_LAST_PAGE);
export const setListSizeAction = createAction(SET_LIST_SIZE);
export const setLogTypeAction = createAction(SET_LOG_TYPE);
export const setMaxSeocho = createAction(SET_MAX_SEOCHO);
export const setMaxGaepo = createAction(SET_MAX_GAEPO);

// initalState
const initialState = {
  clusterNumber: '0',
  intraId: '',
  cardNum: '',
  currentPage: 1,
  lastPage: 0,
  listSize: 10,
  logType: 0,
  maxSeocho: 0,
  maxGaepo: 0,
};

// reducer
export default handleActions(
  {
    [SET_CLUSTER_NUMBER]: (state, action) => ({
      ...state,
      clusterNumber: action.payload,
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
    [SET_MAX_GAEPO]: (state, action) => ({
      ...state,
      maxGaepo: action.payload,
    }),
    [SET_MAX_SEOCHO]: (state, action) => ({
      ...state,
      maxSeocho: action.payload,
    }),
  },
  initialState,
);
