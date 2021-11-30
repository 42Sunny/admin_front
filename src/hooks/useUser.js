import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from 'redux/modules/user';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const setUser = useCallback(
    (param) => {
      dispatch(setUserAction(param));
    },
    [dispatch],
  );

  return { user, setUser };
};

export default useUser;
