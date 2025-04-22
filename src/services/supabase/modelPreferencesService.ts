import { supabase } from '../../utils/supabase'
import type { Database } from '../../types/database.types'

type ModelPreference = Database['public']['Tables']['model_preferences']['Row']
type NewModelPreference = Database['public']['Tables']['model_preferences']['Insert']

export const modelPreferencesService = {
  async getUserModelPreference(userId: string): Promise<ModelPreference | null> {
    const { data, error } = await supabase
      .from('model_preferences')
      .select()
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 es el código para "no se encontraron resultados"
      throw error
    }
    return data
  },

  async setUserModelPreference(preference: NewModelPreference): Promise<ModelPreference> {
    const { data, error } = await supabase
      .from('model_preferences')
      .upsert(preference)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}