import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser as sU } from '../redux/modules/user';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const setUser = useCallback(
    (param) => {
      dispatch(sU(param));
    },
    [dispatch],
  );

  return { user, setUser };
};

export default useUser;
