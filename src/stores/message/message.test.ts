import { describe, test, expect, beforeEach } from 'vitest';
import { useMessageStore } from './message';

describe('useMessageStore', () => {
  beforeEach(() => {
    // Restablecer el estado del store antes de cada prueba
    useMessageStore.setState({ isLoading: false });
  });

  test('debería inicializar con isLoading en false', () => {
    const state = useMessageStore.getState();
    expect(state.isLoading).toBe(false);
  });

  test('debería actualizar el estado de isLoading', () => {
    const { setIsLoading } = useMessageStore.getState();
    
    // Activar loading
    setIsLoading(true);
    expect(useMessageStore.getState().isLoading).toBe(true);
    
    // Desactivar loading
    setIsLoading(false);
    expect(useMessageStore.getState().isLoading).toBe(false);
  });
});