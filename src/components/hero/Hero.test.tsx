import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';

vi.mock('@/components/ui/dropdown/Dropdown', () => ({
  Dropdown: () => <div data-testid="dropdown">Dropdown</div>,
}));

vi.mock('@/components/ui/switch/Switch', () => ({
  Switch: () => <div data-testid="switch">Switch</div>,
}));

describe('Hero', () => {
  const mockToggleSidebar = vi.fn();

  test('renderiza correctamente con el sidebar cerrado', () => {
    render(<Hero toggleSidebar={mockToggleSidebar} isSidebarOpen={false} />);

    expect(screen.getByTitle('Abrir sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  test('renderiza correctamente con el sidebar abierto', () => {
    render(<Hero toggleSidebar={mockToggleSidebar} isSidebarOpen={true} />);

    expect(screen.getByTitle('Cerrar sidebar')).toBeInTheDocument();
  });

  test('llama a toggleSidebar cuando se hace click en el botón', () => {
    render(<Hero toggleSidebar={mockToggleSidebar} isSidebarOpen={false} />);

    const button = screen.getByTitle('Abrir sidebar');
    fireEvent.click(button);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  test('aplica la rotación correcta según el estado del sidebar', () => {
    const { rerender } = render(
      <Hero toggleSidebar={mockToggleSidebar} isSidebarOpen={false} />,
    );

    const buttonClosed = screen.getByTitle('Abrir sidebar');
    expect(buttonClosed).toHaveStyle({ transform: 'rotate(180deg)' });

    rerender(<Hero toggleSidebar={mockToggleSidebar} isSidebarOpen={true} />);

    const buttonOpen = screen.getByTitle('Cerrar sidebar');
    expect(buttonOpen).toHaveStyle({ transform: 'rotate(0deg)' });
  });
});
