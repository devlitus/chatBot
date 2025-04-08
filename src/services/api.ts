import { captureException } from '../utils/sentry';

// Tipo para definir la respuesta de la API
export interface ApiResponse<T> {
  data?: T;
  error?: Error;
  status: number;
}

// Función genérica para realizar peticiones fetch con manejo de errores para Sentry
export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    
    if (!response.ok) {
      // Si la respuesta no es exitosa
      const errorData = isJson ? await response.json() : await response.text();
      const errorMessage = isJson && errorData.message 
        ? errorData.message 
        : `Error ${response.status}: ${response.statusText}`;
      
      const error = new Error(errorMessage);
      
      // Capturar el error en Sentry con contexto adicional
      captureException(error, {
        url,
        status: response.status,
        errorData,
        requestMethod: options?.method || 'GET',
      });
      
      return {
        error,
        status: response.status
      };
    }
    
    // Si la respuesta es exitosa pero no es JSON
    if (!isJson) {
      return {
        data: await response.text() as unknown as T,
        status: response.status
      };
    }
    
    // Respuesta exitosa y es JSON
    const data = await response.json();
    return {
      data,
      status: response.status
    };
  } catch (error) {
    // Capturar errores de red o de parseo
    const networkError = error instanceof Error ? error : new Error('Unknown network error');
    
    captureException(networkError, {
      url,
      requestMethod: options?.method || 'GET',
    });
    
    return {
      error: networkError,
      status: 0 // Código de estado 0 indica error de red
    };
  }
}

// Ejemplo de uso para la API de GROQ
export const fetchGroq = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  const baseUrl = endpoint.includes('models') 
    ? import.meta.env.VITE_GROQ_URL_MODELS 
    : import.meta.env.VITE_GROQ_URL_COMPLETION;
  
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
  };
  
  return fetchWithErrorHandling<T>(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });
};
