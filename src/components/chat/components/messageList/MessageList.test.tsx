import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import { useMessageStore } from '@/stores/message/message';
import { mockMessages } from '@/mocks/messageMock';

// Mock del store de mensajes
vi.mock('@/stores/message/message', () => ({
  useMessageStore: vi.fn(),
}));

// Mock del componente Message
vi.mock('../message/Message', () => ({
  Message: ({
    role,
    content,
  }: {
    role: 'user' | 'assistant';
    content: string;
  }) => (
    <div data-testid="mock-message">
      {role}: {content}
    </div>
  ),
}));

describe('MessageList', () => {
  const mockMessagesEndRef = { current: null };

  beforeEach(() => {
    vi.mocked(useMessageStore).mockReturnValue({
      isLoading: false,
    });
  });

  test('debería renderizar la lista de mensajes correctamente', () => {
    render(
      <MessageList
        messages={mockMessages}
        messagesEndRef={mockMessagesEndRef}
      />,
    );

    const messageElements = screen.getAllByTestId('mock-message');
    expect(messageElements).toHaveLength(2);
    expect(messageElements[0]).toHaveTextContent('user: Hola');
    expect(messageElements[1]).toHaveTextContent(
      'assistant: Hola, ¿cómo estás?',
    );
  });

  test('debería mostrar el spinner cuando está cargando', () => {
    vi.mocked(useMessageStore).mockReturnValue({
      isLoading: true,
    });

    render(
      <MessageList
        messages={mockMessages}
        messagesEndRef={mockMessagesEndRef}
      />,
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('no debería mostrar el spinner cuando no está cargando', () => {
    render(
      <MessageList
        messages={mockMessages}
        messagesEndRef={mockMessagesEndRef}
      />,
    );
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  test('debería renderizar sin mensajes', () => {
    render(<MessageList messages={[]} messagesEndRef={mockMessagesEndRef} />);
    expect(screen.queryByTestId('mock-message')).not.toBeInTheDocument();
  });
});
