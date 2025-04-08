import React from 'react';
import { captureMessage, captureException } from '../../utils/sentry';

export const SentryTest: React.FC = () => {
  const triggerError = () => {
    try {
      // Provocar un error deliberadamente
      throw new Error('Este es un error de prueba para Sentry');
    } catch (error) {
      if (error instanceof Error) {
        captureException(error);
      }
    }
  };

  const triggerMessage = () => {
    captureMessage('Este es un mensaje de prueba para Sentry', 'info');
  };

  return (
    <div className="flex flex-col gap-2 p-4 mt-4 border rounded-lg">
      <h3 className="text-lg font-medium">Pruebas de Sentry</h3>
      <p className="text-sm text-gray-600">
        Utiliza estos botones para verificar que Sentry está capturando eventos correctamente.
      </p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={triggerError}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Lanzar Error
        </button>
        <button
          onClick={triggerMessage}
          className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Enviar Mensaje
        </button>
      </div>
    </div>
  );
};
