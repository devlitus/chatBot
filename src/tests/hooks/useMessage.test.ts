import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useMessage } from '@/hooks/useMessage';
import { useChatStore } from '@/stores/chat';
import { useListModelStore } from '@/stores/listModel';
import { sendMessage } from '@/services/post/sendMessage';

// Mock the modules
vi.mock('@/services/post/sendMessage');
vi.mock('@/stores/chat');
vi.mock('@/stores/listModel');

describe('useMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock store defaults
    vi.mocked(useChatStore).mockReturnValue({
      chats: [],
      currentChatId: null,
      addMessage: vi.fn()
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM'
    });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useMessage());
    
    expect(result.current).toEqual({
      fetchMessage: expect.any(Function),
      isLoading: false,
      error: null
    });
  });

  it('should handle no active chat', async () => {
    const { result } = renderHook(() => useMessage());
    
    await act(async () => {
      const response = await result.current.fetchMessage('Hello');
      expect(response).toEqual({
        success: false,
        error: 'No active chat'
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle no model selected', async () => {
    vi.mocked(useChatStore).mockReturnValue({
      chats: [],
      currentChatId: '123',
      addMessage: vi.fn()
    });

    const { result } = renderHook(() => useMessage());
    
    await act(async () => {
      const response = await result.current.fetchMessage('Hello');
      expect(response).toEqual({
        success: false,
        error: 'No model selected'
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle chat not found', async () => {
    vi.mocked(useChatStore).mockReturnValue({
      chats: [],
      currentChatId: '123',
      addMessage: vi.fn()
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo'
    });

    const { result } = renderHook(() => useMessage());
    
    await act(async () => {
      const response = await result.current.fetchMessage('Hello');
      expect(response).toEqual({
        success: false,
        error: 'Chat not found'
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should successfully send and receive message', async () => {
    const mockChat = {
      id: '123',
      messages: [
        { role: 'user', content: 'Previous message' }
      ]
    };
    
    const mockAddMessage = vi.fn();
    
    vi.mocked(useChatStore).mockReturnValue({
      chats: [mockChat],
      currentChatId: '123',
      addMessage: mockAddMessage
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo'
    });
    
    vi.mocked(sendMessage).mockResolvedValue('Assistant response');

    const { result } = renderHook(() => useMessage());
    
    await act(async () => {
      const response = await result.current.fetchMessage('Hello');
      expect(sendMessage).toHaveBeenCalledWith({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'Previous message' },
          { role: 'user', content: 'Hello' }
        ]
      });
      
      expect(mockAddMessage).toHaveBeenCalledWith({
        role: 'assistant',
        content: 'Assistant response'
      });
      
      expect(response).toEqual({
        success: true,
        data: 'Assistant response'
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API error', async () => {
    const mockChat = {
      id: '123',
      messages: []
    };
    
    vi.mocked(useChatStore).mockReturnValue({
      chats: [mockChat],
      currentChatId: '123',
      addMessage: vi.fn()
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo'
    });
    
    vi.mocked(sendMessage).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useMessage());
    
    await act(async () => {
      const response = await result.current.fetchMessage('Hello');
      expect(response).toEqual({
        success: false,
        error: 'Failed to fetch message'
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Error al obtener respuesta');
  });

  it('should handle invalid API response', async () => {
    const mockChat = {
      id: '123',
      messages: []
    };
    
    vi.mocked(useChatStore).mockReturnValue({
      chats: [mockChat],
      currentChatId: '123',
      addMessage: vi.fn()
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo'
    });
    
    vi.mocked(sendMessage).mockResolvedValue('');

    const { result } = renderHook(() => useMessage());
    
    await act(async () => {
      const response = await result.current.fetchMessage('Hello');
      expect(response).toEqual({
        success: false,
        error: 'Invalid response from assistant'
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Respuesta inválida del asistente');
  });
});