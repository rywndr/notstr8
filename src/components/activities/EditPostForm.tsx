'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { updatePost } from '@/actions/posts'
import { useRouter } from 'next/navigation'
import { Post } from '../../../prisma/app/generated/prisma'

interface EditPostFormProps {
  post: Post
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (contentRef.current && contentRef.current.innerHTML === '') {
      contentRef.current.innerHTML = content
    }
  }, [content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsSubmitting(true)
    try {
      const result = await updatePost(post.id, {
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim() || null
      })

      if (result.success) {
        router.push('/activities')
      } else {
        alert(result.error || 'Gagal mengupdate post')
      }
    } catch {
      alert('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const insertImage = () => {
    const url = prompt('Masukkan URL gambar:')
    if (url && contentRef.current) {
      const selection = window.getSelection()
      const range = selection?.getRangeAt(0)
      
      if (range) {
        const imageDiv = document.createElement('div')
        imageDiv.className = 'my-6'
        imageDiv.innerHTML = `<img src="${url}" alt="Gambar" class="w-full h-auto rounded-lg shadow-sm" />`
        
        range.insertNode(imageDiv)
        range.setStartAfter(imageDiv)
        range.setEndAfter(imageDiv)
        selection?.removeAllRanges()
        selection?.addRange(range)
      } else {
        const imageHtml = `<div class="my-6"><img src="${url}" alt="Gambar" class="w-full h-auto rounded-lg shadow-sm" /></div>`
        contentRef.current.innerHTML += imageHtml
      }
      
      setContent(contentRef.current.innerHTML)
    }
  }

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link 
            href="/activities"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={insertImage}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Tambah Gambar
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Menyimpan...' : 'Update Post'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="py-8">
        <div className="mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul artikel..."
            className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none resize-none"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL gambar utama (opsional)..."
            className="w-full text-lg placeholder-gray-400 border-none outline-none resize-none"
          />
        </div>

        <div className="mb-8">
          <div
            ref={contentRef}
            contentEditable
            onInput={handleContentChange}
            className="w-full min-h-96 text-lg leading-relaxed placeholder-gray-400 border-none outline-none resize-none"
            style={{ 
              lineHeight: '1.8',
              fontSize: '18px'
            }}
            suppressContentEditableWarning={true}
            data-placeholder="Tulis cerita Anda..."
          />
        </div>
      </form>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        
        [contenteditable] {
          outline: none;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin: 24px 0;
        }
        
        [contenteditable] p {
          margin-bottom: 16px;
        }
        
        [contenteditable] h1,
        [contenteditable] h2,
        [contenteditable] h3 {
          font-weight: bold;
          margin: 32px 0 16px 0;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
        }
        
        [contenteditable] ul,
        [contenteditable] ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        [contenteditable] li {
          margin-bottom: 8px;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #E5E7EB;
          padding-left: 16px;
          margin: 24px 0;
          font-style: italic;
          color: #6B7280;
        }
      `}</style>
    </div>
  )
}
