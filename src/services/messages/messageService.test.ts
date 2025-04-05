import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MessageService } from './messageService';
import { sendMessage } from '../post/sendMessage';
import { Message } from '@/types/message';

// Mock del módulo sendMessage
vi.mock('../post/sendMessage', () => ({
  sendMessage: vi.fn()
}));

describe('MessageService', () => {
  describe('validateMessageParams', () => {
    test('debería devolver error cuando no hay chat activo', () => {
      const result = MessageService.validateMessageParams(null, 'test-model');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No active chat');
    });

    test('debería devolver error cuando no hay modelo seleccionado', () => {
      const result = MessageService.validateMessageParams('chat-id', 'Modelos LLM');
      expect(result.success).toBe(false);
      expect(result.error).toBe('No model selected');
    });

    test('debería devolver éxito cuando los parámetros son válidos', () => {
      const result = MessageService.validateMessageParams('chat-id', 'valid-model');
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('getRecentMessages', () => {
    test('debería limitar los mensajes al máximo establecido', () => {
      const messages: Message[] = Array.from({ length: 15 }, (_, i) => ({
        role: 'user',
        content: `Mensaje ${i + 1}`
      }));

      const result = MessageService.getRecentMessages(messages);
      expect(result).toHaveLength(10);
      expect(result[0].content).toBe('Mensaje 6');
      expect(result[9].content).toBe('Mensaje 15');
    });

    test('debería devolver todos los mensajes si hay menos del máximo', () => {
      const messages: Message[] = Array.from({ length: 5 }, (_, i) => ({
        role: 'user',
        content: `Mensaje ${i + 1}`
      }));

      const result = MessageService.getRecentMessages(messages);
      expect(result).toHaveLength(5);
    });
  });

  describe('prepareMessagesToSend', () => {
    test('debería agregar el mensaje actual a los mensajes recientes', () => {
      const recentMessages: Message[] = [
        { role: 'user', content: 'Mensaje anterior' }
      ];
      const currentMessage = 'Nuevo mensaje';

      const result = MessageService.prepareMessagesToSend(recentMessages, currentMessage);
      expect(result).toHaveLength(2);
      expect(result[1]).toEqual({ role: 'user', content: currentMessage });
    });

    test('debería devolver solo los mensajes recientes si no hay mensaje actual', () => {
      const recentMessages: Message[] = [
        { role: 'user', content: 'Mensaje anterior' }
      ];

      const result = MessageService.prepareMessagesToSend(recentMessages);
      expect(result).toHaveLength(1);
      expect(result).toEqual(recentMessages);
    });
  });

  describe('sendMessageToAPI', () => {
    const mockParams = {
      model: 'test-model',
      messages: [{ role: 'user' as const, content: 'test message' }]
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    test('debería manejar una respuesta exitosa', async () => {
      (sendMessage as any ).mockResolvedValue('Respuesta exitosa');

      const result = await MessageService.sendMessageToAPI(mockParams);
      expect(result.success).toBe(true);
      expect(result.data).toBe('Respuesta exitosa');
    });

    test('debería manejar una respuesta inválida', async () => {
      (sendMessage as any).mockResolvedValue(null);

      const result = await MessageService.sendMessageToAPI(mockParams);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid response from API');
    });

    test('debería manejar errores de la API', async () => {
      (sendMessage as any).mockRejectedValue(new Error('Error de API'));

      const result = await MessageService.sendMessageToAPI(mockParams);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Error sending message');
    });
  });
});