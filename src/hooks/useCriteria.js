import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClusterType as sCT,
  setCardNum as sCI,
  setCurrentPage as sCP,
  setLastPage as sLP,
  setListSize as sLS,
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
  return { criteria, setClusterType, setCardNum, setCurrentPage, setLastPage, setListSize };
};

export default useCriteria;
