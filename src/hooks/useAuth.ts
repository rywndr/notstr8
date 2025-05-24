'use client'

import { useEffect, useState } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase/client'

export interface User {
  id: string
  email: string
  name?: string | null
  role: string
  hasSubmittedForm: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const getUser = async () => {
      try {
        const supabase = createClientSupabaseClient()
        
        // Get initial user
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()
        
        if (error || !supabaseUser) {
          if (mounted) {
            setUser(null)
            setLoading(false)
          }
          return
        }

        if (supabaseUser && mounted) {
          // Get session for auth token
          const { data: { session } } = await supabase.auth.getSession()
          
          if (!session) {
            if (mounted) {
              setUser(null)
              setLoading(false)
            }
            return
          }

          // Fetch user data from your database
          const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            const userData = await response.json()
            if (mounted) {
              setUser(userData)
            }
          } else {
            console.error('Failed to fetch user data:', response.status, response.statusText)
            if (mounted) {
              setUser(null)
            }
          }
        } else if (mounted) {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in useAuth:', error)
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getUser()

    // Listen for auth state changes
    const supabase = createClientSupabaseClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Refetch user data
        getUser()
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
