import { create } from "zustand";
import type { Database } from '../../types/database.types';
import { chatService } from '../../services/supabase/chatService';

type Chat = Database['public']['Tables']['chats']['Row']
type Message = Database['public']['Tables']['messages']['Row']

interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  loading: boolean;
  loadChats: (userId: string) => Promise<void>;
  createChat: (title: string, userId: string) => Promise<void>;
  deleteChat: (chatId: number) => Promise<void>;
  setCurrentChat: (chat: Chat | null) => void;
  loadMessages: (chatId: number) => Promise<void>;
  sendMessage: (content: string, role: 'user' | 'assistant') => Promise<void>;
  deleteMessage: (messageId: number) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  loading: false,

  loadChats: async (userId: string) => {
    set({ loading: true });
    try {
      const data = await chatService.getChats(userId);
      set({ chats: data });
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      set({ loading: false });
    }
  },

  createChat: async (title: string, userId: string) => {
    try {
      const newChat = await chatService.createChat({
        title,
        user_id: userId
      });
      set(state => ({ 
        chats: [newChat, ...state.chats],
        currentChat: newChat
      }));
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  },

  deleteChat: async (chatId: number) => {
    try {
      await chatService.deleteChat(chatId);
      set(state => ({
        chats: state.chats.filter(chat => chat.id !== chatId),
        currentChat: state.currentChat?.id === chatId ? null : state.currentChat,
        messages: state.currentChat?.id === chatId ? [] : state.messages
      }));
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  },

  setCurrentChat: (chat: Chat | null) => {
    set({ currentChat: chat });
  },

  loadMessages: async (chatId: number) => {
    set({ loading: true });
    try {
      const data = await chatService.getChatMessages(chatId);
      set({ messages: data });
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (content: string, role: 'user' | 'assistant') => {
    const { currentChat } = get();
    if (!currentChat) return;
    
    try {
      const newMessage = await chatService.createMessage({
        content,
        role,
        chat_id: currentChat.id
      });
      set(state => ({ messages: [...state.messages, newMessage] }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  },

  deleteMessage: async (messageId: number) => {
    try {
      await chatService.deleteMessage(messageId);
      set(state => ({
        messages: state.messages.filter(message => message.id !== messageId)
      }));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }
}));
