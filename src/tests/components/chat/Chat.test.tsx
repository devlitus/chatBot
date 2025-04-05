import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Chat } from '@/components/chat/Chat';
import { useChatStore } from '@/stores/chat';
import { useListModelStore } from '@/stores/listModel';

// Mock de los stores
vi.mock('@/stores/chat', () => ({
  useChatStore: vi.fn(),
}));

vi.mock('@/stores/listModel', () => ({
  useListModelStore: vi.fn(),
}));

// Mock del componente MessageList
vi.mock('@/components/chat/components/MessageList', () => ({
  MessageList: ({ messages, messagesEndRef }: any) => (
    <div data-testid="message-list">
      {messages.map((msg: any, index: number) => (
        <div key={index}>{msg.content}</div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  ),
}));

describe('Chat Component', () => {
  const mockScrollIntoView = vi.fn();
  const mockMessages = [
    { role: 'user', content: 'Hola' },
    { role: 'assistant', content: 'Hola, ¿en qué puedo ayudarte?' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock de scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

    // Mock del estado inicial de los stores
    vi.mocked(useChatStore).mockReturnValue({
      chats: [
        {
          id: 'chat-1',
          messages: mockMessages,
        },
      ],
      currentChatId: 'chat-1',
    } as any);

    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo',
    } as any);
  });

  test('debería mostrar el mensaje de bienvenida cuando no hay modelo seleccionado', () => {
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM',
    } as any);

    render(<Chat />);

    expect(screen.getByText('Bienvenido al Chat')).toBeInTheDocument();
    expect(
      screen.getByText('Seleccione un modelo LLM para poder empezar'),
    ).toBeInTheDocument();
  });

  test('debería mostrar la lista de mensajes cuando hay un modelo seleccionado', () => {
    render(<Chat />);

    expect(screen.getByTestId('message-list')).toBeInTheDocument();
    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(
      screen.getByText('Hola, ¿en qué puedo ayudarte?'),
    ).toBeInTheDocument();
  });

  test('debería llamar a scrollIntoView cuando cambian los mensajes', () => {
    render(<Chat />);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
