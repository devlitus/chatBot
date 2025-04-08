import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        }),
        new Sentry.Replay(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of transactions in production
      // Session Replay
      replaysSessionSampleRate: 0.1, // Sample rate for session replays (10%)
      replaysOnErrorSampleRate: 1.0, // Sample rate for errors (100%)
      environment: import.meta.env.MODE,
      release: import.meta.env.VITE_APP_VERSION || 'development',
      enabled: import.meta.env.PROD,
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
