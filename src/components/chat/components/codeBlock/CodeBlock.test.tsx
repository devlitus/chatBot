import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('should render inline code correctly', () => {
    render(<CodeBlock inline>const test = "hello"</CodeBlock>);

    const codeElement = screen.getByText('const test = "hello"');
    expect(codeElement.tagName).toBe('CODE');
    expect(codeElement).toHaveClass('bg-[var(--color-bg-secondary)]');
  });

  it('should render syntax highlighted code block correctly', () => {
    const code = `const hello = "world";\nconsole.log(hello);`;
    render(<CodeBlock className="language-javascript">{code}</CodeBlock>);

    const container = screen.getByRole('code');
    expect(container).toHaveClass('language-javascript');
    expect(container.textContent).toContain('const hello');
    expect(container.textContent).toContain('console.log');

    const wrapperDiv = container.closest('div.rounded-md');
    expect(wrapperDiv).toBeInTheDocument();
  });

  it('should handle empty code blocks', () => {
    render(<CodeBlock className="language-javascript">{''}</CodeBlock>);
    const container = screen.getByRole('code');
    expect(container).toHaveClass('language-javascript');
    expect(container.textContent?.trim()).toBe('');
  });

  it('should handle undefined className', () => {
    render(<CodeBlock>some code</CodeBlock>);
    const codeElement = screen.getByText('some code');
    expect(codeElement.tagName).toBe('CODE');
  });
});
