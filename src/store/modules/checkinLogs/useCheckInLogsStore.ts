import { GetCheckInResponseType } from 'API/checkin/log';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { setCheckInLogsAction } from './checkInLogs';

const useCheckInLogs = () => {
  const dispatch = useDispatch();

  return {
    checkInLogs: useSelector<RootState, GetCheckInResponseType[]>(({ checkInLogs }) => checkInLogs),
    setCheckInLogs: useCallback(
      (param) => {
        dispatch(setCheckInLogsAction(param));
      },
      [dispatch],
    ),
  };
};

export default useCheckInLogs;
