import React, { useEffect, useCallback } from 'react';
import { VisitorProviderWrapper } from 'contexts/VisitorContext';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from 'layouts/Admin';
import Login from 'components/Login/Login';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';
import useLogin from 'store/modules/login/useLoginStore';
import getCookieValue from 'utils/getCookieValue';
import { checkAdmin } from 'API/checkin/user/checkAdmin';
import { getQueryString } from 'utils/getQueryString';

const App = () => {
  const { isLogin, login, logout } = useLogin();

  getQueryString();
  const getUserData = useCallback(async () => {
    try {
      const response = await checkAdmin();
      if (response.data['isAdmin']) {
        login();
      } else {
        window.alert('접근 권한이 없습니다.');
        logout();
      }
    } catch (err) {
      console.log(err);
    }
  }, [login, logout]);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (token === '') {
      logout();
    } else {
      getUserData();
    }
  }, [getUserData, logout]);

  return (
    <BrowserRouter>
      <Switch>
        {isLogin === true ? (
          <VisitorProviderWrapper>
            <Route path="*" component={Admin} />
          </VisitorProviderWrapper>
        ) : (
          <>
            <Redirect to="/" />
            <Route path="*" component={Login} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
