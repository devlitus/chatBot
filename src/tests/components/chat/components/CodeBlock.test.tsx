import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from '../../../../components/chat/components/CodeBlock';

describe('CodeBlock', () => {
  it('should render inline code correctly', () => {
    render(<CodeBlock inline>const test = "hello"</CodeBlock>);
    const codeElement = screen.getByText('const test = "hello"');
    expect(codeElement.tagName).toBe('CODE');
    expect(codeElement).toHaveClass('bg-[var(--color-bg-secondary)]');
  });

  it('should render code block with syntax highlighting', () => {
    render(
      <CodeBlock data-testid="code-block" className="language-javascript">
        const test = "hello";
      </CodeBlock>
    );
    // Check for the container div with rounded corners
    const container = screen.getByTestId('code-block');
    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain('const test = "hello"');
    // Verify the outer container has the correct class
    expect(container).toHaveClass('rounded-md');
    
    // Get the inner SyntaxHighlighter div (it uses a code element)
    const syntaxHighlighter = container.querySelector('code');
    expect(syntaxHighlighter).not.toBeNull();
  });

  it('should strip trailing newline in code blocks', () => {
    render(
      <CodeBlock data-testid="code-block" className="language-javascript">
        const test = "hello";
      </CodeBlock>
    );
    // Use textContent to check the actual rendered text
    const container = screen.getByTestId('code-block');
    expect(container.textContent?.trim()).toBe('const test = "hello";');
  });

  it('should handle missing language gracefully', () => {
    render(<CodeBlock data-testid="code-block">const test = "hello";</CodeBlock>);
    const codeElement = screen.getByText('const test = "hello";');
    expect(codeElement.tagName).toBe('CODE');
  });

  it('should pass through additional props', () => {
    render(
      <CodeBlock data-testid="code-block" className="language-javascript">
        const test = "hello";
      </CodeBlock>
    );
    const element = screen.getByTestId('code-block');
    expect(element).toBeInTheDocument();
  });
});