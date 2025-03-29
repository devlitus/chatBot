import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from '../../../src/stores/theme';

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ isDark: true });
  });

  it('should initialize with isDark as true', () => {
    const state = useThemeStore.getState();
    expect(state.isDark).toBe(true);
  });

  it('should toggle isDark state when toggleTheme is called', () => {
    const { toggleTheme } = useThemeStore.getState();
    
    // Initial state is true, toggle to false
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(false);
    
    // Toggle back to true
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(true);
  });
});