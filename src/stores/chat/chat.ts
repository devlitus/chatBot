import { create } from "zustand";
import { v7 } from 'uuid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isActive: boolean;
}

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  addChat: () => void;
  deleteChat: (chatId: string) => void;
  setCurrentChat: (chatId: string) => void;
  addMessage: (message: Message) => void;
  loadChats: () => void;
  activateChat: (chatId: string) => void;
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
      id: v7(),
      title: `Chat ${new Date().toLocaleString()}`,
      messages: [],
      isActive: false
    };

    set((state) => {
      const newChats = [...state.chats, newChat];
      saveChatsToLocalStorage(newChats);
      return { chats: newChats, currentChatId: newChat.id };
    });
  },

  deleteChat: (chatId: string) => {
    set((state) => {
      const newChats = state.chats.filter((chat) => chat.id !== chatId);
      saveChatsToLocalStorage(newChats);
      return {
        chats: newChats,
        currentChatId: newChats.length > 0 ? newChats[0].id : null,
      };
    });
  },

  setCurrentChat: (chatId: string) => {
    set({ currentChatId: chatId });
  },

  activateChat: (chatId: string) => {
    set((state) => {
      const newChats = state.chats.map(chat => 
        chat.id === chatId ? { ...chat, isActive: true } : chat
      );
      saveChatsToLocalStorage(newChats);
      return { chats: newChats };
    });
  },

  addMessage: (message: Message) => {
    set((state) => {
      if (!state.currentChatId) return state;

      const newChats = state.chats.map((chat) =>
        chat.id === state.currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
            }
          : chat
      );

      saveChatsToLocalStorage(newChats);
      return { chats: newChats };
    });
  },
}));
