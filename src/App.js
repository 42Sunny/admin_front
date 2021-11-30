import React, { useEffect, useCallback } from 'react';
import { VisitorProviderWrapper } from 'contexts/VisitorContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { checkAdmin } from 'api/checkinApi';
import Admin from 'layouts/Admin';
import Login from 'components/Login/Login';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';
import useUser from 'hooks/useUser';
import useCriteria from 'hooks/useCriteria';

const App = () => {
  const { user, setUser } = useUser();
  const { setMaxGaepo, setMaxSeocho } = useCriteria();

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
        setUser(response.data.user['_id']);
      } else {
        window.alert('접근 권한이 없습니다.');
        setUser('');
      }
    } catch (err) {
      console.log(err);
    }
  }, [setUser]);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (token !== '') {
      getUserData();
    } else {
      setUser('');
    }
  }, [getUserData, setUser]);

  return (
    <BrowserRouter>
      <Switch>
        {user !== '' ? (
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
