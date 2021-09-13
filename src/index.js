import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LoginProvider } from 'contexts/LoginContext';
import { VisitorProvider } from 'contexts/VisitorContext';

ReactDOM.render(
  <LoginProvider>
    <VisitorProvider>
      <App />
    </VisitorProvider>
  </LoginProvider>,
  document.getElementById('root'),
);
