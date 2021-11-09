import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClusterType as sCT,
  setIntraID as sII,
  setCardNum as sCI,
  setCurrentPage as sCP,
  setLastPage as sLP,
  setListSize as sLS,
  setLogType as sLT,
} from '../redux/modules/criteria';

const useCriteria = () => {
  const dispatch = useDispatch();
  const criteria = useSelector((state) => state.criteriaReducer);

  const setClusterType = useCallback(
    (param) => {
      dispatch(sCT(param));
    },
    [dispatch],
  );

  const setIntraId = useCallback(
    (param) => {
      dispatch(sII(param));
    },
    [dispatch],
  );

  const setCardNum = useCallback(
    (param) => {
      dispatch(sCI(param));
    },
    [dispatch],
  );

  const setCurrentPage = useCallback(
    (param) => {
      dispatch(sCP(param));
    },
    [dispatch],
  );

  const setLastPage = useCallback(
    (param) => {
      dispatch(sLP(param));
    },
    [dispatch],
  );

  const setListSize = useCallback(
    (param) => {
      dispatch(sLS(param));
    },
    [dispatch],
  );

  const setLogType = useCallback(
    (param) => {
      dispatch(sLT(param));
    },
    [dispatch],
  );
  return {
    criteria,
    setClusterType,
    setIntraId,
    setCardNum,
    setCurrentPage,
    setLastPage,
    setListSize,
    setLogType,
  };
};

export default useCriteria;
