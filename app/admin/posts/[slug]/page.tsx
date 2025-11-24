import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../configs/auth-options'
import { getPost } from '../../../admin-backend'
import { PostEditor } from '../../../admin/components/post-editor'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const post = await getPost(slug)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Edit Post: {slug}</h2>
      <PostEditor
        initialContent={post.content}
        fileName={slug}
        sha={post.sha}
      />
    </div>
  )
}