import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      const cookieStore = await cookies()
      
      // Set authentication cookie for 7 days
      cookieStore.set('admin_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'არასწორი პაროლი' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'სერვერის შეცდომა' },
      { status: 500 }
    )
  }
}
