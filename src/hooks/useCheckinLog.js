import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as checkinLogRedux from '../redux/modules/checkinLog';

const useCheckinLog = () => {
  const dispatch = useDispatch();
  const checkinLog = useSelector((state) => state.checkinLogReducer);

  return {
    checkinLog,
    setLogs: useCallback(
      (param) => {
        dispatch(checkinLogRedux.setLogs(param));
      },
      [dispatch],
    ),
  };
};

export default useCheckinLog;
