import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

interface PostCardProps extends Post {
  underlineColor?: string
}

export function PostCard({ underlineColor = '#3a6e48', ...post }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="py-5">
      <div className="">   
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-medium">
            <Link 
              href={`/blog/posts/${post.slug}`}
              className="relative inline-block group font-bold underline decoration-4 underline-offset-6 transition-colors duration-300"
              style={{ 
                textDecorationColor: underlineColor,
                color: isHovered ? underlineColor : 'inherit'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {post.title}
            </Link>
          </h2>
          <time 
            dateTime={post.publishedAt} 
            className="text-xl text-gray-600 font-medium"
          >
            {format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
          </time>
        </div>
        <div className="text-lg pt-2 text-gray-700 dark:text-gray-400">
          {post.description}
        </div>          
          
        {post.tags && (
          <div className="flex gap-2 mt-2">
            {post.tags.split(',').map(tag => (
              <span 
                key={tag} 
                className="font-medium text-md px-1 bg-[#3a6e48]/10 text-[#3a6e48] rounded-md cursor-pointer hover:bg-[#3a6e48]/20 transition-colors"
              >
                {"#"+tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}