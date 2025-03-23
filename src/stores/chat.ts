import { create } from "zustand";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
