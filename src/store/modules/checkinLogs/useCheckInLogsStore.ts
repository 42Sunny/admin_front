import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { CheckinLogType, setCheckInLogsAction } from './checkInLogs';

const useCheckInLogs = () => {
  const dispatch = useDispatch();

  return {
    checkInLogs: useSelector<RootState, CheckinLogType[]>(({ checkInLogs }) => checkInLogs),
    setCheckInLogs: useCallback(
      (param) => {
        dispatch(setCheckInLogsAction(param));
      },
      [dispatch],
    ),
  };
};

export default useCheckInLogs;
