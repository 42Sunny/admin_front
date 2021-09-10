import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import 'assets/css/input.css';
import Login from 'components/Login/Login';
import { LoginContext, LoginProvider } from 'contexts/LoginContext';
import Admin from 'layouts/Admin';
import { VisitorProvider } from 'contexts/VisitorContext';

const App = () => {
  const { isLogin } = useContext(LoginContext);

  return (
    <LoginProvider>
      <VisitorProvider>
        <BrowserRouter>
          <Switch>
            {isLogin !== !isLogin ? (
              <Route path="*" component={Admin} />
            ) : (
              <Route path="*" component={Login} />
            )}
          </Switch>
        </BrowserRouter>
      </VisitorProvider>
    </LoginProvider>
  );
};

export default App;
