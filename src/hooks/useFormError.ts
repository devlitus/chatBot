import { useState, useCallback } from 'react';
import { captureException, captureMessage } from '../utils/sentry';

interface FormError {
  field: string;
  message: string;
}

export const useFormError = (formName: string) => {
  const [errors, setErrors] = useState<FormError[]>([]);

  const addError = useCallback((field: string, message: string) => {
    setErrors((prev) => {
      // Si el error ya existe, no lo agregamos de nuevo
      if (prev.some(error => error.field === field)) {
        return prev;
      }
      
      // Capturar en Sentry como mensaje informativo
      captureMessage(`Formulario ${formName}: Error en campo ${field}`, 'warning');
      
      return [...prev, { field, message }];
    });
  }, [formName]);

  const removeError = useCallback((field: string) => {
    setErrors((prev) => prev.filter(error => error.field !== field));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleSubmitError = useCallback((error: Error, formData?: Record<string, any>) => {
    // Capturar el error del formulario en Sentry
    captureException(error, {
      formName,
      formData: formData || 'No form data available',
    });
    
    // Añadir un error general
    addError('general', error.message || 'Ha ocurrido un error al procesar el formulario');
    
    return error;
  }, [formName, addError]);

  return {
    errors,
    hasErrors: errors.length > 0,
    getFieldError: (field: string) => errors.find(error => error.field === field)?.message,
    addError,
    removeError,
    clearErrors,
    handleSubmitError
  };
};
