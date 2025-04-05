import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { Chat } from './Chat';
import * as chatStore from '@/stores/chat/chat';
import * as modelStore from '@/stores/listModel/listModel';

vi.mock('@/stores/chat/chat', () => ({
  useChatStore: vi.fn(),
}));

vi.mock('@/stores/listModel/listModel', () => ({
  useListModelStore: vi.fn(),
}));

describe('Chat', () => {
  beforeEach(() => {
    // Mock de scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('debería mostrar el mensaje de bienvenida cuando no hay modelo seleccionado', () => {
    vi.mocked(chatStore.useChatStore).mockReturnValue({
      chats: [],
      currentChatId: null,
    });

    vi.mocked(modelStore.useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM',
    });

    render(<Chat />);

    expect(screen.getByText('Bienvenido al Chat')).toBeInTheDocument();
    expect(
      screen.getByText('Seleccione un modelo LLM para poder empezar'),
    ).toBeInTheDocument();
  });

  it('debería mostrar la lista de mensajes cuando hay un modelo seleccionado', () => {
    const mockMessages = [
      { id: '1', content: 'Mensaje de prueba', role: 'user' },
    ];

    vi.mocked(chatStore.useChatStore).mockReturnValue({
      chats: [{ id: '1', messages: mockMessages }],
      currentChatId: '1',
    });

    vi.mocked(modelStore.useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo',
    });

    render(<Chat />);

    expect(screen.queryByText('Bienvenido al Chat')).not.toBeInTheDocument();
  });
});
