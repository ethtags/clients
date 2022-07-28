import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { addScript } from './components/utils';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// importing third party JS asynchronously
addScript({
  src: "https://browser.sentry-cdn.com/7.8.0/bundle.min.js",
  id: "sentry-cdn",
  onLoad: () => {
    window.Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN || "",
      environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || "dev"
    });
  }
})


// render App
ReactDOM.render(<App />, document.getElementById('root'));

// load and init Sentry after rendering App
