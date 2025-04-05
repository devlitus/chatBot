import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMessage } from './useMessage';
import { MessageService } from '@/services/messages/messageService';
import { useListModelStore } from '@/stores/listModel/listModel';
import { useChatStore } from '@/stores/chat/chat';
import { useMessageStore } from '@/stores/message/message';

// Mock de los stores
vi.mock('@/stores/listModel/listModel');
vi.mock('@/stores/chat/chat');
vi.mock('@/stores/message/message');
vi.mock('@/services/messages/messageService');

describe('useMessage', () => {
  const mockChat = {
    id: 'test-chat-id',
    messages: [],
    isActive: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock de useListModelStore
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'test-model',
      listModels: [],
      setListModels: vi.fn(),
      setSelectedModel: vi.fn()
    });

    // Mock de useChatStore
    vi.mocked(useChatStore).mockReturnValue({
      currentChatId: 'test-chat-id',
      chats: [mockChat],
      addMessage: vi.fn(),
      activateChat: vi.fn(),
      addChat: vi.fn(),
      deleteChat: vi.fn(),
      setCurrentChat: vi.fn(),
      loadChats: vi.fn()
    });

    // Mock de useMessageStore
    vi.mocked(useMessageStore).mockReturnValue({
      isLoading: false,
      setIsLoading: vi.fn()
    });

    // Mock de MessageService
    vi.spyOn(MessageService, 'validateMessageParams').mockReturnValue({ success: true });
    vi.spyOn(MessageService, 'getRecentMessages').mockReturnValue([]);
    vi.spyOn(MessageService, 'prepareMessagesToSend').mockReturnValue([]);
    vi.spyOn(MessageService, 'sendMessageToAPI').mockResolvedValue({ 
      success: true, 
      data: 'Mock response' 
    });
  });

  test('debería manejar el envío de mensaje correctamente', async () => {
    const { result } = renderHook(() => useMessage());

    await act(async () => {
      const response = await result.current.handleSendMessage('Hola mundo');
      expect(response.success).toBe(true);
      expect(response.data).toBe('Mock response');
    });

    expect(MessageService.validateMessageParams).toHaveBeenCalled();
    expect(MessageService.sendMessageToAPI).toHaveBeenCalled();
    expect(useChatStore().addMessage).toHaveBeenCalled();
  });

  test('debería manejar errores de validación', async () => {
    vi.mocked(MessageService.validateMessageParams).mockReturnValue({ 
      success: false, 
      error: 'Error de validación' 
    });

    const { result } = renderHook(() => useMessage());

    await act(async () => {
      const response = await result.current.handleSendMessage('Test message');
      expect(response.success).toBe(false);
      expect(response.error).toBe('Error de validación');
    });

    expect(MessageService.sendMessageToAPI).not.toHaveBeenCalled();
  });

  test('debería manejar chat no encontrado', async () => {
    vi.mocked(useChatStore).mockReturnValue({
      ...useChatStore(),
      chats: []
    });

    const { result } = renderHook(() => useMessage());

    await act(async () => {
      const response = await result.current.handleSendMessage('Test message');
      expect(response.success).toBe(false);
      expect(response.error).toBe('Chat not found');
    });
  });

  test('debería procesar mensajes pendientes al cambiar de chat', async () => {
    const mockActivateChat = vi.fn();
    const mockChatWithPendingMessage = {
      id: 'test-chat-id',
      messages: [{ role: 'user', content: 'Mensaje pendiente' }],
      isActive: false
    };

    vi.mocked(useChatStore).mockReturnValue({
      ...useChatStore(),
      chats: [mockChatWithPendingMessage],
      activateChat: mockActivateChat
    });

    await act(async () => {
      renderHook(() => useMessage());
      // Esperar a que se procesen las promesas pendientes
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Verificar que se procese el mensaje pendiente
    expect(MessageService.sendMessageToAPI).toHaveBeenCalled();
    expect(mockActivateChat).toHaveBeenCalledWith('test-chat-id');
  });

  test('fetchMessage debería mantener compatibilidad', async () => {
    const { result } = renderHook(() => useMessage());

    await act(async () => {
      const response = await result.current.fetchMessage('Test message');
      expect(response.success).toBe(true);
    });

    expect(MessageService.sendMessageToAPI).toHaveBeenCalled();
  });
});