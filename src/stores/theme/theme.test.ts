import { describe, test, expect, beforeEach } from 'vitest';
import { useThemeStore } from './theme';

const initialState = {
  isDark: true
};

describe('useThemeStore', () => {
  beforeEach(() => {
    // Resetear el estado del store antes de cada test
    useThemeStore.setState(initialState);
  });

  test('debería inicializar con modo oscuro activado', () => {
    const state = useThemeStore.getState();
    expect(state.isDark).toBe(true);
  });

  test('debería alternar entre modo claro y oscuro', () => {
    const { toggleTheme } = useThemeStore.getState();
    
    // Cambiar a modo claro
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(false);
    
    // Cambiar de vuelta a modo oscuro
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(true);
  });
});