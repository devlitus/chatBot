import { ModelOption } from '@/types/modelOptions';

export const mockModels: ModelOption[] = [
  {
    label: 'Test Company',
    options: [
      {
        id: 'model-1',
        object: 'model',
        created: 1234567890,
        owned_by: 'test-company',
        active: true,
        context_window: 1000,
        public_apps: true
      }
    ]
  }
];