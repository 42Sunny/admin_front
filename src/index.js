import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LoginProvider } from 'contexts/LoginContext';
import 'assets/css/Global.css';

ReactDOM.render(
  <LoginProvider>
    <App />
  </LoginProvider>,
  document.getElementById('root'),
);
