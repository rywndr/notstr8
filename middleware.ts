import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: req,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: req,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    // Protected form route - redirect to login if not authenticated
    if (req.nextUrl.pathname === '/form') {
      if (error || !user) {
        console.log('Form access: redirecting non-authenticated user to login')
        return NextResponse.redirect(new URL('/login', req.url))
      }
      console.log('Form access: user authenticated, allowing access')
      return supabaseResponse
    }

    // Protected admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // First check if user is authenticated
      if (error || !user) {
        console.log('Admin access: redirecting non-authenticated user to login')
        return NextResponse.redirect(new URL('/login', req.url))
      }
      
      // Then check if user is admin (only if authenticated)
      try {
        const response = await fetch(`${req.nextUrl.origin}/api/auth/user`, {
          headers: {
            'Cookie': req.headers.get('cookie') || '',
          }
        })
        
        if (!response.ok) {
          console.log('Admin access: API call failed, redirecting to login')
          return NextResponse.redirect(new URL('/login', req.url))
        }
        
        const userData = await response.json()
        
        if (userData.role !== 'ADMIN') {
          console.log('Admin access: user not admin, redirecting to access-denied')
          return NextResponse.redirect(new URL('/access-denied', req.url))
        }
        
        console.log('Admin access: user is admin, allowing access')
      } catch (fetchError) {
        console.error('Error checking admin status:', fetchError)
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }
  } catch (authError) {
    console.error('Auth error in middleware:', authError)
    if (req.nextUrl.pathname === '/form' || req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/form', '/form/edit']
}
