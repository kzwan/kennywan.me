'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import 'easymde/dist/easymde.min.css'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

interface PostEditorProps {
  initialContent?: string
  fileName: string
  sha?: string
}

export function PostEditor({ initialContent = '', fileName, sha }: PostEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: fileName,
          content,
          sha,
        }),
      })

      if (response.ok) {
        alert('Post saved successfully!')
        router.push('/admin/posts')
        router.refresh()
      } else {
        alert('Failed to save post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <SimpleMDE
        value={content}
        onChange={setContent}
      />
      
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary-500 hover:bg-primary-600 px-6 py-2 rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Post'}
        </button>
        
        <button
          onClick={() => router.back()}
          className="border border-gray-700 hover:border-gray-600 px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}