import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import {
  CriteriaType,
  setLastPageAction,
  setLogTypeAction,
  setMaxSeocho,
  setMaxGaepo,
  setListSizeAction,
  setCurrentPageAction,
  setCardNumAction,
  setIntraIDAction,
  setClusterNumberAction,
} from 'store/modules/criteria/criteria';

const useCriteria = () => {
  const dispatch = useDispatch();

  return {
    criteria: useSelector<RootState, CriteriaType>(({ criteria }) => criteria),
    setClusterNumber: useCallback(
      (param: string) => {
        dispatch(setClusterNumberAction(param));
      },
      [dispatch],
    ),
    setIntraId: useCallback(
      (param: string) => {
        dispatch(setIntraIDAction(param));
      },
      [dispatch],
    ),
    setCardNum: useCallback(
      (param: string) => {
        dispatch(setCardNumAction(param));
      },
      [dispatch],
    ),
    setCurrentPage: useCallback(
      (param: number) => {
        dispatch(setCurrentPageAction(param));
      },
      [dispatch],
    ),
    setLastPage: useCallback(
      (param: number) => {
        dispatch(setLastPageAction(param));
      },
      [dispatch],
    ),
    setListSize: useCallback(
      (param: number) => {
        dispatch(setListSizeAction(param));
      },
      [dispatch],
    ),
    setLogType: useCallback(
      (param: number) => {
        dispatch(setLogTypeAction(param));
      },
      [dispatch],
    ),
    setMaxGaepo: useCallback(
      (param: number) => {
        dispatch(setMaxGaepo(param));
      },
      [dispatch],
    ),
    setMaxSeocho: useCallback(
      (param: number) => {
        dispatch(setMaxSeocho(param));
      },
      [dispatch],
    ),
  };
};

export default useCriteria;
