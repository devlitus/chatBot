import { describe, test, expect, vi, beforeEach } from 'vitest';
import { sendMessage } from './sendMessage';
import { ChatResponse } from '@/types/chatResponse';
import { mockResponse } from '@/mocks/modelResponseMock';

describe('sendMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock de fetch global
    global.fetch = vi.fn();
  });

  test('debería enviar un mensaje correctamente', async () => {
    
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse) as Promise<ChatResponse>
    } as Response);

    const result = await sendMessage({
      model: 'test-model',
      messages: [{ role: 'user', content: 'Hola' }]
    });

    expect(result).toBe('Respuesta de prueba');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.stringContaining('Bearer')
        },
        body: JSON.stringify({
          model: 'test-model',
          messages: [{ role: 'user', content: 'Hola' }]
        })
      })
    );
  });

  test('debería manejar errores de la API', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    await expect(sendMessage({
      model: 'test-model',
      messages: [{ role: 'user', content: 'Hola' }]
    })).rejects.toThrow('Error en la API: 500');
  });

  test('debería manejar respuestas sin choices', async () => {
    const mockInvalidResponse = {
      id: 'test-id',
      choices: []
    };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockInvalidResponse)
    } as Response);

    await expect(sendMessage({
      model: 'test-model',
      messages: [{ role: 'user', content: 'Hola' }]
    })).rejects.toThrow('No response choices available');
  });

  test('debería manejar errores de red', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    await expect(sendMessage({
      model: 'test-model',
      messages: [{ role: 'user', content: 'Hola' }]
    })).rejects.toThrow('Network error');
  });
});