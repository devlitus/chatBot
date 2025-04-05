import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';

// Mock de los componentes hijos
vi.mock('../ui/dropdown/Dropdown', () => ({
  Dropdown: () => <div data-testid="mock-dropdown">Dropdown</div>,
}));

vi.mock('../ui/switch/Switch', () => ({
  Switch: () => <div data-testid="mock-switch">Switch</div>,
}));

describe('Hero', () => {
  const defaultProps = {
    toggleSidebar: vi.fn(),
    isSidebarOpen: true,
  };

  test('debería renderizar correctamente', () => {
    render(<Hero {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('mock-switch')).toBeInTheDocument();
  });

  test('debería llamar a toggleSidebar cuando se hace clic en el botón', () => {
    render(<Hero {...defaultProps} />);

    const button = screen.getByTitle('Cerrar sidebar');
    fireEvent.click(button);

    expect(defaultProps.toggleSidebar).toHaveBeenCalledTimes(1);
  });

  test('debería mostrar el título correcto según el estado del sidebar', () => {
    // Probar con sidebar abierto
    render(<Hero {...defaultProps} />);
    expect(screen.getByTitle('Cerrar sidebar')).toBeInTheDocument();

    // Probar con sidebar cerrado
    render(<Hero {...defaultProps} isSidebarOpen={false} />);
    expect(screen.getByTitle('Abrir sidebar')).toBeInTheDocument();
  });

  test('debería aplicar la rotación correcta según el estado del sidebar', () => {
    // Probar con sidebar abierto
    render(<Hero {...defaultProps} />);
    const buttonOpen = screen.getByTitle('Cerrar sidebar');
    expect(buttonOpen).toHaveStyle({ transform: 'rotate(0deg)' });

    // Probar con sidebar cerrado
    render(<Hero {...defaultProps} isSidebarOpen={false} />);
    const buttonClosed = screen.getByTitle('Abrir sidebar');
    expect(buttonClosed).toHaveStyle({ transform: 'rotate(180deg)' });
  });
});
