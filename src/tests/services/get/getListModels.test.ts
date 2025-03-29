import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getListModels } from '@/services/get/getListModels';
import { GROQ_URL_MODELS } from '@/constants';
import { ModelResponse } from '@/types/modelResponse';

// Mock fetch
global.fetch = vi.fn();

describe('getListModels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockModels: ModelResponse[] = [
    { id: 'model1', owned_by: 'OpenAI', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model2', owned_by: 'OpenAI', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model3', owned_by: 'Anthropic', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model4', owned_by: 'SDAIA', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model5', owned_by: 'PlayAI', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
  ];

  it('should fetch and transform models successfully', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockModels })
    });

    const result = await getListModels();

    expect(fetch).toHaveBeenCalledWith(GROQ_URL_MODELS, expect.any(Object));
    expect(result).toHaveLength(2); // Solo OpenAI y Anthropic
    expect(result[0].label).toBe('Anthropic');
    expect(result[1].label).toBe('OpenAI');
  });

  it('should handle API errors gracefully', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('API Error'));
    const result = await getListModels();
    expect(result).toEqual([]);
  });

  it('should handle non-OK API responses', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const result = await getListModels();
    expect(result).toEqual([]);
  });

  it('should handle invalid API response format', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'invalid' })
    });

    const result = await getListModels();
    expect(result).toEqual([]);
  });
});