import { getMemberChangeLogs } from '@/actions/change-logs'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { ChangeHistoryClient } from '@/components/admin/ChangeHistoryClient'

interface ChangeHistoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ChangeHistoryPage({ params }: ChangeHistoryPageProps) {
  const { id } = await params
  
  const member = await prisma.communityMember.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      middleName: true,
      lastName: true
    }
  })

  if (!member) {
    notFound()
  }

  const result = await getMemberChangeLogs(id)
  
  if (result.error) {
    // If unauthorized, redirect to home page
    if (result.error === 'Unauthorized') {
      redirect('/login')
    }
    
    return (
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-gray-600 mt-2">{result.error}</p>
          </div>
        </div>
      </div>
    )
  }

  const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName || ''}`.trim()

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChangeHistoryClient 
          memberName={fullName}
          changeLogs={result.changeLogs || []}
        />
      </div>
    </div>
  )
}
