import { describe, it, expect, beforeEach } from 'vitest';
import { useListModelStore } from '../../stores/listModel';
import { act } from '@testing-library/react';
import { mockModelOptions } from '@/tests/mocks/modelMocks';

// Limpiar el store entre pruebas
const cleanupStore = () => {
  const { setListModels, setSelectedModel } = useListModelStore.getState();
  setListModels([]);
  setSelectedModel('Modelos LLM');
};

describe('useListModelStore', () => {
  beforeEach(() => {
    cleanupStore();
  });

  it('should initialize with default values', () => {
    const { selectedModel, listModels } = useListModelStore.getState();
    expect(selectedModel).toBe('Modelos LLM');
    expect(listModels).toEqual([]);
  });

  it('should update selected model', () => {
    const { setSelectedModel } = useListModelStore.getState();
    
    act(() => {
      setSelectedModel('model1');
    });
    
    const { selectedModel } = useListModelStore.getState();
    expect(selectedModel).toBe('model1');
  });

  it('should update list models', () => {
    const { setListModels } = useListModelStore.getState();
    
    act(() => {
      setListModels(mockModelOptions);
    });
    
    const { listModels } = useListModelStore.getState();
    expect(listModels).toEqual(mockModelOptions);
    expect(listModels[0].options.length).toBe(2);
    expect(listModels[0].options[0].id).toBe('model1');
  });
  
  it('should maintain state between selectors', () => {
    const { setSelectedModel, setListModels } = useListModelStore.getState();
    
    act(() => {
      setListModels(mockModelOptions);
      setSelectedModel('model1');
    });
    
    const store = useListModelStore.getState();
    expect(store.selectedModel).toBe('model1');
    expect(store.listModels).toEqual(mockModelOptions);
  });
});
