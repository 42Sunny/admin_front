import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { loginAction, LoginType, logoutAction } from 'store/modules/login/login';

const useLogin = () => {
  const dispatch = useDispatch();

  return {
    isLogin: useSelector<RootState, LoginType>(({ login }) => login),
    login: useCallback(() => {
      dispatch(loginAction());
    }, [dispatch]),
    logout: useCallback(() => {
      dispatch(logoutAction());
    }, [dispatch]),
  };
};

export default useLogin;
