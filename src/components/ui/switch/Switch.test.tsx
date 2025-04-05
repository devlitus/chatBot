import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';
import { useThemeStore } from '@/stores/theme/theme';

// Mock del store de tema
vi.mock('@/stores/theme/theme', () => ({
  useThemeStore: vi.fn(),
}));

describe('Switch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('debería renderizar el botón de tema oscuro cuando isDark es true', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: true,
      toggleTheme: vi.fn(),
    });

    render(<Switch />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Cambiar a modo claro');
  });

  test('debería renderizar el botón de tema claro cuando isDark es false', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: false,
      toggleTheme: vi.fn(),
    });

    render(<Switch />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Cambiar a modo oscuro');
  });

  test('debería llamar a toggleTheme cuando se hace clic en el botón', () => {
    const toggleTheme = vi.fn();
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: true,
      toggleTheme,
    });

    render(<Switch />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  test('debería aplicar las clases CSS correctas para el tema oscuro', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: true,
      toggleTheme: vi.fn(),
    });

    render(<Switch />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--color-primary)]');
    expect(button).toHaveClass('text-[var(--color-light)]');
  });

  test('debería aplicar las clases CSS correctas para el tema claro', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: false,
      toggleTheme: vi.fn(),
    });

    render(<Switch />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--color-primary)]');
    expect(button).toHaveClass('text-[var(--color-text-light)]');
  });
});
