import { supabase } from '../../utils/supabase'
import type { Database } from '../../types/database.types'

type Chat = Database['public']['Tables']['chats']['Row']
type NewChat = Database['public']['Tables']['chats']['Insert']
type Message = Database['public']['Tables']['messages']['Row']
type NewMessage = Database['public']['Tables']['messages']['Insert']

export const chatService = {
  async createChat(chat: NewChat) {
    const { data, error } = await supabase
      .from('chats')
      .insert(chat)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getChats(userId: string) {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async deleteChat(chatId: number) {
    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId)
    
    if (error) throw error
  },

  async createMessage(message: NewMessage) {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getChatMessages(chatId: number) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  async deleteMessage(messageId: number) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId)
    
    if (error) throw error
  }
}