import { ModelResponse } from "./modelResponse"

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
      user_model_preferences: {
        Row: {
          id: number
          user_id: string
          model_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          model_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          model_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
        }
      }
      model_preferences: {
        Row: {
          id: string
          user_id: string
          model_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          model_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          model_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      models: {
        Row: {
          id: string
          created_at: string
          model_data: ModelResponse
        }
        Insert: {
          id?: string
          created_at?: string
          model_data: ModelResponse
        }
        Update: {
          id?: string
          created_at?: string
          model_data?: ModelResponse
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