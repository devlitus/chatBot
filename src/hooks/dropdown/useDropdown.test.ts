import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDropdown } from './useDropdown';
import { useListModelStore } from '@/stores/listModel/listModel';
import { mockModelsList } from '@/mocks/modelResponseMock';

describe('useDropdown', () => {
  beforeEach(() => {
    useListModelStore.setState({
      listModels: mockModelsList,
      selectedModel: '',
      isLoading: false,
      error: null
    });
  });

  it('debería organizar los modelos por compañía correctamente', () => {
    const { result } = renderHook(() => useDropdown());

    expect(result.current.organizedModels).toHaveLength(3); // groq, openai, sdaia
    
    // Verificar estructura del resultado
    expect(result.current.organizedModels[0]).toHaveProperty('label');
    expect(result.current.organizedModels[0]).toHaveProperty('options');
    
    // Verificar que los modelos están agrupados correctamente
    const groqGroup = result.current.organizedModels.find(
      group => group.label === 'GROQ'
    );
    const openaiGroup = result.current.organizedModels.find(
      group => group.label === 'OpenAI'
    );

    expect(groqGroup?.options).toHaveLength(1);
    expect(openaiGroup?.options).toHaveLength(1);
    
    // Verificar que los modelos mantienen sus propiedades
    expect(groqGroup?.options[0]).toEqual(
      expect.objectContaining({
        id: 'model-1',
        ownedBy: 'groq'
      })
    );
  });

  it('debería manejar una lista vacía de modelos', () => {
    useListModelStore.setState({
      listModels: [],
      selectedModel: '',
      isLoading: false,
      error: null
    });

    const { result } = renderHook(() => useDropdown());

    expect(result.current.organizedModels).toHaveLength(0);
  });
});