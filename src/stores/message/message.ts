import { create } from 'zustand';

interface MessageState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useMessageStore = create<MessageState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
