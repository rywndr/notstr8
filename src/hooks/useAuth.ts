'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export interface AuthUser extends User {
  role?: string
  hasSubmittedForm?: boolean
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const previousUserIdRef = useRef<string | null>(null)

  const fetchUserWithRole = useCallback(async (currentUser: User | null): Promise<AuthUser | null> => {
    if (!currentUser) return null;

    try {
      const response = await fetch('/api/auth/user');
      if (!response.ok) {
        console.error('Failed to fetch user role and form status:', response.statusText);
        return currentUser as AuthUser;
      }
      const userDataFromApi = await response.json();
      return { 
        ...currentUser, 
        role: userDataFromApi.role, 
        hasSubmittedForm: userDataFromApi.hasSubmittedForm 
      } as AuthUser;
    } catch (error) {
      console.error('Error fetching user role and form status:', error);
      return currentUser as AuthUser;
    }
  }, []);

  useEffect(() => {
    let mounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        const currentEventUser = session?.user ?? null;
        const currentEventUserId = currentEventUser?.id ?? null;

        if (currentEventUser) {
          const currentUserState = user;

          const needsFullFetch =
            currentEventUserId !== currentUserState?.id ||
            event === 'SIGNED_IN' ||
            !currentUserState ||
            currentUserState.role === undefined ||
            currentUserState.hasSubmittedForm === undefined;

          if (needsFullFetch) {
            const fullUser = await fetchUserWithRole(currentEventUser);
            if (mounted) {
              setUser(fullUser);
            }
          } else if (currentUserState && currentUserState.id === currentEventUserId) {
            if (mounted) {
              setUser({
                ...currentEventUser,
                role: currentUserState.role,
                hasSubmittedForm: currentUserState.hasSubmittedForm,
              } as AuthUser);
            }
          }
        } else {
          if (mounted) {
            setUser(null);
          }
        }

        if (event === 'SIGNED_OUT') {
          if (previousUserIdRef.current !== null) {
            router.refresh();
          }
        } else if (event === 'SIGNED_IN') {
          if (currentEventUserId !== previousUserIdRef.current) {
            router.refresh();
          }
        }
        previousUserIdRef.current = currentEventUserId;

        if (loading && mounted) {
          setLoading(false);
        }
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [router, fetchUserWithRole, user, loading])

  return { user, loading }
}
