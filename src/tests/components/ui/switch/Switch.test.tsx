import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '@/components/ui/switch/Switch';
import { useThemeStore } from '@/stores/theme';

// Mock del store de tema
vi.mock('@/stores/theme', () => ({
  useThemeStore: vi.fn(),
}));

describe('Switch Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza el botón en modo oscuro', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: true,
      toggleTheme: vi.fn(),
    });

    render(<Switch />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-[var(--color-primary)]');
    expect(button).toHaveAttribute('title', 'Cambiar a modo claro');
  });

  test('renderiza el botón en modo claro', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: false,
      toggleTheme: vi.fn(),
    });

    render(<Switch />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-[var(--color-primary)]');
    expect(button).toHaveAttribute('title', 'Cambiar a modo oscuro');
  });

  test('llama a toggleTheme cuando se hace clic en el botón', () => {
    const mockToggleTheme = vi.fn();
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: true,
      toggleTheme: mockToggleTheme,
    });

    render(<Switch />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
