import { create } from "zustand";
import { ModelOption } from "../types/modelOtions";

interface ListModelStore {
  listModels: ModelOption[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  setListModels: (models: ModelOption[]) => void;
}

export const useListModelStore = create<ListModelStore>((set) => ({
  selectedModel: 'Modelos LLM',
  listModels: [],
  setListModels: (models) => set(() => ({ listModels: models })),
  setSelectedModel: (model) => set(() => ({ selectedModel: model })),
}));
