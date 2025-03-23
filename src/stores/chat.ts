import { create } from "zustand";

interface ChatStore {
  messages: string[];
  addMessage: (message: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));

