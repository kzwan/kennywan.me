import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'

export const metadata = {
  title: 'Kenny Wan Blog',
  description: 'Blog',
}

export default function BlogPage() {
  const posts = allPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => 
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    )

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      
      {posts.length === 0 && <p>No posts found.</p>}
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/posts/${post.slug}`}>
              <h2 className="text-2xl font-bold">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 mt-2">{post.description}</p>
            <time className="text-sm text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}