import { describe, it, expect, beforeEach } from 'vitest';
import { useListModelStore } from '../../stores/listModel';
import { act } from '@testing-library/react';
import { openAIModels, mockModelOptions } from '@/tests/mocks/modelMocks';

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
      setSelectedModel('gpt-3.5-turbo');
    });
    
    const { selectedModel } = useListModelStore.getState();
    expect(selectedModel).toBe('gpt-3.5-turbo');
  });

  it('should update list models', () => {
    const { setListModels } = useListModelStore.getState();
    
    act(() => {
      setListModels(mockModelOptions);
    });
    
    const { listModels } = useListModelStore.getState();
    expect(listModels).toEqual(mockModelOptions);
    expect(listModels[0].options.length).toBe(2);
    expect(listModels[0].options[0].id).toBe('gpt-3.5-turbo');
  });
  
  it('should maintain state between selectors', () => {
    const { setSelectedModel, setListModels } = useListModelStore.getState();
    
    act(() => {
      setListModels(mockModelOptions);
      setSelectedModel(openAIModels[0].id);
    });
    
    const state = useListModelStore.getState();
    expect(state.selectedModel).toBe('gpt-3.5-turbo');
    expect(state.listModels).toEqual(mockModelOptions);
  });
});
