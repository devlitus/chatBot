import { ModelOption } from "@/types/modelOptions";
import { GROQ_API_KEY, GROQ_URL_MODELS } from "../../constants";
import { ModelResponse } from "../../types/modelResponse";
import { transformToModelOptions } from "../models/modelTransformers";
import { ApiResponse } from "@/types/apiResponse";
import { captureError } from "@/utils/sentry/sentryUtils";

/**
 * Obtiene la lista de modelos desde la API y los agrupa por compañía
 */
export const getListModels = async (): Promise<ModelOption[]> => {
  try {
    const models = await fetchModels();
    return transformToModelOptions(models);
  } catch (error: unknown) {
    handleError(error);
    return [];
  }
};

/**
 * Obtiene los modelos desde la API
 */
const fetchModels = async (): Promise<ModelResponse[]> => {
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

    const apiResponse = (await response.json()) as ApiResponse<ModelResponse[]>;
    return apiResponse.data;
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
