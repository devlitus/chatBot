import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMessage } from '@/hooks/useMessage';
import { MessageService } from '@/services/messages/messageService';

// Mock de los stores
vi.mock('@/stores/chat', () => ({
  useChatStore: vi.fn(() => ({
    currentChatId: 'chat-1',
    addMessage: vi.fn(),
    chats: [
      {
        id: 'chat-1',
        isActive: true,
        messages: [
          { role: 'user', content: 'Test message' }
        ]
      }
    ],
    activateChat: vi.fn()
  }))
}));

vi.mock('@/stores/listModel', () => ({
  useListModelStore: vi.fn(() => ({
    selectedModel: 'gpt-4'
  }))
}));

vi.mock('@/stores/message', () => ({
  useMessageStore: vi.fn(() => ({
    setIsLoading: vi.fn(),
    isLoading: false
  }))
}));

// Mock del MessageService
vi.mock('@/services/messages/messageService', () => ({
  MessageService: {
    validateMessageParams: vi.fn(),
    getRecentMessages: vi.fn(),
    prepareMessagesToSend: vi.fn(),
    sendMessageToAPI: vi.fn()
  }
}));

describe('useMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleSendMessage', () => {
    it('should handle successful message sending', async () => {
      // Mock setup
      vi.mocked(MessageService.validateMessageParams).mockReturnValue({ success: true });
      vi.mocked(MessageService.getRecentMessages).mockReturnValue([]);
      vi.mocked(MessageService.prepareMessagesToSend).mockReturnValue([
        { role: 'user', content: 'Test' }
      ]);
      vi.mocked(MessageService.sendMessageToAPI).mockResolvedValue({
        success: true,
        data: 'API Response'
      });

      const { result } = renderHook(() => useMessage());

      // Execute
      const response = await act(async () => {
        return await result.current.handleSendMessage('Test message');
      });

      // Verify
      expect(response.success).toBe(true);
      expect(response.data).toBe('API Response');
    });

    it('should handle validation failure', async () => {
      // Mock setup
      vi.mocked(MessageService.validateMessageParams).mockReturnValue({
        success: false,
        error: 'Validation error'
      });

      const { result } = renderHook(() => useMessage());

      // Execute
      const response = await act(async () => {
        return await result.current.handleSendMessage('Test message');
      });

      // Verify
      expect(response.success).toBe(false);
      expect(response.error).toBe('Validation error');
    });

    it('should handle API error', async () => {
      // Mock setup
      vi.mocked(MessageService.validateMessageParams).mockReturnValue({ success: true });
      vi.mocked(MessageService.sendMessageToAPI).mockResolvedValue({
        success: false,
        error: 'API error'
      });

      const { result } = renderHook(() => useMessage());

      // Execute
      const response = await act(async () => {
        return await result.current.handleSendMessage('Test message');
      });

      // Verify
      expect(response.success).toBe(false);
      expect(response.error).toBe('API error');
    });
  });

  describe('fetchMessage', () => {
    it('should return null for inactive chat', async () => {
      // Mock setup with inactive chat
      const mockUseChatStore = vi.fn(() => ({
        currentChatId: 'chat-1',
        chats: [
          {
            id: 'chat-1',
            isActive: false,
            messages: []
          }
        ]
      }));

      vi.mock('@/stores/chat', () => ({
        useChatStore: mockUseChatStore
      }));

      const { result } = renderHook(() => useMessage());

      // Execute
      const response = await result.current.fetchMessage('Test message');

      // Verify
      expect(response.success).toBe(true);
      expect(response.data).toBeNull();
    });

    it('should forward message to handleSendMessage for active chat', async () => {
      const { result } = renderHook(() => useMessage());
      const mockResponse = { success: true, data: 'Response' };
      
      vi.mocked(MessageService.validateMessageParams).mockReturnValue({ success: true });
      vi.mocked(MessageService.sendMessageToAPI).mockResolvedValue(mockResponse);

      // Execute
      const response = await result.current.fetchMessage('Test message');

      // Verify
      expect(response.success).toBe(true);
      expect(response.data).toBe('Response');
    });
  });
});