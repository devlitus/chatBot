import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useMessage } from '@/hooks/useMessage';
import { useChatStore } from '@/stores/chat';
import { useListModelStore } from '@/stores/listModel';
import { useMessageStore } from '@/stores/message';

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
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock store implementations
    vi.mocked(useChatStore).mockReturnValue({
      currentChatId: '123',
      chats: [{
        id: '123',
        messages: []
      }],
      addMessage: mockAddMessage
    });
    
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'gpt-3.5-turbo'
    });

    vi.mocked(useMessageStore).mockReturnValue({
      setIsLoading: mockSetIsLoading,
      isLoading: false
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