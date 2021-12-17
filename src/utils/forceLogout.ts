import { logoutAction } from 'redux/modules/login';
import store from 'redux/configureStore';

const forceLogout = () => {
  window.alert('쿠키가 만료되었습니다. 다시 로그인해주세요.');
  store.dispatch(logoutAction());
};

export default forceLogout;
