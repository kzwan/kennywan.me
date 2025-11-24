import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../configs/auth-options'
import { PostEditor } from '../../../admin/components/post-editor'

const template = `---
title: "New Post Title"
description: "Post description"
publishedAt: "${new Date().toISOString().split('T')[0]}"
status: "draft"
slug: "new-post-${Date.now()}"
tags: "nextjs"
featured: "no"
---

# Your Post Title

Write your content here...
`

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const fileName = `new-post-${Date.now()}.md`

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Create New Post</h2>
      <PostEditor
        initialContent={template}
        fileName={fileName}
      />
    </div>
  )
}