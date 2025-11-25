import { deletePost } from "app/admin-backend"
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'configs/auth-options'

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sha = request.headers.get('sha')
  
  if (!sha) {
    return NextResponse.json({ error: 'SHA required' }, { status: 400 })
  }

  const response = await deletePost(params.slug, sha)
  
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  
  return NextResponse.json(response.data)
}