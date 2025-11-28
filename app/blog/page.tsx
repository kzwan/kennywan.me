'use client'

import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { PostCard } from '../components/post-card'
import { useState, useMemo } from 'react'

// Array of green shades - cycles from light to dark and back
// const GREEN_GRADIENT = [
//   '#3a6e48',
//   '#3d7149',
//   '#3f734b',
//   '#42764c',
//   '#45794d',
//   '#487c4f',
//   '#4a7e50',
//   '#4d8151',
//   '#508453',
//   '#538754',
//   '#568955',
//   '#598c57',
//   '#5c8f58',
//   '#5f9259',
//   '#62945b',
//   '#66975c',
//   '#699a5d',
//   '#6c9d5e',
//   '#6f9f60',
//   '#73a261',
//   '#76a562',
//   '#7aa863',
//   '#7daa65',
//   '#80ad66',
//   '#84b067',
//   '#80ad66',
//   '#7daa65',
//   '#7aa863',
//   '#76a562',
//   '#73a261',
//   '#6f9f60',
//   '#6c9d5e',
//   '#699a5d',
//   '#66975c',
//   '#62945b',
//   '#5f9259',
//   '#5c8f58',
//   '#598c57',
//   '#568955',
//   '#538754',
//   '#508453',
//   '#4d8151',
//   '#4a7e50',
//   '#487c4f',
//   '#45794d',
//   '#42764c',
//   '#3f734b',
//   '#3d7149',
// ]

const GREEN_GRADIENT = [
  '#3a6e48',
  '#41754c',
  '#497d4f',
  '#508453',
  '#588b56',
  '#60925a',
  '#699a5d',
  '#72a160',
  '#7ba964',
  '#84b067',
  '#7ba964',
  '#72a160',
  '#699a5d',
  '#60925a',
  '#588b56',
  '#508453',
  '#497d4f',
  '#41754c',
]

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

  // Get color from gradient array (cycles through colors)
  const getGradientColor = (index: number) => {
    return GREEN_GRADIENT[index % GREEN_GRADIENT.length]
  }

  return (
    <div>
      {/* Header with title and filter buttons */}
      <div className='flex justify-between items-end mb-6 mt-4'>
        <h1 className="text-5xl font-semibold">{getHeading()}</h1>
        
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-2xl text-black font-medium cursor-pointer"
          >
            {showFilters ? 'v  Filter' : '>  Filter'}
          </button>
          
          {/* Clear Filter X Icon */}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag('')}
              className="ml-2 text-lg font-medium px-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20 transition-colors"
              title="Clear filter"
            >
              <span className=''>✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Full-width Collapsible Filter Panel */}
      {showFilters && (
        <div className="rounded-lg mb-6">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`font-medium text-md px-3 py-1 rounded-xl transition-all ${
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
      
      {/* Posts with gradient colors */}
      {filteredPosts.length === 0 && (
        <p className="text-gray-500">No posts found.</p>
      )}
      
      {filteredPosts.map((post, index) => (
        <PostCard 
          key={post.slug} 
          {...post} 
          underlineColor={getGradientColor(index)}
        />
      ))}
    </div>
  )
}