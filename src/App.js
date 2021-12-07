import React, { useEffect, useCallback } from 'react';
import { VisitorProviderWrapper } from 'contexts/VisitorContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { checkAdmin } from 'api/checkinApi';
import Admin from 'layouts/Admin';
import Login from 'components/Login/Login';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';
import useLogin from 'hooks/useLogin';
import getCookieValue from 'utils/getCookieValue';

const App = () => {
  const { isLogin, login, logout } = useLogin();

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
    if (token === '' || token === undefined) {
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
          <Route path="*" component={Login} />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
