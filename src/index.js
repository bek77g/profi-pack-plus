import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainContentContext } from './hoc/mainContentContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainContentContext>
    <App />
  </MainContentContext>
);
