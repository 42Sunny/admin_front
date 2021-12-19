import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'assets/css/Global.css';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
