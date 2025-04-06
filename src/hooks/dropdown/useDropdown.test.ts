import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDropdown } from './useDropdown';
import * as getListModelsModule from '@/services/get/getListModels';
import { useListModelStore } from '@/stores/listModel/listModel';
import { mockModels } from '@/mocks/modelMocks';

vi.mock('@/services/get/getListModels');

describe('useDropdown', () => {
  

  beforeEach(() => {
    vi.clearAllMocks();
    useListModelStore.setState({ listModels: [], selectedModel: 'Modelos LLM' });
  });

  test('debería inicializar con una lista de modelos vacía', () => {
    const { result } = renderHook(() => useDropdown());
    expect(result.current.listModels).toEqual([]);
  });

  test('debería actualizar la lista de modelos al llamar fetchModels', async () => {
    vi.spyOn(getListModelsModule, 'getListModels').mockResolvedValue(mockModels);

    const { result } = renderHook(() => useDropdown());

    await act(async () => {
      await result.current.fetchModels();
    });

    expect(result.current.listModels).toEqual(mockModels);
  });

  test('debería manejar errores al llamar fetchModels', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(getListModelsModule, 'getListModels').mockRejectedValue(new Error('Error de prueba'));

    const { result } = renderHook(() => useDropdown());

    await act(async () => {
      await result.current.fetchModels();
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.listModels).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  test('no debería actualizar los modelos si la respuesta está vacía', async () => {
    vi.spyOn(getListModelsModule, 'getListModels').mockResolvedValue([]);

    const { result } = renderHook(() => useDropdown());

    await act(async () => {
      await result.current.fetchModels();
    });

    expect(result.current.listModels).toEqual([]);
  });
});