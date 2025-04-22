import { create } from 'zustand';
import { userService } from '@/services/supabase/userService';
import { IUser } from '@/types/user';

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  getUser: () => Promise<void>;
  createAnonymousUser: () => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  getUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.getSessionUser();
      set({ user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al obtener el usuario',
        isLoading: false 
      });
    }
  },

  createAnonymousUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.createAnonymousUser();
      set({ user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al crear usuario anónimo',
        isLoading: false 
      });
    }
  },

  reset: () => {
    set({ user: null, isLoading: false, error: null });
  }
}));