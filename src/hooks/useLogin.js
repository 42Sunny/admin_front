import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from 'redux/modules/login';

const useLogin = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(({ login }) => login);

  const login = useCallback(() => {
    dispatch(loginAction());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return { isLogin, login, logout };
};

export default useLogin;
