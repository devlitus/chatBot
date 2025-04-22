import { supabase } from '@/utils/supabase';
import { ModelOption } from '@/types/modelOptions';

export const modelService = {
  async storeModels(models: ModelOption[]): Promise<void> {
    try {
      // Primero eliminamos los modelos existentes
      await supabase
        .from('models')
        .delete()
        .neq('id', '0');

      // Insertamos los nuevos modelos
      const { error } = await supabase
        .from('models')
        .insert(
          models.flatMap(company => 
            company.options.map(model => ({
              id: model.id,
              model_data: model
            }))
          )
        );

      if (error) throw error;
    } catch (error) {
      console.error('Error storing models:', error);
      throw error;
    }
  },

  async getModels(): Promise<ModelOption[]> {
    try {
      const { data, error } = await supabase
        .from('models')
        .select('*');

      if (error) throw error;

      // Agrupamos los modelos por compañía
      const modelsByCompany = data.reduce((acc, { model_data }) => {
        const company = model_data.owned_by;
        if (!acc[company]) {
          acc[company] = {
            label: company,
            options: []
          };
        }
        acc[company].options.push(model_data);
        return acc;
      }, {} as Record<string, ModelOption>);

      return Object.values(modelsByCompany);
    } catch (error) {
      console.error('Error getting models:', error);
      return [];
    }
  }
};