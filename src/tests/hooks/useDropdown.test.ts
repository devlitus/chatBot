import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDropdown } from '@/hooks/useDropdown';
import { getListModels } from '@/services/get/getListModels';
import { getModelOptionsMock } from '@/tests/mocks/modelsMockFactory';
import { useListModelStore } from '@/stores/listModel';

// Mock modules
vi.mock('@/services/get/getListModels');
vi.mock('@/stores/listModel');

describe('useDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock store defaults
    vi.mocked(useListModelStore).mockReturnValue({
      listModels: [],
      setListModels: vi.fn(),
      selectedModel: 'Modelos LLM',
      setSelectedModel: vi.fn()
    });
  });

  it('debería devolver listModels vacío inicialmente', () => {
    const { result } = renderHook(() => useDropdown());
    expect(result.current.listModels).toEqual([]);
  });

  it('debería obtener y establecer los modelos correctamente al llamar fetchModels', async () => {
    const mockModels = getModelOptionsMock();
    const mockSetListModels = vi.fn();
    
    vi.mocked(useListModelStore).mockReturnValue({
      listModels: [],
      setListModels: mockSetListModels,
      selectedModel: 'Modelos LLM',
      setSelectedModel: vi.fn()
    });
    
    vi.mocked(getListModels).mockResolvedValue(mockModels);

    const { result } = renderHook(() => useDropdown());
    
    await act(async () => {
      await result.current.fetchModels();
    });

    expect(getListModels).toHaveBeenCalled();
    expect(mockSetListModels).toHaveBeenCalledWith(mockModels);
  });

  it('debería manejar errores en fetchModels', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const mockSetListModels = vi.fn();
    
    vi.mocked(useListModelStore).mockReturnValue({
      listModels: [],
      setListModels: mockSetListModels,
      selectedModel: 'Modelos LLM',
      setSelectedModel: vi.fn()
    });
    
    vi.mocked(getListModels).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useDropdown());
    
    await act(async () => {
      await result.current.fetchModels();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching models:', expect.any(Error));
    expect(mockSetListModels).not.toHaveBeenCalled();
  });
});