import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if we have valid credentials
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export type WaitlistEntry = {
  id?: string
  email: string
  created_at?: string
}

export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase || !supabaseUrl || !supabaseAnonKey) {
    return {
      success: false,
      error: 'Supabase configuration is missing. Please set environment variables.',
    }
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return {
          success: false,
          error: 'This email is already on the waitlist.',
        }
      }
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

