import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSupabaseChat } from './useSupabaseChat'
import { chatService } from '../../services/supabase/chatService'

interface SupabaseChat {
  id: number;
  title: string;
  user_id: string;
  created_at: string;
}

interface SupabaseMessage {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  chat_id: number;
  created_at: string;
}

// Mock del servicio de chat
vi.mock('../../services/supabase/chatService', () => ({
  chatService: {
    getChats: vi.fn(),
    createChat: vi.fn(),
    deleteChat: vi.fn(),
    getChatMessages: vi.fn(),
    createMessage: vi.fn(),
    deleteMessage: vi.fn(),
  },
}))

describe('useSupabaseChat', () => {
  const mockUserId = 'test-user-123'
  const mockChat: SupabaseChat = {
    id: 1,
    title: 'Test Chat',
    user_id: mockUserId,
    created_at: new Date().toISOString()
  }
  const mockMessage: SupabaseMessage = {
    id: 1,
    content: 'Test message',
    role: 'user',
    chat_id: 1,
    created_at: new Date().toISOString()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería cargar los chats del usuario', async () => {
    const mockChats = [mockChat]
    vi.mocked(chatService.getChats).mockResolvedValue(mockChats)

    const { result } = renderHook(() => useSupabaseChat(mockUserId))

    expect(result.current.chats).toEqual([])
    expect(result.current.loading).toBe(false)

    await act(async () => {
      await result.current.loadChats()
    })

    expect(chatService.getChats).toHaveBeenCalledWith(mockUserId)
    expect(result.current.chats).toEqual(mockChats)
    expect(result.current.loading).toBe(false)
  })

  it('debería crear un nuevo chat', async () => {
    vi.mocked(chatService.createChat).mockResolvedValue(mockChat)

    const { result } = renderHook(() => useSupabaseChat(mockUserId))

    await act(async () => {
      await result.current.createChat('Test Chat')
    })

    expect(chatService.createChat).toHaveBeenCalledWith({
      title: 'Test Chat',
      user_id: mockUserId,
    })
    expect(result.current.chats).toEqual([mockChat])
    expect(result.current.currentChat).toEqual(mockChat)
  })

  it('debería eliminar un chat existente', async () => {
    vi.mocked(chatService.deleteChat).mockResolvedValue(undefined)
    const { result } = renderHook(() => useSupabaseChat(mockUserId))

    // Establecer un chat actual y algunos mensajes
    result.current.setCurrentChat(mockChat)
    
    await act(async () => {
      await result.current.deleteChat(1)
    })

    expect(chatService.deleteChat).toHaveBeenCalledWith('1')
    expect(result.current.currentChat).toBeNull()
    expect(result.current.messages).toEqual([])
  })

  it('debería cargar los mensajes de un chat', async () => {
    const mockMessages = [mockMessage]
    vi.mocked(chatService.getChatMessages).mockResolvedValue(mockMessages)

    const { result } = renderHook(() => useSupabaseChat(mockUserId))

    await act(async () => {
      await result.current.loadMessages(1)
    })

    expect(chatService.getChatMessages).toHaveBeenCalledWith('1')
    expect(result.current.messages).toEqual(mockMessages)
  })

  it('debería enviar un nuevo mensaje', async () => {
    vi.mocked(chatService.createMessage).mockResolvedValue(mockMessage)
    
    const { result } = renderHook(() => useSupabaseChat(mockUserId))
    
    // Establecer un chat actual
    result.current.setCurrentChat(mockChat)

    await act(async () => {
      await result.current.sendMessage('Test message', 'user')
    })

    expect(chatService.createMessage).toHaveBeenCalledWith({
      content: 'Test message',
      role: 'user',
      chat_id: mockChat.id,
    })
    expect(result.current.messages).toEqual([mockMessage])
  })

  it('debería eliminar un mensaje existente', async () => {
    vi.mocked(chatService.deleteMessage).mockResolvedValue(undefined)
    
    const { result } = renderHook(() => useSupabaseChat(mockUserId))
    
    // Establecer un chat actual con un mensaje inicial
    result.current.setCurrentChat({
      ...mockChat,
      messages: [mockMessage]
    })

    await act(async () => {
      await result.current.deleteMessage(1)
    })

    expect(chatService.deleteMessage).toHaveBeenCalledWith(1)
    expect(result.current.messages).toEqual([])
  })

  it('no debería hacer nada si no hay userId', async () => {
    const { result } = renderHook(() => useSupabaseChat(undefined))

    await act(async () => {
      await result.current.loadChats()
      await result.current.createChat('Test Chat')
    })

    expect(chatService.getChats).not.toHaveBeenCalled()
    expect(chatService.createChat).not.toHaveBeenCalled()
  })
})