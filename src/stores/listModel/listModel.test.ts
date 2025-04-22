import { describe, test, expect, beforeEach, vi } from 'vitest';
import { useListModelStore } from './listModel';
import { mockModelsList } from '@/mocks/modelResponseMock';
import * as getListModelsModule from '@/services/get/getListModels';

vi.mock('@/services/get/getListModels');

describe('useListModelStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useListModelStore.setState({
      selectedModel: 'Modelos LLM',
      listModels: [],
      isLoading: false,
      error: null
    });
  });

  test('debería inicializar con el estado por defecto', () => {
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe('Modelos LLM');
    expect(state.listModels).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('debería actualizar el modelo seleccionado', () => {
    const store = useListModelStore.getState();
    const modelId = 'test-model-id';
    
    store.setSelectedModel(modelId);
    
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe(modelId);
  });

  test('debería cargar la lista de modelos correctamente', async () => {
    vi.spyOn(getListModelsModule, 'fetchModels').mockResolvedValue(mockModelsList);
    
    const store = useListModelStore.getState();
    await store.fetchModels();
    
    const state = useListModelStore.getState();
    expect(state.listModels).toEqual(mockModelsList);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('debería manejar errores al cargar los modelos', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(getListModelsModule, 'fetchModels').mockRejectedValue(new Error('Test error'));
    
    const store = useListModelStore.getState();
    await store.fetchModels();
    
    const state = useListModelStore.getState();
    expect(state.listModels).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error al cargar los modelos');
    
    consoleErrorSpy.mockRestore();
  });

  test('debería establecer isLoading en true durante la carga', async () => {
    vi.spyOn(getListModelsModule, 'fetchModels').mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockModelsList), 100))
    );
    
    const store = useListModelStore.getState();
    const fetchPromise = store.fetchModels();
    
    const loadingState = useListModelStore.getState();
    expect(loadingState.isLoading).toBe(true);
    
    await fetchPromise;
    
    const finalState = useListModelStore.getState();
    expect(finalState.isLoading).toBe(false);
  });

  test('debería limpiar el error previo al cargar nuevamente', async () => {
    const store = useListModelStore.getState();
    
    // Primero generamos un error
    vi.spyOn(getListModelsModule, 'fetchModels').mockRejectedValueOnce(new Error('Error inicial'));
    await store.fetchModels();
    expect(useListModelStore.getState().error).toBe('Error al cargar los modelos');
    
    // Luego hacemos una carga exitosa
    vi.spyOn(getListModelsModule, 'fetchModels').mockResolvedValueOnce(mockModelsList);
    await store.fetchModels();
    
    const state = useListModelStore.getState();
    expect(state.error).toBeNull();
  });

  test('debería mantener el modelo seleccionado después de recargar la lista', async () => {
    const store = useListModelStore.getState();
    const selectedModelId = 'test-model-id';
    
    store.setSelectedModel(selectedModelId);
    vi.spyOn(getListModelsModule, 'fetchModels').mockResolvedValue(mockModelsList);
    
    await store.fetchModels();
    
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe(selectedModelId);
  });
});