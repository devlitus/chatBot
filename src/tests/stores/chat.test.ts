import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChatStore } from '@/stores/chat';

// Mock localStorage
const mockGetItem = vi.fn().mockReturnValue(null);
const mockSetItem = vi.fn();
const mockClear = vi.fn();
const mockKey = vi.fn().mockReturnValue(null);
const mockRemoveItem = vi.fn();

const mockLocalStorage: Storage = {
  getItem: mockGetItem,
  setItem: mockSetItem,
  clear: mockClear,
  length: 0,
  key: mockKey,
  removeItem: mockRemoveItem
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

describe('useChatStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    mockGetItem.mockReturnValue(null);
    mockSetItem.mockReset();
    
    // Reset the store to initial state
    const store = useChatStore.getState();
    useChatStore.setState({
      ...store,
      chats: [],
      currentChatId: null
    });
  });

  describe('loadChats', () => {
    it('should load chats from localStorage', () => {
      const mockChats = [
        { id: '1', title: 'Chat 1', messages: [], isActive: false },
        { id: '2', title: 'Chat 2', messages: [], isActive: true }
      ];
      mockGetItem.mockReturnValueOnce(JSON.stringify(mockChats));

      useChatStore.getState().loadChats();
      const state = useChatStore.getState();

      expect(state.chats).toEqual(mockChats);
      expect(state.currentChatId).toBe('1');
      expect(mockGetItem).toHaveBeenCalledWith('chats');
    });

    it('should handle empty localStorage', () => {
      useChatStore.getState().loadChats();
      const state = useChatStore.getState();

      expect(state.chats).toEqual([]);
      expect(state.currentChatId).toBeNull();
    });
  });

  describe('addChat', () => {
    it('should add a new chat', () => {
      const mockDate = new Date('2025-03-29T09:53:29');
      const mockDateString = mockDate.toLocaleString();
      vi.spyOn(Date.prototype, 'toLocaleString').mockReturnValue(mockDateString);
      
      useChatStore.getState().addChat();
      const state = useChatStore.getState();

      expect(state.chats).toHaveLength(1);
      expect(state.chats[0]).toMatchObject({
        title: `Chat ${mockDateString}`,
        messages: [],
        isActive: false
      });
      expect(state.currentChatId).toBe(state.chats[0].id);
      expect(mockSetItem).toHaveBeenCalledWith('chats', expect.any(String));
    });
  });

  describe('deleteChat', () => {
    it('should delete a chat and update currentChatId', () => {
      const store = useChatStore.getState();
      useChatStore.setState({
        ...store,
        chats: [
          { id: '1', title: 'Chat 1', messages: [], isActive: false },
          { id: '2', title: 'Chat 2', messages: [], isActive: true }
        ],
        currentChatId: '2'
      });

      useChatStore.getState().deleteChat('2');
      const state = useChatStore.getState();

      expect(state.chats).toHaveLength(1);
      expect(state.chats[0].id).toBe('1');
      expect(state.currentChatId).toBe('1');
      expect(mockSetItem).toHaveBeenCalledWith('chats', expect.any(String));
    });

    it('should handle deleting the last chat', () => {
      const store = useChatStore.getState();
      useChatStore.setState({
        ...store,
        chats: [{ id: '1', title: 'Chat 1', messages: [], isActive: false }],
        currentChatId: '1'
      });

      useChatStore.getState().deleteChat('1');
      const state = useChatStore.getState();

      expect(state.chats).toHaveLength(0);
      expect(state.currentChatId).toBeNull();
    });
  });

  describe('setCurrentChat', () => {
    it('should update currentChatId', () => {
      const store = useChatStore.getState();
      useChatStore.setState({
        ...store,
        chats: [{ id: '123', title: 'Chat 1', messages: [], isActive: false }],
        currentChatId: null
      });

      useChatStore.getState().setCurrentChat('123');
      const state = useChatStore.getState();

      expect(state.currentChatId).toBe('123');
    });
  });

  describe('activateChat', () => {
    it('should set chat as active', () => {
      const store = useChatStore.getState();
      useChatStore.setState({
        ...store,
        chats: [
          { id: '1', title: 'Chat 1', messages: [], isActive: false },
          { id: '2', title: 'Chat 2', messages: [], isActive: false }
        ],
        currentChatId: null
      });

      useChatStore.getState().activateChat('1');
      const state = useChatStore.getState();

      expect(state.chats[0].isActive).toBe(true);
      expect(state.chats[1].isActive).toBe(false);
      expect(mockSetItem).toHaveBeenCalledWith('chats', expect.any(String));
    });
  });

  describe('addMessage', () => {
    it('should add a message to the current chat', () => {
      const store = useChatStore.getState();
      useChatStore.setState({
        ...store,
        chats: [{ id: '1', title: 'Chat 1', messages: [], isActive: false }],
        currentChatId: '1'
      });

      const message = { role: 'user' as const, content: 'Hello' };
      useChatStore.getState().addMessage(message);
      const state = useChatStore.getState();

      expect(state.chats[0].messages).toHaveLength(1);
      expect(state.chats[0].messages[0]).toEqual(message);
      expect(mockSetItem).toHaveBeenCalledWith('chats', expect.any(String));
    });

    it('should not add message if no chat is active', () => {
      const store = useChatStore.getState();
      useChatStore.setState({
        ...store,
        chats: [{ id: '1', title: 'Chat 1', messages: [], isActive: false }],
        currentChatId: null
      });

      const message = { role: 'user' as const, content: 'Hello' };
      useChatStore.getState().addMessage(message);
      const state = useChatStore.getState();

      expect(state.chats[0].messages).toHaveLength(0);
    });
  });
});