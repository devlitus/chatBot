import { describe, it, expect, beforeEach } from 'vitest';
import { useListModelStore } from '../../stores/listModel';
import { act } from '@testing-library/react';
import { ModelOption } from '@/types/modelOtions';
import { ModelResponse } from '@/types/modelResponse';

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
    
    // Crear modelos de prueba con la estructura correcta
    const openAIModels: ModelResponse[] = [
      {
        id: 'gpt-3.5-turbo',
        object: 'model',
        owned_by: 'openai',
        created: 1677610602,
        active: true,
        context_window: 16000,
        public_apps: null
      },
      {
        id: 'gpt-4',
        object: 'model',
        owned_by: 'openai',
        created: 1687882411,
        active: true,
        context_window: 32000,
        public_apps: null
      }
    ];
    
    const mockModels: ModelOption[] = [
      {
        label: 'OpenAI',
        options: openAIModels
      }
    ];
    
    act(() => {
      setListModels(mockModels);
    });
    
    const { listModels } = useListModelStore.getState();
    expect(listModels).toEqual(mockModels);
    expect(listModels[0].options.length).toBe(2);
    expect(listModels[0].options[0].id).toBe('gpt-3.5-turbo');
  });
  
  it('should maintain state between selectors', () => {
    const { setSelectedModel, setListModels } = useListModelStore.getState();
    const openAIModels: ModelResponse[] = [
      {
        id: 'gpt-3.5-turbo',
        object: 'model',
        owned_by: 'openai',
        created: 1677610602,
        active: true,
        context_window: 16000,
        public_apps: null
      }
    ];
    
    const mockModels: ModelOption[] = [
      {
        label: 'OpenAI',
        options: openAIModels
      }
    ];
    
    act(() => {
      setListModels(mockModels);
      setSelectedModel('gpt-3.5-turbo');
    });
    
    const { selectedModel, listModels } = useListModelStore.getState();
    expect(selectedModel).toBe('gpt-3.5-turbo');
    expect(listModels).toEqual(mockModels);
  });
});
