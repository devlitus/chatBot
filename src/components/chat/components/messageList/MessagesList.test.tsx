import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageList } from '@/components/chat/components/messageList/MessageList';
import { useMessageStore } from '@/stores/message';

// Mock del store de mensajes
vi.mock('@/stores/message', () => ({
  useMessageStore: vi.fn(),
}));

describe('MessageList Component', () => {
  const mockMessagesEndRef = { current: document.createElement('div') };

  beforeEach(() => {
    vi.mocked(useMessageStore).mockReturnValue({
      isLoading: false,
    });
  });

  it('renders empty message list', () => {
    render(<MessageList messages={[]} messagesEndRef={mockMessagesEndRef} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('renders list of messages', () => {
    const messages = [
      { role: 'user' as const, content: 'Hello' },
      { role: 'assistant' as const, content: 'Hi there' },
      { role: 'user' as const, content: 'How are you?' },
    ];

    render(
      <MessageList messages={messages} messagesEndRef={mockMessagesEndRef} />,
    );

    // Verificar que se renderizan todos los mensajes
    messages.forEach((message) => {
      expect(screen.getByText(message.content)).toBeInTheDocument();
    });
  });

  it('shows loading spinner when isLoading is true', () => {
    vi.mocked(useMessageStore).mockReturnValue({
      isLoading: true,
    });

    render(<MessageList messages={[]} messagesEndRef={mockMessagesEndRef} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('does not show loading spinner when isLoading is false', () => {
    vi.mocked(useMessageStore).mockReturnValue({
      isLoading: false,
    });

    render(<MessageList messages={[]} messagesEndRef={mockMessagesEndRef} />);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('renders messages in correct order', () => {
    const messages = [
      { role: 'user' as const, content: 'First message' },
      { role: 'assistant' as const, content: 'Second message' },
      { role: 'user' as const, content: 'Third message' },
    ];

    render(
      <MessageList messages={messages} messagesEndRef={mockMessagesEndRef} />,
    );

    // Obtener todos los elementos de mensaje
    const messageElements = screen.getAllByTestId('message-container');

    // Verificar que los mensajes están en el orden correcto
    expect(messageElements[0]).toHaveTextContent('First message');
    expect(messageElements[1]).toHaveTextContent('Second message');
    expect(messageElements[2]).toHaveTextContent('Third message');
  });
});
