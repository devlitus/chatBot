import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './global.css';
import { App } from './App.tsx';
import { SENTRY_DSN } from './constants.ts';
Sentry.init({
  dsn: SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: import.meta.env.MODE === 'production' ? 0.2 : 1.0,
  beforeSend(event) {
    if (import.meta.env.MODE !== 'production') {
      console.log('Sentry event:', event);
    }
    return event;
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
