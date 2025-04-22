import { supabase } from '@/utils/supabase';
import type { Database } from '@/types/database.types';

type User = Database['public']['Tables']['users']['Row'];

export const userService = {
  async getSessionUser(): Promise<User | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      return null;
    }

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }

    return data;
  },

  async createAnonymousUser(): Promise<User | null> {
    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInAnonymously();
      if (signInError || !user) {
        console.error('Error en autenticación anónima:', signInError);
        return null;
      }

      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{
          id: user.id,
          name: 'Usuario Anónimo'
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Error creando usuario en la base de datos:', insertError);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error en createAnonymousUser:', error);
      return null;
    }
  }
};