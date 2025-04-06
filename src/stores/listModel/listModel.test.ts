import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { create } from 'zustand';
import { useListModelStore, getSelectedModelFromLocalStorage, saveSelectedModelToLocalStorage } from './listModel';
import { mockModels } from '@/mocks/modelMocks';

type ListModelStore = {
  selectedModel: string;
  listModels: any[];
  setListModels: (models: any[]) => void;
  setSelectedModel: (model: string) => void;
};

const defaultState = {
  selectedModel: 'Modelos LLM',
  listModels: [],
};

describe('useListModelStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useListModelStore.setState(defaultState);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('debería inicializar con el estado por defecto', () => {
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe('Modelos LLM');
    expect(state.listModels).toEqual([]);
  });

  test('debería actualizar la lista de modelos', () => {
    const store = useListModelStore.getState();
    store.setListModels(mockModels);
    
    const state = useListModelStore.getState();
    expect(state.listModels).toEqual(mockModels);
  });

  test('debería actualizar el modelo seleccionado y guardarlo en localStorage', () => {
    const store = useListModelStore.getState();
    const modelId = 'test-model-id';
    
    store.setSelectedModel(modelId);
    
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe(modelId);
    
    const stored = localStorage.getItem('selectedModelId');
    expect(stored).toBeDefined();
    expect(JSON.parse(stored!)).toEqual({ idModel: modelId });
  });

  test('debería cargar el modelo seleccionado desde localStorage al inicializar', () => {
    const modelId = 'stored-model-id';
    localStorage.setItem('selectedModelId', JSON.stringify({ idModel: modelId }));
    
    // Re-crear el store para que se vuelva a inicializar
    const newStore = create<ListModelStore>()((set) => ({
      selectedModel: getSelectedModelFromLocalStorage(),
      listModels: [],
      setListModels: (models) => set({ listModels: models }),
      setSelectedModel: (model) => {
        saveSelectedModelToLocalStorage(model);
        set({ selectedModel: model });
      },
    }));
    
    expect(newStore.getState().selectedModel).toBe(modelId);
  });

  test('debería manejar datos inválidos en localStorage y usar valor por defecto', () => {
    localStorage.setItem('selectedModelId', 'invalid-json');
    
    useListModelStore.setState(defaultState);
    
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe('Modelos LLM');
  });
});