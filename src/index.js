import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LoginProvider } from 'contexts/LoginContext';
import 'assets/css/Global.css';
import configureStore from 'redux/configureStore';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={configureStore}>
    <LoginProvider>
      <App />
    </LoginProvider>
  </Provider>,
  document.getElementById('root'),
);
