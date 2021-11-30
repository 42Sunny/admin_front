import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLastPageAction } from 'redux/modules/criteria';
import { setLogTypeAction } from 'redux/modules/criteria';
import { setMaxSeocho } from 'redux/modules/criteria';
import { setMaxGaepo } from 'redux/modules/criteria';
import { setListSizeAction } from 'redux/modules/criteria';
import { setCurrentPageAction } from 'redux/modules/criteria';
import { setCardNumAction } from 'redux/modules/criteria';
import { setIntraIDAction } from 'redux/modules/criteria';
import { setClusterNumberAction } from 'redux/modules/criteria';

const useCriteria = () => {
  const dispatch = useDispatch();

  return {
    criteria: useSelector(({ criteria }) => criteria),
    setClusterNumber: useCallback(
      (param) => {
        dispatch(setClusterNumberAction(param));
      },
      [dispatch],
    ),
    setIntraId: useCallback(
      (param) => {
        dispatch(setIntraIDAction(param));
      },
      [dispatch],
    ),
    setCardNum: useCallback(
      (param) => {
        dispatch(setCardNumAction(param));
      },
      [dispatch],
    ),
    setCurrentPage: useCallback(
      (param) => {
        dispatch(setCurrentPageAction(param));
      },
      [dispatch],
    ),
    setLastPage: useCallback(
      (param) => {
        dispatch(setLastPageAction(param));
      },
      [dispatch],
    ),
    setListSize: useCallback(
      (param) => {
        dispatch(setListSizeAction(param));
      },
      [dispatch],
    ),
    setLogType: useCallback(
      (param) => {
        dispatch(setLogTypeAction(param));
      },
      [dispatch],
    ),
    setMaxGaepo: useCallback(
      (param) => {
        dispatch(setMaxGaepo(param));
      },
      [dispatch],
    ),
    setMaxSeocho: useCallback(
      (param) => {
        dispatch(setMaxSeocho(param));
      },
      [dispatch],
    ),
  };
};

export default useCriteria;
