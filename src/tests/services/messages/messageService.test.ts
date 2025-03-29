import { describe, it, expect, vi } from 'vitest';
import { MessageService } from '@/services/messages/messageService';
import { Message } from '@/types/message';
import * as sendMessageModule from '@/services/post/sendMessage';

vi.mock('@/services/post/sendMessage');

describe('MessageService', () => {
  describe('validateMessageParams', () => {
    it('should return error when no chat is active', () => {
      const result = MessageService.validateMessageParams(null, 'gpt-4');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No active chat');
    });

    it('should return error when no model is selected', () => {
      const result = MessageService.validateMessageParams('chat-1', 'Modelos LLM');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No model selected');
    });

    it('should return success when params are valid', () => {
      const result = MessageService.validateMessageParams('chat-1', 'gpt-4');
      expect(result.success).toBe(true);
    });
  });

  describe('getRecentMessages', () => {
    it('should return last 10 messages', () => {
      const messages: Message[] = Array.from({ length: 15 }, (_, i) => ({
        role: 'user',
        content: `Message ${i + 1}`
      }));

      const result = MessageService.getRecentMessages(messages);
      expect(result).toHaveLength(10);
      expect(result[0].content).toBe('Message 6');
      expect(result[9].content).toBe('Message 15');
    });

    it('should return all messages if less than 10', () => {
      const messages: Message[] = Array.from({ length: 5 }, (_, i) => ({
        role: 'user',
        content: `Message ${i + 1}`
      }));

      const result = MessageService.getRecentMessages(messages);
      expect(result).toHaveLength(5);
    });
  });

  describe('prepareMessagesToSend', () => {
    it('should add new message to recent messages', () => {
      const recentMessages: Message[] = [
        { role: 'user', content: 'Message 1' }
      ];

      const result = MessageService.prepareMessagesToSend(recentMessages, 'New message');
      expect(result).toHaveLength(2);
      expect(result[1]).toEqual({
        role: 'user',
        content: 'New message'
      });
    });

    it('should return original messages if no new message', () => {
      const recentMessages: Message[] = [
        { role: 'user', content: 'Message 1' }
      ];

      const result = MessageService.prepareMessagesToSend(recentMessages);
      expect(result).toBe(recentMessages);
    });
  });

  describe('sendMessageToAPI', () => {
    it('should handle successful API response', async () => {
      const mockResponse = 'API Response';
      vi.mocked(sendMessageModule.sendMessage).mockResolvedValueOnce(mockResponse);

      const result = await MessageService.sendMessageToAPI({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Test' }]
      });

      expect(result.success).toBe(true);
      expect(result.data).toBe(mockResponse.trim());
    });

    it('should handle invalid API response', async () => {
      vi.mocked(sendMessageModule.sendMessage).mockResolvedValueOnce(undefined);

      const result = await MessageService.sendMessageToAPI({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Test' }]
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid response from API');
    });

    it('should handle API error', async () => {
      vi.mocked(sendMessageModule.sendMessage).mockRejectedValueOnce(new Error('API Error'));

      const result = await MessageService.sendMessageToAPI({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Test' }]
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Error sending message');
    });
  });
});
