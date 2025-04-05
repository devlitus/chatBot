import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from './MarkdownTable';

describe('MarkdownTable Components', () => {
  describe('Table', () => {
    test('debería renderizar una tabla con los estilos correctos', () => {
      render(
        <Table>
          <tbody>
            <tr>
              <td>Contenido</td>
            </tr>
          </tbody>
        </Table>,
      );

      const table = screen.getByRole('table');
      expect(table).toHaveClass(
        'min-w-full',
        'border-collapse',
        'border',
        'text-sm',
      );
    });
  });

  describe('TableHead', () => {
    test('debería renderizar un thead con el fondo correcto', () => {
      render(
        <table>
          <TableHead>
            <tr>
              <th>Encabezado</th>
            </tr>
          </TableHead>
        </table>,
      );

      const thead = screen.getByRole('rowgroup');
      expect(thead).toHaveClass('bg-[var(--color-bg-secondary)]');
    });
  });

  describe('TableBody', () => {
    test('debería renderizar un tbody con los divisores correctos', () => {
      render(
        <table>
          <TableBody>
            <tr>
              <td>Celda</td>
            </tr>
          </TableBody>
        </table>,
      );

      const tbody = screen.getByRole('rowgroup');
      expect(tbody).toHaveClass('divide-y', 'divide-[var(--color-accent)]');
    });
  });

  describe('TableRow', () => {
    test('debería renderizar una fila con los estilos de hover correctos', () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <td>Celda</td>
            </TableRow>
          </tbody>
        </table>,
      );

      const row = screen.getByRole('row');
      expect(row).toHaveClass(
        'transition-colors',
        'hover:bg-[var(--color-bg-secondary)]',
        'bg-opacity-50',
      );
    });
  });

  describe('TableHeader', () => {
    test('debería renderizar un encabezado con los estilos correctos', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHeader>Título</TableHeader>
            </tr>
          </thead>
        </table>,
      );

      const header = screen.getByRole('columnheader');
      expect(header).toHaveClass(
        'px-6',
        'py-3',
        'text-left',
        'border-r',
        'border-[var(--color-accent)]',
        'last:border-0',
        'font-semibold',
        'whitespace-nowrap',
      );
    });
  });

  describe('TableCell', () => {
    test('debería renderizar una celda con los estilos correctos', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>Contenido</TableCell>
            </tr>
          </tbody>
        </table>,
      );

      const cell = screen.getByRole('cell');
      expect(cell).toHaveClass(
        'px-6',
        'py-3',
        'border-r',
        'border-[var(--color-accent)]',
        'last:border-0',
        '[&:has(>:is(number))]:text-right',
        'whitespace-nowrap',
      );
    });
  });

  test('debería renderizar una tabla completa con todos los componentes', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Encabezado 1</TableHeader>
            <TableHeader>Encabezado 2</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Celda 1</TableCell>
            <TableCell>Celda 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });
});
