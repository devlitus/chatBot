import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMessage } from '@/services/post/sendMessage';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('sendMessage', () => {
  const mockModel = 'gpt-4';
  const mockMessages = [{ role: 'user', content: 'Test message' }];

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should send message successfully', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Test response'
          }
        }
      ]
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await sendMessage({ model: mockModel, messages: mockMessages });
    expect(result).toBe('Test response');
  });

  it('should throw error when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    await expect(sendMessage({ model: mockModel, messages: mockMessages }))
      .rejects.toThrow('Error en la API: 500');
  });

  it('should throw error when response has no choices', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({})
    });

    await expect(sendMessage({ model: mockModel, messages: mockMessages }))
      .rejects.toThrow('No response choices available');
  });
});