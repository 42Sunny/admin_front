import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { LoginProvider } from './admin/contexts/LoginContext';
import AdminPage from './admin';
import { VisitorProvider } from 'admin/contexts/VisitorContext';

ReactDOM.render(
  <LoginProvider>
    <VisitorProvider>
      <AdminPage />
    </VisitorProvider>
  </LoginProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
