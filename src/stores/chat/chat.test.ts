import { describe, test, expect, beforeEach } from 'vitest';
import { useChatStore } from './chat';

const initialState = {
  chats: [],
  currentChatId: null
};

describe('useChatStore', () => {
  beforeEach(() => {
    // Limpiar el localStorage antes de cada test
    localStorage.clear();
    // Resetear el estado del store usando setState
    useChatStore.setState(initialState);
  });

  test('debería inicializar con un estado vacío', () => {
    const state = useChatStore.getState();
    expect(state.chats).toEqual([]);
    expect(state.currentChatId).toBeNull();
  });

  test('debería crear un nuevo chat', () => {
    const { addChat } = useChatStore.getState();
    addChat();
    
    const state = useChatStore.getState();
    expect(state.chats).toHaveLength(1);
    expect(state.currentChatId).toBe(state.chats[0].id);
    expect(state.chats[0].messages).toEqual([]);
    expect(state.chats[0].isActive).toBe(false);
  });

  test('debería eliminar un chat existente', () => {
    const { addChat, deleteChat } = useChatStore.getState();
    addChat();
    const chatId = useChatStore.getState().chats[0].id;
    
    deleteChat(chatId);
    const state = useChatStore.getState();
    expect(state.chats).toHaveLength(0);
    expect(state.currentChatId).toBeNull();
  });

  test('debería establecer el chat actual', () => {
    const { addChat, setCurrentChat } = useChatStore.getState();
    addChat();
    const chatId = useChatStore.getState().chats[0].id;
    
    setCurrentChat(chatId);
    expect(useChatStore.getState().currentChatId).toBe(chatId);
  });

  test('debería activar un chat', () => {
    const { addChat, activateChat } = useChatStore.getState();
    addChat();
    const chatId = useChatStore.getState().chats[0].id;
    
    activateChat(chatId);
    const state = useChatStore.getState();
    expect(state.chats[0].isActive).toBe(true);
  });

  test('debería añadir un mensaje al chat actual', () => {
    const { addChat, addMessage } = useChatStore.getState();
    addChat();
    
    const message = {
      role: 'user' as const,
      content: 'Hola mundo'
    };
    
    addMessage(message);
    const state = useChatStore.getState();
    expect(state.chats[0].messages).toHaveLength(1);
    expect(state.chats[0].messages[0]).toEqual(message);
  });

  test('debería cargar chats desde localStorage', () => {
    const mockChats = [{
      id: '123',
      title: 'Test Chat',
      messages: [],
      isActive: false
    }];
    
    localStorage.setItem('chats', JSON.stringify(mockChats));
    
    const { loadChats } = useChatStore.getState();
    loadChats();
    
    const state = useChatStore.getState();
    expect(state.chats).toEqual(mockChats);
    expect(state.currentChatId).toBe('123');
  });

  test('no debería añadir mensaje si no hay chat activo', () => {
    const { addMessage } = useChatStore.getState();
    const message = {
      role: 'user' as const,
      content: 'Test message'
    };
    
    addMessage(message);
    const state = useChatStore.getState();
    expect(state.chats).toHaveLength(0);
  });
});