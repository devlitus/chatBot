import { describe, test, expect } from 'vitest';
import { filterModelsByCompany, groupModelsByCompany, getCompanyDisplayName, sortModelsById, sortByLabel, transformToModelOptions } from './modelTransformers';
import { ModelOption } from '@/types/modelOptions';
import { mockModelsList } from '@/mocks/modelResponseMock';

describe('modelTransformers', () => {


  describe('filterModelsByCompany', () => {
    test('debería filtrar las compañías excluidas', () => {
      const filtered = filterModelsByCompany(mockModelsList);
      expect(filtered).toHaveLength(2);
      expect(filtered.map(m => m.owned_by)).not.toContain('sdaia');
    });

    test('debería mantener las compañías no excluidas', () => {
      const filtered = filterModelsByCompany(mockModelsList);
      expect(filtered.map(m => m.owned_by)).toContain('groq');
      expect(filtered.map(m => m.owned_by)).toContain('openai');
    });
  });

  describe('groupModelsByCompany', () => {
    test('debería agrupar modelos por compañía', () => {
      const grouped = groupModelsByCompany(mockModelsList);
      expect(Object.keys(grouped)).toHaveLength(3);
      expect(grouped['groq']).toHaveLength(1);
      expect(grouped['openai']).toHaveLength(1);
    });

    test('debería convertir los nombres de compañías a minúsculas', () => {
      const modelsWithMixedCase = [
        { ...mockModelsList[0], owned_by: 'GROQ' },
        { ...mockModelsList[1], owned_by: 'OpenAI' }
      ];
      const grouped = groupModelsByCompany(modelsWithMixedCase);
      expect(Object.keys(grouped)).toContain('groq');
      expect(Object.keys(grouped)).toContain('openai');
    });
  });

  describe('getCompanyDisplayName', () => {
    test('debería usar el nombre predefinido si existe', () => {
      expect(getCompanyDisplayName('groq')).toBe('GROQ');
      expect(getCompanyDisplayName('openai')).toBe('OpenAI');
    });

    test('debería capitalizar la primera letra si no hay nombre predefinido', () => {
      expect(getCompanyDisplayName('test')).toBe('Test');
    });
  });

  describe('sortModelsById', () => {
    test('debería ordenar modelos por ID', () => {
      const unordered = [
        { ...mockModelsList[1] },
        { ...mockModelsList[0] }
      ];
      const sorted = sortModelsById(unordered);
      expect(sorted[0].id).toBe('model-1');
      expect(sorted[1].id).toBe('model-2');
    });
  });

  describe('sortByLabel', () => {
    test('debería ordenar opciones por etiqueta', () => {
      const options: ModelOption[] = [
        { label: 'B Company', options: [] },
        { label: 'A Company', options: [] }
      ];
      expect(sortByLabel(options[0], options[1])).toBeGreaterThan(0);
      expect(sortByLabel(options[1], options[0])).toBeLessThan(0);
    });
  });

  describe('transformToModelOptions', () => {
    test('debería transformar modelos en opciones agrupadas', () => {
      const options = transformToModelOptions(mockModelsList);
      expect(options).toHaveLength(2); // Solo 2 porque uno está excluido
      expect(options[0].label).toBe('GROQ');
      expect(options[1].label).toBe('OpenAI');
    });

    test('debería devolver array vacío si no hay modelos', () => {
      const options = transformToModelOptions([]);
      expect(options).toHaveLength(0);
    });

    test('debería ordenar las opciones alfabéticamente', () => {
      const options = transformToModelOptions(mockModelsList);
      expect(options[0].label.localeCompare(options[1].label)).toBeLessThan(0);
    });
  });
});