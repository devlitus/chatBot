import { ChatMessage, ChatResponse, ChatUsage } from '@/types/chatResponse';

export const mockModel = 'test-model';

export const mockMessages: ChatMessage[] = [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi there!' }
];

export const mockUsage: ChatUsage = {
  queue_time: 0,
  prompt_tokens: 10,
  prompt_time: 0.1,
  completion_tokens: 5,
  completion_time: 0.2,
  total_tokens: 15,
  total_time: 0.3
};

export const mockResponse: ChatResponse = {
  id: 'response-1',
  object: 'chat.completion',
  created: 1234567890,
  model: mockModel,
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: 'Test response'
      },
      logprobs: null,
      finish_reason: 'stop'
    }
  ],
  usage: mockUsage,
  system_fingerprint: 'test-fingerprint'
};

export const mockEmptyResponse: ChatResponse = {
  id: 'response-1',
  object: 'chat.completion',
  created: 1234567890,
  model: mockModel,
  choices: [],
  usage: {
    ...mockUsage,
    completion_tokens: 0,
    completion_time: 0,
    total_tokens: 10,
    total_time: 0.1
  },
  system_fingerprint: 'test-fingerprint'
};

export const mockMalformedResponse = {
  id: 'response-1',
  object: 'chat.completion',
  // Missing required fields
};
