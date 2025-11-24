import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../configs/auth-options'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin')
  }

  return (
    <div>
      <p className="mb-4">Welcome, {session.user?.name}!</p>
      
      <div className="grid gap-4">
        <Link 
          href="/admin/posts"
          className="border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition"
        >
          <h2 className="text-2xl font-bold mb-2">Posts</h2>
          <p className="text-gray-400">Manage your blog posts</p>
        </Link>
      </div>
    </div>
  )
}