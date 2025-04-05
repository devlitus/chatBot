import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../../../../components/ui/spinner/Spinner';

describe('Spinner', () => {
  it('debería renderizarse correctamente', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('debería aplicar el tamaño mediano por defecto', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('w-8')).toBe(true);
    expect(spinner.classList.contains('h-8')).toBe(true);
  });

  it('debería aplicar el tamaño pequeño cuando size="sm"', () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('w-6')).toBe(true);
    expect(spinner.classList.contains('h-6')).toBe(true);
  });

  it('debería aplicar el tamaño grande cuando size="lg"', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('w-12')).toBe(true);
    expect(spinner.classList.contains('h-12')).toBe(true);
  });

  it('debería aplicar las clases personalizadas', () => {
    render(<Spinner className="custom-class" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('custom-class')).toBe(true);
  });
});
