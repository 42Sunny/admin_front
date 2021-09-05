import { createContext, useState, useEffect } from 'react';
import { checkAdmin } from '../../checkin-admin/api/api';

const LoginContext = createContext({});

const getCookieValue = (key) => {
  let cookieKey = key + '=';
  let result = '';
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') cookieArr[i] = cookieArr[i].substring(1);
    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

const LoginProvider = ({ children }) => {
  // const [isLogin, setIsLogin] = useState(window.localStorage.getItem('isLogin') === 'true');
  const [isLogin, setIsLogin] = useState(false);

  const getUserData = async () => {
    try {
      const response = await checkAdmin();
      if (response.data['isAdmin']) {
        setIsLogin(true);
      } else {
        window.alert('접근 권한이 없습니다.');
        setIsLogin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (token !== '') {
      getUserData();
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
