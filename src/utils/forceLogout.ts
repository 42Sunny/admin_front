import { logoutAction } from 'store/modules/login/login';
import { dispatchToStore } from './dispatchToStore';

const forceLogout = () => {
  window.alert('쿠키가 만료되었습니다. 다시 로그인해주세요.');
  dispatchToStore(logoutAction());
};

export default forceLogout;
