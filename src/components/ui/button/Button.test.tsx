import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button/Button';

describe('Button Component', () => {
  test('debería renderizar el botón con el contenido correcto', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  test('debería aplicar la clase primary por defecto', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('button', 'primary');
  });

  test('debería aplicar la clase secondary cuando se especifica', () => {
    render(<Button variant="secondary">Test Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('button', 'secondary');
  });

  test('debería aplicar el tamaño md por defecto', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('md');
  });

  test('debería aplicar el tamaño especificado', () => {
    render(<Button size="sm">Test Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('sm');
  });

  test('debería combinar las clases personalizadas con las predeterminadas', () => {
    render(<Button className="custom-class">Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'primary', 'md', 'custom-class');
  });

  test('debería pasar las props adicionales al elemento button', () => {
    render(<Button disabled>Test Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
