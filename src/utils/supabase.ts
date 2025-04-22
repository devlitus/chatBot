import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants'

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las variables de entorno de Supabase')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
