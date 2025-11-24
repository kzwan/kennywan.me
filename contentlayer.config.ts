import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    status: {
      type: 'enum',
      options: ['published', 'draft'],
      default: 'draft',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'string',
      required: false
    },
    featured: {
      type: 'enum',
      options: ['yes', 'no'],
      default: 'no',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `blog/posts/${doc.slug}`,
    },
  },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    markdown: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypePrism,
        ]
    },
})