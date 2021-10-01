import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LoginProvider } from 'contexts/LoginContext';
import { VisitorProvider } from 'contexts/VisitorContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <LoginProvider>
    <SnackbarProvider maxSnack={3}>
      <VisitorProvider>
        <App />
      </VisitorProvider>
    </SnackbarProvider>
  </LoginProvider>,
  document.getElementById('root'),
);
