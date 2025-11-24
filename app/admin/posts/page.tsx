import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../configs/auth-options'
import { getAllPosts } from '../../admin-backend'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'

export default async function AdminPostsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin/posts')
  }

  const githubPosts = await getAllPosts()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <Link
          href="/admin/posts/create"
          className="px-4 py-2 rounded"
        >
          Create New Post
        </Link>
      </div>

      <div className="space-y-4">
        {githubPosts.map((post: any) => {
          const contentPost = allPosts.find(
            p => p._raw.sourceFileName === post.name
          )

          return (
            <div 
              key={post.name}
              className="border border-gray-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">
                  {contentPost?.title || post.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Status: {contentPost?.status || 'processing'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/posts/${post.name}`}
                  className="text-primary-500 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}