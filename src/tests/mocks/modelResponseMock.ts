import { ChatResponse } from "@/types/chatResponse";
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

export const mockResponse: ChatResponse = {
      id: 'test-id',
      object: 'chat.completion',
      created: 1234567890,
      model: 'test-model',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: 'Respuesta de prueba'
          },
          logprobs: null,
          finish_reason: 'stop'
        }
      ],
      usage: {
        queue_time: 100,
        prompt_tokens: 10,
        prompt_time: 50,
        completion_tokens: 20,
        completion_time: 50,
        total_tokens: 30,
        total_time: 100
      },
      system_fingerprint: 'test-fingerprint'
    };