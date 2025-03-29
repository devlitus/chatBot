export interface MessageResponse {
  success: boolean;
  data?: string | null;
  error?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

export interface Chat {
  id: string;
  isActive: boolean;
  messages: Message[];
}

export interface SendMessageParams {
  model: string;
  messages: Message[];
}

export interface MessageHook {
  handleSendMessage: (message: string) => Promise<MessageResponse>;
  fetchMessage: (message?: string) => Promise<MessageResponse>;
  isLoading: boolean;
}
