import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renderiza el contenido del botón correctamente', () => {
    render(<Button>Texto del botón</Button>);
    expect(screen.getByText('Texto del botón')).toBeInTheDocument();
  });

  test('aplica la clase de variante correctamente', () => {
    render(<Button variant="secondary">Botón</Button>);
    const button = screen.getByText('Botón');
    expect(button).toHaveClass('secondary');
  });

  test('aplica el tamaño correcto', () => {
    render(<Button size="sm">Botón pequeño</Button>);
    const button = screen.getByText('Botón pequeño');
    expect(button).toHaveClass('sm');
  });

  test('aplica clases adicionales mediante className', () => {
    render(<Button className="mi-clase-personalizada">Botón</Button>);
    const button = screen.getByText('Botón');
    expect(button).toHaveClass('mi-clase-personalizada');
  });

  test('pasa las props adicionales al elemento button', () => {
    render(<Button disabled>Botón deshabilitado</Button>);
    const button = screen.getByText('Botón deshabilitado');
    expect(button).toBeDisabled();
  });
});
