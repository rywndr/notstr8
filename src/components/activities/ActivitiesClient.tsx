'use client'

import { useState, useEffect } from 'react'
import { Calendar, User, Plus, Eye, Edit3, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../../../prisma/app/generated/prisma'
import { formatDateTime } from '@/utils/formHandlers'
import { deletePost } from '@/actions/posts'

interface ActivitiesClientProps {
  posts: (Post & {
    author: {
      name: string | null
      email: string
      role: string
    }
  })[]
  isAdmin?: boolean
}

export function ActivitiesClient({ posts, isAdmin }: ActivitiesClientProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus post "${title}"?`)) {
      return
    }

    try {
      const result = await deletePost(id)
      if (result.success) {
        window.location.reload()
      } else {
        alert(result.error || 'Gagal menghapus post')
      }
    } catch {
      alert('Terjadi kesalahan')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Aktivitas Komunitas</h1>
          <p className="text-gray-600 mt-2">Dokumentasi kegiatan dan aktivitas komunitas</p>
        </div>
        
        {isAdmin && (
          <Link
            href="/activities/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Buat Post
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada aktivitas</h3>
          <p className="text-gray-600">Aktivitas komunitas akan muncul di sini.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => {
            const authorName = post.author.name || post.author.email
            const displayName = post.author.role === 'ADMIN' ? `${authorName} (admin)` : authorName
            
            return (
              <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {post.imageUrl && (
                  <div className="w-full h-48 relative">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600">
                    <Link href={`/activities/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div className="prose max-w-none text-gray-600 mb-4">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: post.content.length > 200 
                          ? post.content.substring(0, 200) + '...'
                          : post.content 
                      }} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{displayName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateTime(post.createdAt, mounted)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <>
                          <Link
                            href={`/activities/${post.id}/edit`}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </button>
                        </>
                      )}
                      <Link
                        href={`/activities/${post.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}
