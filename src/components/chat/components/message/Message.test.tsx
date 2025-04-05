import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message } from './Message';
import { MessageContent } from '../messageContent/MessageContent';

// Mock del componente MessageContent
vi.mock('../messageContent/MessageContent', () => ({
  MessageContent: vi.fn(({ content }) => (
    <div data-testid="mock-message-content">{content}</div>
  )),
}));

describe('Message', () => {
  test('debería renderizar un mensaje del usuario correctamente', () => {
    render(<Message role="user" content="Hola mundo" />);

    const wrapper = screen.getByTestId('message-wrapper');
    const container = screen.getByTestId('message-container');
    const content = screen.getByText('Hola mundo');

    expect(wrapper).toHaveClass('justify-end');
    expect(container).toHaveClass('bg-[var(--color-accent)]');
    expect(container).toHaveClass('text-[var(--color-text-inverse)]');
    expect(content).toBeInTheDocument();
  });

  test('debería renderizar un mensaje del asistente correctamente', () => {
    const testMessage = 'Hola, ¿en qué puedo ayudarte?';
    render(<Message role="assistant" content={testMessage} />);

    const wrapper = screen.getByTestId('message-wrapper');
    const container = screen.getByTestId('message-container');
    const messageContent = screen.getByTestId('mock-message-content');

    expect(wrapper).toHaveClass('justify-start');
    expect(container).toHaveClass('bg-[var(--color-bg-secondary)]');
    expect(container).toHaveClass('text-[var(--color-text-primary)]');
    expect(messageContent).toBeInTheDocument();
    expect(messageContent).toHaveTextContent(testMessage);
    expect(MessageContent).toHaveBeenCalled();
    expect(vi.mocked(MessageContent).mock.calls[0][0]).toEqual({
      content: testMessage,
    });
  });
});
