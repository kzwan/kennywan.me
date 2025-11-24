import { getPost, upsertPost } from '../../admin-backend'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../configs/auth-options'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug, content, sha } = await request.json()
  
  const response = await upsertPost(slug, content, sha)
  
  revalidatePath(`/blog/posts/${slug}`)
  revalidatePath('/blog')
  
  return NextResponse.json(response.data)
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 })
  }

  const post = await getPost(slug)
  
  return NextResponse.json(post)
}