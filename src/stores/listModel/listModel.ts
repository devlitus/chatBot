import { fetchModels } from "@/services/get/getListModels";
import { ModelResponse } from "@/types/modelResponse";
import { create } from "zustand";

interface ListModelStore {
  listModels: ModelResponse[];
  selectedModel: string;
  isLoading: boolean;
  error: string | null;
  setSelectedModel: (model: string) => void;
  fetchModels: () => Promise<void>;
}

export const useListModelStore = create<ListModelStore>()((set) => ({
  selectedModel: 'Modelos LLM',
  listModels: [],
  isLoading: false,
  error: null,
  
  setSelectedModel: (model) => {
    set({ selectedModel: model });
  },

  fetchModels: async () => {
    try {
      set({ isLoading: true, error: null });
      const models = await fetchModels();
      set({ listModels: models, isLoading: false });
    } catch (error) {
      console.error('Error fetching models:', error);
      set({ error: 'Error al cargar los modelos', isLoading: false });
    }
  }
}));
