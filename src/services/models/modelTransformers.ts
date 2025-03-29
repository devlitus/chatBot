import { ModelOption, COMPANY_NAMES } from "@/types/modelOptions";
import { ModelResponse } from "@/types/modelResponse";
import { capitalizeFirstLetter } from "@/utils/text";

const EXCLUDED_COMPANIES = ['sdaia', 'playai'];

interface CompanyModels {
  [company: string]: ModelResponse[];
}

/**
 * Filtra los modelos excluyendo compañías específicas
 */
export const filterModelsByCompany = (models: ModelResponse[]): ModelResponse[] => {
  return models.filter(model => {
    const company = model.owned_by.toLowerCase();
    return !EXCLUDED_COMPANIES.some(excluded => company.includes(excluded));
  });
};

/**
 * Agrupa los modelos por compañía
 */
export const groupModelsByCompany = (models: ModelResponse[]): CompanyModels => {
  return models.reduce<CompanyModels>((acc, model) => {
    const company = model.owned_by.toLowerCase();
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(model);
    return acc;
  }, {});
};

/**
 * Obtiene el nombre de visualización para una compañía
 */
export const getCompanyDisplayName = (company: string): string => 
  COMPANY_NAMES[company] || capitalizeFirstLetter(company);

/**
 * Ordena modelos por ID
 */
export const sortModelsById = (models: ModelResponse[]): ModelResponse[] => 
  [...models].sort((a, b) => a.id.localeCompare(b.id));

/**
 * Ordena por etiqueta
 */
export const sortByLabel = (a: ModelOption, b: ModelOption): number => 
  a.label.localeCompare(b.label);

/**
 * Transforma los modelos en opciones agrupadas por compañía
 */
export const transformToModelOptions = (models: ModelResponse[]): ModelOption[] => {
  if (!models.length) return [];

  const filteredModels = filterModelsByCompany(models);
  const groupedModels = groupModelsByCompany(filteredModels);

  return Object.entries(groupedModels)
    .map(([company, models]) => ({
      label: getCompanyDisplayName(company),
      options: sortModelsById(models)
    }))
    .sort(sortByLabel);
};
