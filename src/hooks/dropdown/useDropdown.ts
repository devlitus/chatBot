import { useEffect } from 'react';
import { useListModelStore } from "@/stores/listModel/listModel";
import { ModelOption } from "@/types/modelOptions";
import { COMPANY_NAMES } from "@/types/modelOptions";
import { ModelResponse } from "@/types/modelResponse";

export const useDropdown = () => {
  const { listModels, fetchModels } = useListModelStore();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);
  
  const organizeByCompany = (models: ModelResponse[]): ModelOption[] => {
    // Agrupar modelos por compañía
    const groupedByCompany = models.reduce<{ [key: string]: ModelResponse[] }>((acc, model) => {
      const company = model.ownedBy.toLowerCase();
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(model);
      return acc;
    }, {});

    // Convertir a formato ModelOption[]
    return Object.entries(groupedByCompany).map(([company, models]) => ({
      label: COMPANY_NAMES[company] || company,
      options: models
    }));
  };
  const organizedModels = organizeByCompany(listModels);

  return {
    organizedModels
  };
};