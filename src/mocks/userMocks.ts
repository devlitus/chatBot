import { User } from '@supabase/supabase-js'

export const mockUser: User = {
  id: 'test-user-id',
  app_metadata: {
    provider: 'google',
    providers: ['google']
  },
  user_metadata: {
    name: 'Test User',
    email: 'test@example.com',
  },
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00.000Z',
  role: 'authenticated',
  updated_at: '2024-01-01T00:00:00.000Z',
  email: 'test@example.com',
  email_confirmed_at: '2024-01-01T00:00:00.000Z',
  phone: '',
  confirmed_at: '2024-01-01T00:00:00.000Z',
  last_sign_in_at: '2024-01-01T00:00:00.000Z',
  factors: null,
  banned_until: null,
  deleted_at: null,
  invited_at: null,
  identities: [],
  phone_confirmed_at: null,
  confirmation_sent_at: null,
  recovery_sent_at: null,
  email_change_sent_at: null,
  new_email: null,
  phone_change_sent_at: null,
  new_phone: null,
  email_change: null,
  phone_change: null
}