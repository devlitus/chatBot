import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getListModels } from './getListModels';
import { mockModels } from '@/mocks/modelMocks';
import * as modelTransformers from '../models/modelTransformers';

describe('getListModels', () => {
  const mockApiResponse = {
    data: [
      {
        id: 'model-1',
        object: 'model',
        created: 1234567890,
        owned_by: 'test-company'
      }
    ]
  };

  beforeEach(() => {
    // Restaurar todos los mocks antes de cada test
    vi.clearAllMocks();
    
    // Mock de la función global fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    // Mock de la función transformToModelOptions
    vi.spyOn(modelTransformers, 'transformToModelOptions').mockReturnValue(mockModels);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe devolver una lista de modelos transformada correctamente', async () => {
    const result = await getListModels();
    
    expect(global.fetch).toHaveBeenCalled();
    expect(modelTransformers.transformToModelOptions).toHaveBeenCalledWith(mockApiResponse.data);
    expect(result).toEqual(mockModels);
  });

  it('debe manejar errores de la API correctamente', async () => {
    // Simular un error en la API
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    const result = await getListModels();
    
    expect(result).toEqual([]);
  });

  it('debe manejar errores de red correctamente', async () => {
    // Simular un error de red
    global.fetch = vi.fn().mockRejectedValue(new Error('Error de red'));

    const result = await getListModels();
    
    expect(result).toEqual([]);
  });
});