import { supabase } from '@/utils/supabase';
import { type IUser, type DatabaseUser, mapDatabaseUserToUser } from '@/types/user';

export const userService = {
  async getSessionUser(): Promise<IUser | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      return null;
    }

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', session.user.id)
      .single<DatabaseUser>();

    if (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }

    return mapDatabaseUserToUser(data);
  },

  async createAnonymousUser(): Promise<IUser | null> {
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
          name: 'Usuario Anónimo',
          is_anonymous: true
        }])
        .select()
        .single<DatabaseUser>();

      if (insertError) {
        console.error('Error creando usuario en la base de datos:', insertError);
        return null;
      }

      return mapDatabaseUserToUser(data);
    } catch (error) {
      console.error('Error en createAnonymousUser:', error);
      return null;
    }
  }
};