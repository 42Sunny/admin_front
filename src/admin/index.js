import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './assets/css/material-dashboard-react.css?v=1.10.0';
import 'admin/assets/css/input.css';
import Login from './components/Login/Login';
import { LoginContext } from './contexts/LoginContext';
import Admin from './layouts/Admin';

const AdminPage = () => {
  const { isLogin } = useContext(LoginContext);

  return (
    <BrowserRouter>
      <Switch>
        {/* {isLogin === true ? ( */}
        {true ? (
          <>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </>
        ) : (
          <>
            <Route path="/admin" component={Login} />
            <Redirect from="*" to="/admin" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default AdminPage;
