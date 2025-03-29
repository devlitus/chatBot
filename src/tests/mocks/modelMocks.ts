import { vi } from 'vitest';
import type { ModelResponse } from '@/types/modelResponse';
import type { ModelOption } from '@/types/modelOptions';

// Test models with specific company names for tests
export const mockModels: ModelResponse[] = [
  { id: 'model1', owned_by: 'company1', object: 'model', created: 1, active: true, context_window: 4096, public_apps: null },
  { id: 'model2', owned_by: 'company1', object: 'model', created: 2, active: true, context_window: 4096, public_apps: null },
  { id: 'model3', owned_by: 'company2', object: 'model', created: 3, active: true, context_window: 4096, public_apps: null },
  { id: 'model4', owned_by: 'company2', object: 'model', created: 4, active: true, context_window: 4096, public_apps: null }
];

// OpenAI specific models for the chat component
export const openAIModels: ModelResponse[] = [
  { id: 'gpt-3.5-turbo', owned_by: 'openai', object: 'model', created: 1677610602, active: true, context_window: 16000, public_apps: null },
  { id: 'gpt-4', owned_by: 'openai', object: 'model', created: 1687882411, active: true, context_window: 32000, public_apps: null }
];

export const mockModelResponse = {
  data: mockModels
};

export const mockModelOptions: ModelOption[] = [
  {
    label: 'Company1',
    options: mockModels.filter(model => model.owned_by === 'company1')
  },
  {
    label: 'Company2',
    options: mockModels.filter(model => model.owned_by === 'company2')
  }
];

export const getMockModelStore = (overrides = {}) => ({
  selectedModel: "gpt-3.5-turbo",
  models: openAIModels,
  modelOptions: mockModelOptions,
  setSelectedModel: vi.fn(),
  setListModels: vi.fn(),
  ...overrides
});

export const setupModelMocks = () => {
  const mockStore = vi.fn();
  vi.mock("@/stores/listModel", () => ({
    useListModelStore: mockStore
  }));
  
  return mockStore;
};

export const resetModelMocks = () => {
  vi.clearAllMocks();
};
