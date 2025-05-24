'use client'

import { useAuth } from '@/hooks/useAuth'
import FormAlreadySubmitted from '@/components/form/FormAlreadySubmitted'
import CommunityForm from '@/components/form/CommunityForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FormPage() {
  const { user, loading } = useAuth()
  const [showSubmittedForm, setShowSubmittedForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Redirect non-auth users to login
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user && user.hasSubmittedForm) {
      setShowSubmittedForm(true)
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null
  }

  if (showSubmittedForm) {
    return <FormAlreadySubmitted />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityForm />
      </div>
    </div>
  )
}