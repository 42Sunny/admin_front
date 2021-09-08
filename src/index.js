import React from 'react';
import ReactDOM from 'react-dom';
import { LoginProvider } from './contexts/LoginContext';
import { VisitorProvider } from 'contexts/VisitorContext';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
