import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMessage } from '@/services/post/sendMessage';
import { GROQ_API_KEY, GROQ_URL_COMPLETION } from '@/constants';
import {
  mockModel,
  mockMessages,
  mockResponse,
  mockEmptyResponse,
  mockMalformedResponse
} from '@/tests/mocks/chatMocks';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('sendMessage', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    console.error = vi.fn();
    console.log = vi.fn();
  });

  it('should send message and return response content', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    const result = await sendMessage({ model: mockModel, messages: mockMessages });

    // Verify API call
    expect(mockFetch).toHaveBeenCalledWith(GROQ_URL_COMPLETION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: mockModel,
        messages: mockMessages
      })
    });

    // Verify response mapping
    expect(result).toBe('Test response');
  });

  it('should throw error when API call fails', async () => {
    const error = new Error('API Error');
    mockFetch.mockRejectedValueOnce(error);

    await expect(sendMessage({ model: mockModel, messages: mockMessages }))
      .rejects.toThrow('API Error');
    
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('should throw error when response has no choices', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockEmptyResponse)
    });

    await expect(sendMessage({ model: mockModel, messages: mockMessages }))
      .rejects.toThrow('No response choices available');
  });

  it('should throw error when response is malformed', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockMalformedResponse)
    });

    await expect(sendMessage({ model: mockModel, messages: mockMessages }))
      .rejects.toThrow();
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(sendMessage({ model: mockModel, messages: mockMessages }))
      .rejects.toThrow('Network error');
  });
});