import { useState, useCallback } from 'react'
import { chatService } from '../../services/supabase/chatService'
import type { Database } from '../../types/database.types'

type Chat = Database['public']['Tables']['chats']['Row']
type Message = Database['public']['Tables']['messages']['Row']

export function useSupabaseChat(userId: string | undefined) {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const loadChats = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    try {
      const data = await chatService.getChats(userId)
      setChats(data)
    } catch (error) {
      console.error('Error loading chats:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const createChat = useCallback(async (title: string) => {
    if (!userId) return
    try {
      const newChat = await chatService.createChat({
        title,
        user_id: userId
      })
      setChats(prev => [newChat, ...prev])
      setCurrentChat(newChat)
      return newChat
    } catch (error) {
      console.error('Error creating chat:', error)
    }
  }, [userId])

  const deleteChat = useCallback(async (chatId: number) => {
    try {
      await chatService.deleteChat(chatId)
      setChats(prev => prev.filter(chat => chat.id !== chatId))
      if (currentChat?.id === chatId) {
        setCurrentChat(null)
        setMessages([])
      }
    } catch (error) {
      console.error('Error deleting chat:', error)
    }
  }, [currentChat])

  const loadMessages = useCallback(async (chatId: number) => {
    setLoading(true)
    try {
      const data = await chatService.getChatMessages(chatId)
      setMessages(data)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const sendMessage = useCallback(async (content: string, role: 'user' | 'assistant') => {
    if (!currentChat) return
    try {
      const newMessage = await chatService.createMessage({
        content,
        role,
        chat_id: currentChat.id
      })
      setMessages(prev => [...prev, newMessage])
      return newMessage
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }, [currentChat])

  const deleteMessage = useCallback(async (messageId: number) => {
    try {
      await chatService.deleteMessage(messageId)
      setMessages(prev => prev.filter(message => message.id !== messageId))
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }, [])

  return {
    chats,
    currentChat,
    messages,
    loading,
    loadChats,
    createChat,
    deleteChat,
    loadMessages,
    sendMessage,
    deleteMessage,
    setCurrentChat
  }
}