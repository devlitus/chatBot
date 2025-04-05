import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';
import { useChatStore } from '@/stores/chat/chat';
import { useMessage } from '@/hooks/message/useMessage';
import { useListModelStore } from '@/stores/listModel/listModel';

// Mock de los hooks
vi.mock('@/stores/chat/chat', () => ({
  useChatStore: vi.fn(),
}));

vi.mock('@/hooks/message/useMessage', () => ({
  useMessage: vi.fn(),
}));

vi.mock('@/stores/listModel/listModel', () => ({
  useListModelStore: vi.fn(),
}));

describe('Footer', () => {
  beforeEach(() => {
    // Configuración por defecto de los mocks
    vi.mocked(useChatStore).mockReturnValue({
      addMessage: vi.fn(),
      currentChatId: '1',
      addChat: vi.fn(),
    });

    vi.mocked(useMessage).mockReturnValue({
      handleSendMessage: vi.fn(),
      fetchMessage: vi.fn(),
      isLoading: false,
    });

    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-4',
    });
  });

  test('renderiza el componente correctamente', () => {
    render(<Footer />);
    expect(
      screen.getByPlaceholderText('Escriba un mensaje...'),
    ).toBeInTheDocument();
  });

  test('el botón de enviar está deshabilitado cuando el input está vacío', () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText('Escriba un mensaje...');
    const sendButton = screen.getByRole('button', {
      name: 'enviar mensaje',
    });

    expect(sendButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Hola' } });
    expect(sendButton).not.toBeDisabled();
  });

  test('el input está deshabilitado cuando el modelo es "Modelos LLM"', () => {
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM',
    });

    render(<Footer />);
    const input = screen.getByPlaceholderText('Escriba un mensaje...');
    expect(input).toBeDisabled();
  });

  test('envía el mensaje cuando se presiona Enter', async () => {
    const addMessage = vi.fn();
    const fetchMessage = vi.fn();

    vi.mocked(useChatStore).mockReturnValue({
      addMessage,
      currentChatId: '1',
      addChat: vi.fn(),
    });

    vi.mocked(useMessage).mockReturnValue({
      handleSendMessage: vi.fn(),
      fetchMessage,
      isLoading: false,
    });

    render(<Footer />);
    const input = screen.getByPlaceholderText('Escriba un mensaje...');

    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(addMessage).toHaveBeenCalledWith({
      role: 'user',
      content: 'Hola',
    });
    expect(fetchMessage).toHaveBeenCalledWith('Hola');
  });

  test('crea un nuevo chat si no hay chat activo', async () => {
    const addChat = vi.fn();
    const addMessage = vi.fn();

    vi.mocked(useChatStore).mockReturnValue({
      addMessage,
      currentChatId: null,
      addChat,
    });

    render(<Footer />);
    const input = screen.getByPlaceholderText('Escriba un mensaje...');

    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(addChat).toHaveBeenCalled();
    expect(addMessage).toHaveBeenCalled();
  });
});
