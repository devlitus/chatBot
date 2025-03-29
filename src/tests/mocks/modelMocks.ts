import { ModelResponse } from '@/types/modelResponse';

export const mockModels: ModelResponse[] = [
  { id: 'model1', owned_by: 'company1', object: 'model', created: 1, active: true, context_window: 4096, public_apps: null },
  { id: 'model2', owned_by: 'company1', object: 'model', created: 2, active: true, context_window: 4096, public_apps: null },
  { id: 'model3', owned_by: 'company2', object: 'model', created: 3, active: true, context_window: 4096, public_apps: null },
  { id: 'model4', owned_by: 'COMPANY2', object: 'model', created: 4, active: true, context_window: 4096, public_apps: null },
];

export const mockModelResponse = {
  data: mockModels
};
