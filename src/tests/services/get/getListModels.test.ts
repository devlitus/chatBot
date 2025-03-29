import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getListModels } from '@/services/get/getListModels';
import { GROQ_API_KEY, GROQ_URL_MODELS } from '@/constants';
import { mockModelResponse } from '@/tests/mocks/modelMocks';
import { ModelResponse } from '@/types/modelResponse';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('getListModels', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    console.error = vi.fn(); // Mock console.error
    console.log = vi.fn(); // Mock console.log
  });

  it('should fetch and group models by company', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockModelResponse)
    });

    const result = await getListModels();

    expect(mockFetch).toHaveBeenCalledWith(GROQ_URL_MODELS, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
    });

    expect(result).toHaveLength(2); // Two companies
    expect(result[0].label).toBe('Company1');
    expect(result[1].label).toBe('Company2');
    expect(result[0].options).toHaveLength(2); // Two models for company1
    expect(result[1].options).toHaveLength(2); // Two models for company2
  });

  it('should handle empty response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: [] })
    });

    const result = await getListModels();
    expect(result).toEqual([]);
  });

  it('should handle invalid API response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: 'invalid' })
    });

    const result = await getListModels();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle API error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const result = await getListModels();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should sort models by ID within each company', async () => {
    const unsortedModels: ModelResponse[] = [
      { id: 'b-model', owned_by: 'company1', object: 'model', created: 1, active: true, context_window: 4096, public_apps: null },
      { id: 'a-model', owned_by: 'company1', object: 'model', created: 2, active: true, context_window: 4096, public_apps: null },
    ];

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: unsortedModels })
    });

    const result = await getListModels();
    const companyModels = result[0].options;
    
    expect(companyModels[0].id).toBe('a-model');
    expect(companyModels[1].id).toBe('b-model');
  });

  it('should sort companies alphabetically', async () => {
    const companiesModels: ModelResponse[] = [
      { id: 'model1', owned_by: 'company-b', object: 'model', created: 1, active: true, context_window: 4096, public_apps: null },
      { id: 'model2', owned_by: 'company-a', object: 'model', created: 2, active: true, context_window: 4096, public_apps: null },
    ];

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: companiesModels })
    });

    const result = await getListModels();
    expect(result[0].label).toBe('Company-a');
    expect(result[1].label).toBe('Company-b');
  });

  it('should handle case-insensitive company grouping', async () => {
    const mixedCaseModels: ModelResponse[] = [
      { id: 'model1', owned_by: 'Company1', object: 'model', created: 1, active: true, context_window: 4096, public_apps: null },
      { id: 'model2', owned_by: 'COMPANY1', object: 'model', created: 2, active: true, context_window: 4096, public_apps: null },
      { id: 'model3', owned_by: 'company1', object: 'model', created: 3, active: true, context_window: 4096, public_apps: null },
    ];

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: mixedCaseModels })
    });

    const result = await getListModels();
    expect(result).toHaveLength(1); // Should group all into one company
    expect(result[0].options).toHaveLength(3); // All three models
  });
});