import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <div className="py-5">
      <div className="">   
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-medium">
            <Link 
                href={`/blog/posts/${post.slug}`}
                className="relative inline-block group"
              >
                {post.title}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#3a6e48] scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-out origin-center"></span>
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