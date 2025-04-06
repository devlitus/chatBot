import * as Sentry from '@sentry/react';

export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context
  });
};

// Capturar errores no manejados
window.addEventListener('unhandledrejection', (event) => {
  captureError(event.reason, {
    type: 'unhandledrejection',
    promise: event.promise
  });
});

// Capturar errores de red
window.addEventListener('error', (event) => {
  if (event.error instanceof Error) {
    captureError(event.error, {
      type: 'error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  }
});