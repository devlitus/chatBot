import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '../../../../components/chat/components/MarkdownTable';

describe('MarkdownTable Components', () => {
  describe('Table Component', () => {
    it('should render table with correct classes', () => {
      render(
        <Table>
          <tbody>
            <tr><td>Test Content</td></tr>
          </tbody>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table).toHaveClass('min-w-full', 'border-collapse', 'border', 'text-sm');
    });

    it('should render children correctly', () => {
      render(
        <Table>
          <tbody>
            <tr><td>Test Content</td></tr>
          </tbody>
        </Table>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('TableHead Component', () => {
    it('should render thead with correct class', () => {
      render(
        <table>
          <TableHead>
            <tr><th>Header</th></tr>
          </TableHead>
        </table>
      );
      const thead = screen.getByRole('rowgroup');
      expect(thead).toHaveClass('bg-[var(--color-bg-secondary)]');
    });
  });

  describe('TableBody Component', () => {
    it('should render tbody with correct classes', () => {
      render(
        <table>
          <TableBody>
            <tr><td>Body Content</td></tr>
          </TableBody>
        </table>
      );
      const tbody = screen.getByRole('rowgroup');
      expect(tbody).toHaveClass('divide-y', 'divide-[var(--color-accent)]');
    });
  });

  describe('TableRow Component', () => {
    it('should render tr with correct classes', () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <td>Row Content</td>
            </TableRow>
          </tbody>
        </table>
      );
      const row = screen.getByRole('row');
      expect(row).toHaveClass('transition-colors', 'hover:bg-[var(--color-bg-secondary)]', 'bg-opacity-50');
    });
  });

  describe('TableHeader Component', () => {
    it('should render th with correct classes', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHeader>Header Content</TableHeader>
            </tr>
          </thead>
        </table>
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
        'whitespace-nowrap'
      );
    });
  });

  describe('TableCell Component', () => {
    it('should render td with correct classes', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>Cell Content</TableCell>
            </tr>
          </tbody>
        </table>
      );
      const cell = screen.getByRole('cell');
      expect(cell).toHaveClass(
        'px-6',
        'py-3',
        'border-r',
        'border-[var(--color-accent)]',
        'last:border-0',
        'whitespace-nowrap'
      );
    });

    it('should handle numeric content correctly', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>123</TableCell>
            </tr>
          </tbody>
        </table>
      );
      const cell = screen.getByRole('cell');
      expect(cell).toHaveClass('[&:has(>:is(number))]:text-right');
    });
  });
});
