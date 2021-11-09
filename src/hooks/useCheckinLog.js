import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogs as sL } from '../redux/modules/checkinLog';

const useCheckinLog = () => {
  const dispatch = useDispatch();
  const checkinLog = useSelector((state) => state.checkinLogReducer);

  const setLogs = useCallback(
    (param) => {
      dispatch(sL(param));
    },
    [dispatch],
  );

  return { checkinLog, setLogs };
};

export default useCheckinLog;
