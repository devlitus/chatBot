import { describe, it, expect } from 'vitest';
import { 
  filterModelsByCompany,
  groupModelsByCompany,
  sortModelsById,
  sortByLabel,
  transformToModelOptions
} from '@/services/models/modelTransformers';
import { ModelResponse } from '@/types/modelResponse';
import { ModelOption } from '@/types/modelOptions';

describe('Model Transformers', () => {
  const mockModels: ModelResponse[] = [
    { id: 'model2', owned_by: 'OpenAI', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model1', owned_by: 'OpenAI', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model3', owned_by: 'Anthropic', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model4', owned_by: 'SDAIA', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
    { id: 'model5', owned_by: 'PlayAI', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
  ];

  describe('filterModelsByCompany', () => {
    it('should filter out SDAIA and PlayAI models', () => {
      const filtered = filterModelsByCompany(mockModels);
      expect(filtered).toHaveLength(3);
      expect(filtered.every(model => 
        !model.owned_by.toLowerCase().includes('sdaia') && 
        !model.owned_by.toLowerCase().includes('playai')
      )).toBe(true);
    });
  });

  describe('groupModelsByCompany', () => {
    it('should group models by company', () => {
      const filtered = filterModelsByCompany(mockModels);
      const grouped = groupModelsByCompany(filtered);
      
      expect(Object.keys(grouped)).toHaveLength(2);
      expect(grouped['openai']).toHaveLength(2);
      expect(grouped['anthropic']).toHaveLength(1);
    });
  });

  describe('sortModelsById', () => {
    it('should sort models by ID', () => {
      const models: ModelResponse[] = [
        { id: 'b', owned_by: 'Company', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
        { id: 'a', owned_by: 'Company', created: 0, object: 'model', active: true, context_window: 4096, public_apps: null },
      ];
      
      const sorted = sortModelsById(models);
      expect(sorted[0].id).toBe('a');
      expect(sorted[1].id).toBe('b');
    });
  });

  describe('sortByLabel', () => {
    it('should sort options by label', () => {
      const options: ModelOption[] = [
        { label: 'B', options: [] },
        { label: 'A', options: [] },
      ];
      
      const sorted = [...options].sort(sortByLabel);
      expect(sorted[0].label).toBe('A');
      expect(sorted[1].label).toBe('B');
    });
  });

  describe('transformToModelOptions', () => {
    it('should transform models to grouped and sorted options', () => {
      const result = transformToModelOptions(mockModels);
      
      expect(result).toHaveLength(2);
      expect(result[0].label).toBe('Anthropic');
      expect(result[1].label).toBe('OpenAI');
      expect(result[1].options).toHaveLength(2);
      expect(result[1].options[0].id).toBe('model1');
    });

    it('should return empty array for empty input', () => {
      const result = transformToModelOptions([]);
      expect(result).toEqual([]);
    });
  });
});
