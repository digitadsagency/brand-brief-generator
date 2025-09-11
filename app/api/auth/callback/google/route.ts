import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/google-docs'

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 })
    }

    const { tokens } = await auth.getToken(code)
    auth.setCredentials(tokens)

    // Redirigir a la página principal
    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Error in callback:', error)
    return NextResponse.json({ error: 'Error in callback' }, { status: 500 })
  }
}
