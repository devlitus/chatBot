export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: number
          created_at: string
          title: string
          user_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          user_id: string
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          user_id?: string
        }
      }
      messages: {
        Row: {
          id: number
          created_at: string
          content: string
          chat_id: number
          role: 'user' | 'assistant'
        }
        Insert: {
          id?: number
          created_at?: string
          content: string
          chat_id: number
          role: 'user' | 'assistant'
        }
        Update: {
          id?: number
          created_at?: string
          content?: string
          chat_id?: number
          role?: 'user' | 'assistant'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}