import { vi } from 'vitest';
import type { Message } from '@/types/message';
import type { Chat } from '@/types/chat';
import type { ChatMessage, ChatResponse, ChatUsage } from '@/types/chatResponse';

// Chat Messages Mocks
export const mockMessages: Message[] = [
  { id: "1", content: "Hello", role: "user" },
  { id: "2", content: "Hi there", role: "assistant" },
];

// Chat Store Mocks
export const mockChats: Chat[] = [
  {
    id: "chat1",
    messages: mockMessages,
  }
];

export const getMockChatStore = (overrides = {}) => ({
  chats: mockChats,
  currentChatId: "chat1",
  addMessage: vi.fn(),
  addChat: vi.fn(),
  ...overrides
});

// Message Store Mocks
export const getMockMessageStore = (overrides = {}) => ({
  isLoading: false,
  setIsLoading: vi.fn(),
  ...overrides
});

// Chat Response Mocks
export const mockModel = 'gpt-3.5-turbo';

export const mockChatUsage: ChatUsage = {
  queue_time: 0,
  prompt_tokens: 10,
  prompt_time: 0.1,
  completion_tokens: 5,
  completion_time: 0.2,
  total_tokens: 15,
  total_time: 0.3
};

export const mockChatMessages: ChatMessage[] = [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi there!' }
];

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
  usage: mockChatUsage,
  system_fingerprint: 'test-fingerprint'
};

export const mockEmptyResponse: ChatResponse = {
  id: 'response-1',
  object: 'chat.completion',
  created: 1234567890,
  model: mockModel,
  choices: [],
  usage: mockChatUsage,
  system_fingerprint: 'test-fingerprint'
};

export const mockMalformedResponse = {
  id: 'response-1',
  object: 'chat.completion',
  created: 1234567890,
  model: mockModel,
  // Missing choices field
  system_fingerprint: 'test-fingerprint'
} as ChatResponse;

// DOM Mocks
export const mockScrollIntoView = vi.fn();

// Setup and Reset Functions
export const setupChatMocks = () => {
  const mockStore = vi.fn();
  vi.mock("@/stores/chat", () => ({
    useChatStore: mockStore
  }));

  vi.mock("@/stores/message", () => ({
    useMessageStore: vi.fn().mockReturnValue(getMockMessageStore())
  }));

  window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  
  mockStore.mockReturnValue(getMockChatStore());
  
  return mockStore;
};

export const resetChatMocks = () => {
  vi.clearAllMocks();
};
