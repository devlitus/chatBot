import React from 'react';
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

interface FallbackProps {
  error: Error;
  resetError(): void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetError }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">¡Algo salió mal!</h2>
        <p className="mb-4 text-gray-700">
          Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
        </p>
        <div className="p-3 mb-4 overflow-auto text-left text-sm bg-gray-100 rounded max-h-32">
          <pre className="text-red-500">{error.message}</pre>
        </div>
        <button
          onClick={resetError}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const AppErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <SentryErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorFallback error={error} resetError={resetError} />
      )}
    >
      {children}
    </SentryErrorBoundary>
  );
};
