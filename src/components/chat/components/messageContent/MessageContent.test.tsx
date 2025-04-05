import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageContent } from './MessageContent';

describe('MessageContent', () => {
  it('debería renderizar texto plano correctamente', () => {
    render(<MessageContent content="Texto de prueba" />);
    expect(screen.getByText('Texto de prueba')).toBeInTheDocument();
  });

  it('debería renderizar elementos markdown básicos', () => {
    const content = `
# Título
## Subtítulo
**Texto en negrita**
*Texto en cursiva*
`;
    render(<MessageContent content={content} />);

    expect(screen.getByText('Título')).toHaveClass('text-2xl', 'font-bold');
    expect(screen.getByText('Subtítulo')).toHaveClass('text-xl', 'font-bold');
    expect(screen.getByText('Texto en negrita')).toHaveClass('font-semibold');
    expect(screen.getByText('Texto en cursiva')).toHaveClass('italic');
  });

  it('debería renderizar listas correctamente', () => {
    const content = `
- Item 1
- Item 2

1. Número 1
2. Número 2
`;
    const { container } = render(<MessageContent content={content} />);

    const unorderedList = container.querySelector('ul');
    const orderedList = container.querySelector('ol');

    expect(unorderedList).toHaveClass('list-disc', 'ml-4', 'space-y-1');
    expect(orderedList).toHaveClass('list-decimal', 'ml-4', 'space-y-1');
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('debería renderizar blockquotes correctamente', () => {
    const content = '> Esto es una cita';
    const { container } = render(<MessageContent content={content} />);

    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toHaveClass('border-l-4', 'pl-4', 'italic');
  });

  it('debería renderizar tablas correctamente', () => {
    const content = `
| Header 1 | Header 2 |
|----------|----------|
| Celda 1  | Celda 2  |
`;
    const { container } = render(<MessageContent content={content} />);

    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelectorAll('th')).toHaveLength(2);
    expect(container.querySelectorAll('td')).toHaveLength(2);
  });

  it('debería renderizar código inline y bloques de código', () => {
    const content = `
\`código inline\`

\`\`\`javascript
console.log('Hola mundo');
\`\`\`
`;
    const { container } = render(<MessageContent content={content} />);

    const inlineCode = screen.getByText('código inline');
    expect(inlineCode.tagName).toBe('CODE');
    expect(inlineCode).toHaveClass('bg-[var(--color-bg-secondary)]');

    const codeBlock = container.querySelector('pre');
    expect(codeBlock).toBeInTheDocument();
  });

  it('debería aplicar clases de prosa correctamente', () => {
    render(<MessageContent content="Test" />);
    const proseContainer = screen.getByText('Test').closest('div');
    expect(proseContainer).toHaveClass('prose', 'prose-invert', 'max-w-none');
  });

  it('debería manejar contenido vacío', () => {
    const { container } = render(<MessageContent content="" />);
    const proseContainer = container.querySelector('.prose');
    expect(proseContainer).toBeInTheDocument();
    expect(proseContainer?.textContent).toBe('');
  });
});
