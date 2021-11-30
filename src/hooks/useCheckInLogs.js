import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckInLogsAction } from '../redux/modules/checkInLogs';

const useCheckInLogs = () => {
  const dispatch = useDispatch();
  const checkInLogs = useSelector(({ checkInLogs }) => checkInLogs);

  return {
    checkInLogs,
    setCheckInLogs: useCallback(
      (param) => {
        dispatch(setCheckInLogsAction(param));
      },
      [dispatch],
    ),
  };
};

export default useCheckInLogs;
