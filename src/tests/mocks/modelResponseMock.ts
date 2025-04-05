import { ModelResponse } from "@/types/modelResponse";

export const mockModelsList: ModelResponse[] = [
  {
    id: 'model-1',
    object: 'model',
    created: 1234567890,
    owned_by: 'groq',
    active: true,
    context_window: 1000,
    public_apps: null
  },
  {
    id: 'model-2',
    object: 'model',
    created: 1234567891,
    owned_by: 'openai',
    active: true,
    context_window: 2000,
    public_apps: null
  },
  {
    id: 'model-3',
    object: 'model',
    created: 1234567892,
    owned_by: 'sdaia',
    active: true,
    context_window: 3000,
    public_apps: null
  }
];