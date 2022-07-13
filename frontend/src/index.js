import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// render App
ReactDOM.render(<App />, document.getElementById('root'));

// load and init Sentry after rendering App
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN || "",
  integrations: [new BrowserTracing()],
  tracesSampleRate: process.env.REACT_APP_SENTRY_SAMPLE_RATE || 1.0,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || "dev"
});

