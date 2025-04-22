import { fetchModels } from "@/services/get/getListModels";
import { modelService } from "@/services/supabase/modelService";
import { ModelResponse } from "@/types/modelResponse";
import { transformToModelOptions } from "@/services/models/modelTransformers";
import { create } from "zustand";
import { supabase } from "@/utils/supabase";

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

      // Verificar sesión antes de continuar
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Si no hay sesión, intentamos crear un usuario anónimo
        const { data: { user }, error } = await supabase.auth.signInAnonymously();
        if (error || !user) {
          throw new Error('No se pudo crear una sesión anónima');
        }
      }

      const models = await fetchModels();
      
      // Transformar y guardar en Supabase
      const modelOptions = transformToModelOptions(models);
      await modelService.storeModels(modelOptions);
      
      set({ listModels: models, isLoading: false });
    } catch (error) {
      console.error('Error fetching models:', error);
      set({ error: 'Error al cargar los modelos', isLoading: false });
    }
  }
}));
