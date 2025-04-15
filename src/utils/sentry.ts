import { SENTRY_DSN } from '@/constants';
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        })
      ],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      tracesSampleRate: import.meta.env.MODE === 'production' ? 0.2 : 1.0,
      beforeSend(event) {
        if (import.meta.env.MODE !== 'production') {
          console.log('Sentry event:', event);
        }
        return event;
      },
    });
  }
};

// Utilidad para capturar errores manuales
export const captureException = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error('Error captured for Sentry:', error, context);
  }
};

// Utilidad para capturar mensajes
export const captureMessage = (message: string, level?: Sentry.SeverityLevel) => {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`Message captured for Sentry (${level || 'info'}):", ${message}`);
  }
};

// HOC para envolver componentes con ErrorBoundary de Sentry
export const withErrorBoundary = Sentry.withErrorBoundary;
export const ErrorBoundary = Sentry.ErrorBoundary;
