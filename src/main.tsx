import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './global.css';
import { App } from './App.tsx';

Sentry.init({
  dsn: 'https://0b214c2d7d6c13eb17f978ee0f5a02bd@o4508578388639744.ingest.de.sentry.io/4509101638549584',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
