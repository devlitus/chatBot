import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './global.css';
import { App } from './App.tsx';
import { SENTRY_DSN } from './constants.ts';
Sentry.init({
  dsn: SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'localhost',
    'https://chat-bot-wine-five.vercel.app/',
  ],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
