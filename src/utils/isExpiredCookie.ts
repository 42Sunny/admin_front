import { logoutAction } from 'redux/modules/login';
import getCookieValue from './getCookieValue';
import store from 'redux/configureStore';

export const isExpiredCookie = () => {
  const value = getCookieValue(process.env.REACT_APP_AUTH_KEY);
  if (value === '') {
    window.alert('쿠키가 만료되었습니다. 다시 로그인해주세요.');
    store.dispatch(logoutAction());
    return true;
  }
  return false;
};
