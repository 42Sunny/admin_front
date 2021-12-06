import React, { useEffect, useCallback } from 'react';
import { VisitorProviderWrapper } from 'contexts/VisitorContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { checkAdmin } from 'api/checkinApi';
import Admin from 'layouts/Admin';
import Login from 'components/Login/Login';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';
import useUser from 'hooks/useUser';
import getCookieValue from 'utils/getCookieValue';

const App = () => {
  const { login, setLogin } = useUser();

  const getUserData = useCallback(async () => {
    try {
      const response = await checkAdmin();
      if (response.data['isAdmin']) {
        setLogin(true);
      } else {
        window.alert('접근 권한이 없습니다.');
        setLogin(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setLogin]);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (token !== '') {
      getUserData();
    } else {
      setLogin(false);
    }
  }, [getUserData, setLogin]);

  return (
    <BrowserRouter>
      <Switch>
        {login === true ? (
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
