import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'
import { PostCard } from '../components/post-card'

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
      
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}