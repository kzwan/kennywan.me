import { getServerSession } from 'next-auth/next'
import { authOptions } from 'configs/auth-options'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  return NextResponse.json({
    session,
    authenticated: !!session
  })
}