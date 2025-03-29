import { ModelOption } from "@/types/modelOptions";
import { create } from "zustand";


interface ListModelStore {
  listModels: ModelOption[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  setListModels: (models: ModelOption[]) => void;
}

// Clave para guardar el modelo seleccionado en localStorage
const MODEL_STORAGE_KEY = 'selectedModelId';

// Función para guardar el ID del modelo seleccionado en localStorage
const saveSelectedModelToLocalStorage = (modelId: string) => {
  localStorage.setItem(MODEL_STORAGE_KEY, JSON.stringify({ idModel: modelId }));
};

// Función para obtener el ID del modelo seleccionado de localStorage
const getSelectedModelFromLocalStorage = (): string => {
  const storedModel = localStorage.getItem(MODEL_STORAGE_KEY);
  if (storedModel) {
    try {
      const parsedModel = JSON.parse(storedModel);
      return parsedModel.idModel || 'Modelos LLM';
    } catch (error) {
      console.error('Error parsing stored model:', error);
    }
  }
  return 'Modelos LLM';
};

export const useListModelStore = create<ListModelStore>((set) => ({
  selectedModel: getSelectedModelFromLocalStorage() ?? 'Modelos LLM',
  listModels: [],
  setListModels: (models) => set(() => ({ listModels: models })),
  setSelectedModel: (model) => {
    saveSelectedModelToLocalStorage(model);
    set(() => ({ selectedModel: model }));
  },
}));
