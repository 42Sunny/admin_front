import { createAction, handleActions } from 'redux-actions';

// actions
const SET_CLUSTER_TYPE = '/user/SET_CLUSTER_TYPE';
const SET_CARD_NUM = 'user/SET_CARD_NUM';
const SET_CURRENT_PAGE = '/user/SET_CURRENT_PAGE';
const SET_LAST_PAGE = '/user/SET_LAST_PAGE';
const SET_LIST_SIZE = 'user/SET_LIST_SIZE';

// action creators
export const setClusterType = createAction(SET_CLUSTER_TYPE);
export const setCardNum = createAction(SET_CARD_NUM);
export const setCurrentPage = createAction(SET_CURRENT_PAGE);
export const setLastPage = createAction(SET_LAST_PAGE);
export const setListSize = createAction(SET_LIST_SIZE);

// initalState
const initialState = {
  clusterType: 0,
  cardNum: '',
  currentPage: 0,
  lastPage: 0,
  listSize: 50,
};

// reducer
export default handleActions(
  {
    [SET_CLUSTER_TYPE]: (state, action) => ({
      ...state,
      clusterType: action.payload,
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
  },
  initialState,
);
