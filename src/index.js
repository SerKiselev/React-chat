import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";

import App from './App';

import { FIREBASE_CONFIG } from './constants/firebaseConfig';

import './index.scss';

initializeApp(FIREBASE_CONFIG);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
