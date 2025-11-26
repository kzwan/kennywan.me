'use client'

import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { PostCard } from '../components/post-card'
import { useState, useMemo } from 'react'

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const allPublishedPosts = allPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => 
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    )

  const tags = useMemo(() => {
    const tagsSet = new Set<string>()
    
    allPublishedPosts.forEach(post => {
      if (post.tags) {
        post.tags.split(',').forEach(tag => tagsSet.add(tag.trim()))
      }
    })
    
    return Array.from(tagsSet).sort()
  }, [allPublishedPosts])

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return allPublishedPosts
    
    return allPublishedPosts.filter(post => 
      post.tags?.split(',').some(tag => tag.trim() === selectedTag)
    )
  }, [selectedTag, allPublishedPosts])

  const getHeading = () => {
    return selectedTag ? `#${selectedTag}` : 'Latest'
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setShowFilters(false)
  }

  return (
    <div>
      {/* Header with title and filter buttons */}
      <div className='flex justify-between items-center mb-6 mt-4'>
        <h1 className="text-5xl font-semibold">{getHeading()}</h1>
        
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-xl text-black font-medium cursor-pointer"
          >
            {showFilters ? '☰  Filter By Tag' : '☰  Filter By Tag'}
          </button>
          
          {/* Clear Filter X Icon */}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag('')}
              className="ml-2 text-lg font-medium px-3 py-1 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20 transition-colors"
              title="Clear filter"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Full-width Collapsible Filter Panel */}
      {showFilters && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`font-medium text-md px-3 py-1 rounded-md transition-all ${
                  selectedTag === tag
                    ? 'bg-[#3a6e48] text-white'
                    : 'bg-[#3a6e48]/10 text-[#3a6e48] hover:bg-[#3a6e48]/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* <hr className="border-gray-700 mb-8" /> */}
      
      {/* Posts */}
      {filteredPosts.length === 0 && (
        <p className="text-gray-500">No posts found.</p>
      )}
      
      {filteredPosts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}