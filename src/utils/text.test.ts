import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from './text';

describe('capitalizeFirstLetter', () => {
  it('debería capitalizar la primera letra de un texto', () => {
    expect(capitalizeFirstLetter('hola')).toBe('Hola');
  });

  it('debería mantener el resto del texto sin cambios', () => {
    expect(capitalizeFirstLetter('hola mundo')).toBe('Hola mundo');
  });

  it('debería manejar strings vacíos', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('debería manejar strings de un solo carácter', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
  });

  it('debería mantener las mayúsculas existentes', () => {
    expect(capitalizeFirstLetter('hOLA MUNDO')).toBe('HOLA MUNDO');
  });
});