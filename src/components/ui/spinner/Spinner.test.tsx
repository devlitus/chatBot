import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('debería renderizar correctamente', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('debería aplicar el tamaño mediano por defecto', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('w-8')).toBeTruthy();
    expect(spinner.classList.contains('h-8')).toBeTruthy();
  });

  it('debería aplicar el tamaño pequeño cuando se especifica', () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('w-6')).toBeTruthy();
    expect(spinner.classList.contains('h-6')).toBeTruthy();
  });

  it('debería aplicar el tamaño grande cuando se especifica', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('w-12')).toBeTruthy();
    expect(spinner.classList.contains('h-12')).toBeTruthy();
  });

  it('debería aplicar las clases personalizadas cuando se proporcionan', () => {
    render(<Spinner className="test-class" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.classList.contains('test-class')).toBeTruthy();
  });
});
