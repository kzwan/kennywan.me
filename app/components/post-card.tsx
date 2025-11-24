import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <div className="py-6">
      <div className="">
        <time 
          dateTime={post.publishedAt} 
          className="text-sm text-gray-500"
        >
          {format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
        </time>
        
        <h2 className="text-2xl font-bold">
          <Link 
            href={`/blog/posts/${post.slug}`}
            className=""
          >
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-400">{post.description}</p>
        
        {post.tags && (
          <div className="flex gap-2">
            {post.tags.split(',').map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-blue-700 px-2 py-1 rounded"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}