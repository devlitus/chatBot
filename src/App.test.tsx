import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';
import { useThemeStore } from '@/stores/theme/theme';

// Mock de los componentes hijos
vi.mock('@/components/chat/Chat', () => ({
  Chat: () => <div data-testid="mock-chat">Chat Component</div>,
}));

vi.mock('@/components/footer/Footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer Component</div>,
}));

vi.mock('@/components/hero/Hero', () => ({
  Hero: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div data-testid="mock-hero">
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  ),
}));

vi.mock('@/components/sidebar/Sidebar', () => ({
  Sidebar: () => <div data-testid="mock-sidebar">Sidebar Component</div>,
}));

// Mock del store de tema
vi.mock('@/stores/theme/theme', () => ({
  useThemeStore: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: false,
      toggleTheme: vi.fn(),
    });
  });

  test('debería renderizar todos los componentes principales', () => {
    render(<App />);

    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chat')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('debería cambiar la clase dark en el documento cuando cambia el tema', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      isDark: true,
      toggleTheme: vi.fn(),
    });

    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('debería manejar correctamente el estado del sidebar', () => {
    render(<App />);

    const aside = screen.getByRole('complementary');
    expect(aside).toHaveClass('w-[280px]');

    // Simular el cierre del sidebar
    const toggleButton = screen.getByText('Toggle Sidebar');
    fireEvent.click(toggleButton);

    // Verificar que el sidebar se cierra
    expect(aside.className).toContain('w-0');
  });
});
