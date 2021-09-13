import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';
import Login from 'components/Login/Login';
import { LoginContext } from 'contexts/LoginContext';
import Admin from 'layouts/Admin';
import { checkAdmin } from 'api/checkinApi';

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
    <BrowserRouter>
      <Switch>
        {isLogin ? <Route path="*" component={Admin} /> : <Route path="*" component={Login} />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
