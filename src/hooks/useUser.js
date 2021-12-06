import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginAction } from 'redux/modules/login';

const useLogin = () => {
  const dispatch = useDispatch();
  const login = useSelector(({ login }) => login);

  const setLogin = useCallback(
    (param) => {
      dispatch(setLoginAction(param));
    },
    [dispatch],
  );

  return { login, setLogin };
};

export default useLogin;
