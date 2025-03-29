import { ModelResponse } from '@/types/modelResponse';
import { ModelOption } from '@/types/modelOptions';

export const mockModels: ModelResponse[] = [
  { id: 'model1', owned_by: 'company1', object: 'model', created: 1, active: true, context_window: 4096, public_apps: null },
  { id: 'model2', owned_by: 'company1', object: 'model', created: 2, active: true, context_window: 4096, public_apps: null },
  { id: 'model3', owned_by: 'company2', object: 'model', created: 3, active: true, context_window: 4096, public_apps: null },
  { id: 'model4', owned_by: 'COMPANY2', object: 'model', created: 4, active: true, context_window: 4096, public_apps: null },
];

export const mockModelResponse = {
  data: mockModels
};

// OpenAI specific mocks
export const openAIModels: ModelResponse[] = [
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

export const mockModelOptions: ModelOption[] = [
  {
    label: 'OpenAI',
    options: openAIModels
  }
];
