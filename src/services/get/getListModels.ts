import { ModelOption, COMPANY_NAMES } from "@/types/modelOptions";
import { GROQ_API_KEY, GROQ_URL_MODELS } from "../../constants";
import { ModelResponse } from "../../types/modelResponse";

/**
 * Ordena y agrupa modelos por compañía
 * @param models Lista de modelos a agrupar
 * @returns Lista de opciones agrupadas por compañía
 */
const groupModelsByCompany = (models: ModelResponse[]): ModelOption[] => {
  if (!models.length) return [];
  
  // Crear mapa de modelos por compañía
  const modelsByCompany = models.reduce<Record<string, ModelResponse[]>>((acc, model) => {
    const company = model.owned_by.toLowerCase();
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(model);
    return acc;
  }, {});

  // Transformar a formato ModelOption y ordenar
  return Object.entries(modelsByCompany)
    .map(([company, models]) => ({
      label: getCompanyDisplayName(company),
      options: sortModelsById(models)
    }))
    .sort(sortByLabel);
};

/**
 * Obtiene el nombre de visualización para una compañía
 */
const getCompanyDisplayName = (company: string): string => 
  COMPANY_NAMES[company] || capitalizeFirstLetter(company);

/**
 * Capitaliza la primera letra de un string
 */
const capitalizeFirstLetter = (text: string): string => 
  text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Ordena modelos por ID
 */
const sortModelsById = (models: ModelResponse[]): ModelResponse[] => 
  [...models].sort((a, b) => a.id.localeCompare(b.id));

/**
 * Función para ordenar por etiqueta
 */
const sortByLabel = (a: ModelOption, b: ModelOption): number => 
  a.label.localeCompare(b.label);

/**
 * Obtiene la lista de modelos desde la API y los agrupa por compañía
 * @returns Lista de modelos agrupados por compañía
 */
export const getListModels = async (): Promise<ModelOption[]> => {
  try {
    const models = await fetchModels();
    console.log(`Se encontraron ${models.length} modelos`);
    const groupedModels = groupModelsByCompany(models);
    console.log(`Modelos agrupados por ${groupedModels.length} compañías`);
    return groupedModels;
  } catch (error: unknown) {
    logError(error);
    return [];
  }
};

/**
 * Obtiene los modelos desde la API
 */
const fetchModels = async (): Promise<ModelResponse[]> => {
  console.log('Obteniendo lista de modelos...');
  const response = await fetch(GROQ_URL_MODELS, {
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
  });
  
  const { data } = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error('La respuesta de la API no es un array');
  }
  
  return data;
};

/**
 * Registra errores en la consola
 */
const logError = (error: unknown): void => {
  console.error(`Error al obtener los modelos: ${error}`);
};
