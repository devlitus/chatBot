import { renderHook, act } from '@testing-library/react';
import { useMessage } from '@/hooks/useMessage';
import { useChatStore } from '@/stores/chat';
import { useListModelStore } from '@/stores/listModel';
import { useMessageStore } from '@/stores/message';
import { vi, describe, expect, it, beforeEach } from 'vitest';

// Mock the modules
vi.mock('@/stores/chat');
vi.mock('@/stores/listModel');
vi.mock('@/stores/message');
vi.mock('@/services/post/sendMessage', () => ({
  sendMessage: vi.fn().mockResolvedValue('AI response')
}));

describe('useMessage', () => {
  const mockAddMessage = vi.fn();
  const mockSetIsLoading = vi.fn();
  const mockActivateChat = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock store implementations
    vi.mocked(useChatStore).mockReturnValue({
      currentChatId: '123',
      chats: [{
        id: '123',
        messages: [],
        isActive: false
      }],
      addMessage: mockAddMessage,
      activateChat: mockActivateChat
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo'
    });

    vi.mocked(useMessageStore).mockReturnValue({
      setIsLoading: mockSetIsLoading,
      isLoading: false
    });
  });

  it('should process pending messages in inactive chats', async () => {
    // Mock an inactive chat with a pending user message
    vi.mocked(useChatStore).mockReturnValue({
      currentChatId: '123',
      chats: [{
        id: '123',
        messages: [{ role: 'user', content: 'test message' }],
        isActive: false
      }],
      addMessage: mockAddMessage,
      activateChat: mockActivateChat
    });

    renderHook(() => useMessage());

    // Wait for the effect to process the pending message
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockAddMessage).toHaveBeenCalledWith({
      role: 'assistant',
      content: 'AI response'
    });
    expect(mockActivateChat).toHaveBeenCalledWith('123');
  });

  it('should not process messages in active chats', async () => {
    // Mock an active chat with a message
    vi.mocked(useChatStore).mockReturnValue({
      currentChatId: '123',
      chats: [{
        id: '123',
        messages: [{ role: 'user', content: 'test message' }],
        isActive: true
      }],
      addMessage: mockAddMessage,
      activateChat: mockActivateChat
    });

    renderHook(() => useMessage());

    // Wait for any potential effects
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockAddMessage).not.toHaveBeenCalled();
    expect(mockActivateChat).not.toHaveBeenCalled();
  });

  it('should handle sending new messages', async () => {
    const { result } = renderHook(() => useMessage());

    await act(async () => {
      const response = await result.current.handleSendMessage('new message');
      expect(response.success).toBe(true);
      expect(response.data).toBe('AI response');
    });

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockAddMessage).toHaveBeenCalledWith({
      role: 'assistant',
      content: 'AI response'
    });
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it('should maintain backwards compatibility with fetchMessage', async () => {
    const { result } = renderHook(() => useMessage());

    await act(async () => {
      const response = await result.current.fetchMessage('test message');
      expect(response.success).toBe(true);
      expect(response.data).toBe('AI response');
    });

    expect(mockAddMessage).toHaveBeenCalledWith({
      role: 'assistant',
      content: 'AI response'
    });
  });

  it('should handle sending a message successfully', async () => {
    const { result } = renderHook(() => useMessage());
    
    const message = 'Hello, world!';
    const response = await result.current.handleSendMessage(message);
    
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockAddMessage).toHaveBeenCalledWith({
      role: 'assistant',
      content: 'AI response'
    });
    expect(response.success).toBe(true);
    expect(response.data).toBe('AI response');
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it('should handle errors when no chat is active', async () => {
    vi.mocked(useChatStore).mockReturnValue({
      currentChatId: '',
      chats: [],
      addMessage: mockAddMessage
    });

    const { result } = renderHook(() => useMessage());
    
    const message = 'Hello, world!';
    const response = await result.current.handleSendMessage(message);
    
    expect(response.success).toBe(false);
    expect(response.error).toBe('No active chat');
    expect(mockAddMessage).not.toHaveBeenCalled();
  });

  it('should handle errors when no model is selected', async () => {
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM'
    });

    const { result } = renderHook(() => useMessage());
    
    const message = 'Hello, world!';
    const response = await result.current.handleSendMessage(message);
    
    expect(response.success).toBe(false);
    expect(response.error).toBe('No model selected');
    expect(mockAddMessage).not.toHaveBeenCalled();
  });
});