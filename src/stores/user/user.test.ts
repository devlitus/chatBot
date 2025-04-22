import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '@/services/supabase/userService';
import { useUserStore } from './user';

vi.mock('@/services/supabase/userService', () => ({
  userService: {
    getSessionUser: vi.fn(),
    createAnonymousUser: vi.fn(),
  },
}));

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.getState().reset();
    vi.clearAllMocks();
  });

  describe('getUser', () => {
    it('debe actualizar el estado con el usuario cuando la petición es exitosa', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@test.com', created_at: '2023-01-01' };
      vi.mocked(userService.getSessionUser).mockResolvedValueOnce(mockUser);

      await useUserStore.getState().getUser();

      expect(useUserStore.getState().user).toEqual(mockUser);
      expect(useUserStore.getState().isLoading).toBe(false);
      expect(useUserStore.getState().error).toBeNull();
    });

    it('debe manejar errores correctamente', async () => {
      const error = new Error('Error de prueba');
      vi.mocked(userService.getSessionUser).mockRejectedValueOnce(error);

      await useUserStore.getState().getUser();

      expect(useUserStore.getState().user).toBeNull();
      expect(useUserStore.getState().isLoading).toBe(false);
      expect(useUserStore.getState().error).toBe('Error de prueba');
    });
  });

  describe('createAnonymousUser', () => {
    it('debe crear un usuario anónimo exitosamente', async () => {
      const mockUser = { id: '1', name: 'Usuario Anónimo', email: 'anonymous@test.com', created_at: '2023-01-01' };
      vi.mocked(userService.createAnonymousUser).mockResolvedValueOnce(mockUser);

      await useUserStore.getState().createAnonymousUser();

      expect(useUserStore.getState().user).toEqual(mockUser);
      expect(useUserStore.getState().isLoading).toBe(false);
      expect(useUserStore.getState().error).toBeNull();
    });

    it('debe manejar errores al crear usuario anónimo', async () => {
      const error = new Error('Error al crear usuario anónimo');
      vi.mocked(userService.createAnonymousUser).mockRejectedValueOnce(error);

      await useUserStore.getState().createAnonymousUser();

      expect(useUserStore.getState().user).toBeNull();
      expect(useUserStore.getState().isLoading).toBe(false);
      expect(useUserStore.getState().error).toBe('Error al crear usuario anónimo');
    });
  });

  describe('reset', () => {
    it('debe resetear el estado a sus valores iniciales', () => {
      const store = useUserStore.getState();
      store.reset();

      expect(store.user).toBeNull();
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });
  });
});