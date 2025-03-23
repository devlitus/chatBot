export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatChoice {
  index: number;
  message: ChatMessage;
  logprobs: null;
  finish_reason: string;
}

export interface ChatUsage {
  queue_time: number;
  prompt_tokens: number;
  prompt_time: number;
  completion_tokens: number;
  completion_time: number;
  total_tokens: number;
  total_time: number;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage: ChatUsage;
  system_fingerprint: string;
}
