import { useCallback, useEffect } from 'react';
import { useListModelStore } from "@/stores/listModel/listModel";
import { ModelOption } from "@/types/modelOptions";
import { COMPANY_NAMES } from "@/types/modelOptions";
import { ModelResponse } from "@/types/modelResponse";
import { modelPreferencesService } from '@/services/supabase/modelPreferencesService';
import { useSupabaseAuth } from '../auth/useSupabaseAuth';

export const useDropdown = () => {
  const { listModels, fetchModels, setSelectedModel } = useListModelStore();
  const { user } = useSupabaseAuth();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  useEffect(() => {
    const loadUserPreference = async () => {
      if (!user) return;
      try {
        const preference = await modelPreferencesService.getUserModelPreference(user.id);
        if (preference?.model_id) {
          setSelectedModel(preference.model_id);
        }
      } catch (error) {
        console.error('Error loading user model preference:', error);
      }
    };

    loadUserPreference();
  }, [user, setSelectedModel]);

  const updateUserModelPreference = useCallback(async (modelId: string) => {
    if (!user) return;
    try {
      await modelPreferencesService.setUserModelPreference({
        user_id: user.id,
        model_id: modelId
      });
    } catch (error) {
      console.error('Error updating user model preference:', error);
    }
  }, [user]);
  
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

  const handleModelSelect = async (modelId: string) => {
    setSelectedModel(modelId);
    await updateUserModelPreference(modelId);
  };

  return {
    organizedModels: organizeByCompany(listModels),
    handleModelSelect
  };
};