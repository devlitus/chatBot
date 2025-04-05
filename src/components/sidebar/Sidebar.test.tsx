import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { useChatStore } from '@/stores/chat/chat';

// Mock del store de chat
vi.mock('@/stores/chat/chat', () => ({
  useChatStore: vi.fn(),
}));

describe('Sidebar', () => {
  const mockChats = [
    {
      id: '1',
      messages: [{ role: 'user', content: 'Este es un mensaje de prueba' }],
    },
    {
      id: '2',
      messages: [{ role: 'user', content: 'Otro mensaje de prueba aquí' }],
    },
  ];

  const mockStoreFunctions = {
    chats: mockChats,
    currentChatId: '1',
    addChat: vi.fn(),
    setCurrentChat: vi.fn(),
    loadChats: vi.fn(),
    deleteChat: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true); // Mock de window.confirm
    vi.mocked(useChatStore).mockReturnValue(mockStoreFunctions);
  });

  test('debería renderizar el botón de nuevo chat', () => {
    render(<Sidebar />);
    const newChatButton = screen.getByText('Nuevo Chat');
    expect(newChatButton).toBeInTheDocument();
  });

  test('debería llamar a loadChats al montar el componente', () => {
    render(<Sidebar />);
    expect(mockStoreFunctions.loadChats).toHaveBeenCalledTimes(1);
  });

  test('debería mostrar los títulos de los chats basados en el primer mensaje', () => {
    render(<Sidebar />);
    expect(screen.getByText('Este es un mensaje de...')).toBeInTheDocument();
    expect(screen.getByText('Otro mensaje de prueba aquí')).toBeInTheDocument();
  });

  test('debería mostrar "Chat sin título" cuando el chat no tiene mensajes', () => {
    vi.mocked(useChatStore).mockReturnValue({
      ...mockStoreFunctions,
      chats: [
        {
          id: '3',
          messages: [],
        },
      ],
    });

    render(<Sidebar />);
    expect(screen.getByText('Chat sin título')).toBeInTheDocument();
  });

  test('debería llamar a addChat cuando se hace clic en el botón de nuevo chat', () => {
    render(<Sidebar />);
    const newChatButton = screen.getByText('Nuevo Chat');
    fireEvent.click(newChatButton);
    expect(mockStoreFunctions.addChat).toHaveBeenCalledTimes(1);
  });

  test('debería llamar a setCurrentChat cuando se hace clic en un chat', () => {
    render(<Sidebar />);
    const chatButton = screen.getByText('Este es un mensaje de...');
    fireEvent.click(chatButton);
    expect(mockStoreFunctions.setCurrentChat).toHaveBeenCalledWith('1');
  });

  test('debería llamar a deleteChat cuando se confirma la eliminación', () => {
    render(<Sidebar />);
    const deleteButtons = screen.getAllByTitle('Eliminar chat');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalledWith(
      '¿Estás seguro de que quieres eliminar esta conversación?',
    );
    expect(mockStoreFunctions.deleteChat).toHaveBeenCalledWith('1');
  });

  test('no debería llamar a deleteChat cuando se cancela la eliminación', () => {
    window.confirm = vi.fn(() => false);
    render(<Sidebar />);

    const deleteButtons = screen.getAllByTitle('Eliminar chat');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockStoreFunctions.deleteChat).not.toHaveBeenCalled();
  });
});
