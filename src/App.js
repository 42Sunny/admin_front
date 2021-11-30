import React, { useEffect, useContext, useCallback } from 'react';
import { VisitorProviderWrapper } from 'contexts/VisitorContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginContext } from 'contexts/LoginContext';
import { checkAdmin } from 'api/checkinApi';
import Admin from 'layouts/Admin';
import Login from 'components/Login/Login';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';

const App = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);

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

  const getUserData = useCallback(async () => {
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
  }, [setIsLogin]);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (token !== '') {
      getUserData();
    } else {
      setIsLogin(false);
    }
  }, [getUserData, setIsLogin]);

  return (
    <BrowserRouter>
      <Switch>
        {process.env.REACT_APP_AUTO_LOGIN || isLogin ? (
          <VisitorProviderWrapper>
            <Route path="*" component={Admin} />
          </VisitorProviderWrapper>
        ) : (
          <Route path="*" component={Login} />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
