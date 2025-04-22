import { GROQ_API_KEY, GROQ_URL_MODELS } from "../../constants";
import { GroqModelResponse, ModelResponse } from "../../types/modelResponse";
import { ApiResponse } from "@/types/apiResponse";
import { captureError } from "@/utils/sentry/sentryUtils";


const mapToModelResponse = (data: GroqModelResponse): ModelResponse => {
  return {
    id: data.id,
    object: data.object,
    created: data.created,
    ownedBy: data.owned_by,
    active: data.active ?? false,
    contextWindow: data.context_window ?? 0,
    publicApps: data.public_apps
  };
};

export const fetchModels = async (): Promise<ModelResponse[]> => {
  try {
    const response = await fetch(GROQ_URL_MODELS, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
    });

    if (!response.ok) {
      handleError(new Error(`Error en la API: ${response.status}`));      
      throw new Error(`Error en la API: ${response.status}`);
    }

    const apiResponse = (await response.json()) as ApiResponse<GroqModelResponse[]>;
    return apiResponse.data.map(mapToModelResponse);
  } catch (error) {
    handleError(error);
    throw new Error(`Error al obtener modelos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
};

/**
 * Maneja y registra errores
 */
const handleError = (error: unknown): void => {
  const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  captureError(error as Error, {
    type: 'fetchModels',
    message: errorMessage,
    url: GROQ_URL_MODELS,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
  console.error('Error al obtener modelos:', errorMessage);
};
