import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  addChat: () => void;
  deleteChat: (chatId: string) => void;
  setCurrentChat: (chatId: string) => void;
  addMessage: (message: Message) => void;
  loadChats: () => void;
}

const saveChatsToLocalStorage = (chats: Chat[]) => {
  localStorage.setItem('chats', JSON.stringify(chats));
};

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  currentChatId: null,

  loadChats: () => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const chats = JSON.parse(savedChats);
      set({ chats, currentChatId: chats[0]?.id || null });
    }
  },

  addChat: () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: `Chat ${new Date().toLocaleString()}`,
      messages: []
    };

    set((state) => {
      const newChats = [...state.chats, newChat];
      saveChatsToLocalStorage(newChats);
      return { chats: newChats, currentChatId: newChat.id };
    });
  },

  deleteChat: (chatId: string) => set((state) => {
    const newChats = state.chats.filter(chat => chat.id !== chatId);
    saveChatsToLocalStorage(newChats);
    return { 
      chats: newChats,
      currentChatId: chatId === state.currentChatId ? (newChats[0]?.id || null) : state.currentChatId
    };
  }),

  setCurrentChat: (chatId: string) => {
    set({ currentChatId: chatId });
  },

  addMessage: (message: Message) => set((state) => {
    if (!state.currentChatId) return state;

    const newChats = state.chats.map(chat => {
      if (chat.id === state.currentChatId) {
        return {
          ...chat,
          messages: [...chat.messages, message]
        };
      }
      return chat;
    });

    saveChatsToLocalStorage(newChats);
    return { chats: newChats };
  }),
}));
