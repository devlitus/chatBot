import { ModelOption } from "@/types/modelOptions";
import { create } from "zustand";

interface ListModelStore {
  listModels: ModelOption[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  setListModels: (models: ModelOption[]) => void;
}

export const MODEL_STORAGE_KEY = 'selectedModelId';

export const saveSelectedModelToLocalStorage = (modelId: string) => {
  localStorage.setItem(MODEL_STORAGE_KEY, JSON.stringify({ idModel: modelId }));
};

export const getSelectedModelFromLocalStorage = (): string => {
  const storedModel = localStorage.getItem(MODEL_STORAGE_KEY);
  if (storedModel) {
    try {
      const parsedModel = JSON.parse(storedModel);
      if (parsedModel && parsedModel.idModel) {
        return parsedModel.idModel;
      }
    } catch (error) {
      console.error('Error parsing stored model:', error);
    }
  }
  return 'Modelos LLM';
};

export const useListModelStore = create<ListModelStore>()((set) => ({
  selectedModel: getSelectedModelFromLocalStorage(),
  listModels: [],
  setListModels: (models) => set({ listModels: models }),
  setSelectedModel: (model) => {
    saveSelectedModelToLocalStorage(model);
    set({ selectedModel: model });
  },
}));
