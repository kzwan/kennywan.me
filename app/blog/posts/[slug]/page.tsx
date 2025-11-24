import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => 
  allPosts.map((post) => ({ slug: post.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug)
  
  if (!post) return {}
  
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) notFound()

  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <div className="mb-8 text-center">
        <time dateTime={post.publishedAt} className="text-sm text-gray-500">
          {format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  )
}