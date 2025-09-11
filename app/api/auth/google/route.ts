import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/google-docs'

export async function GET(request: NextRequest) {
  try {
    const authUrl = auth.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/drive'
      ],
    })

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error generating auth URL:', error)
    return NextResponse.json({ error: 'Error generating auth URL' }, { status: 500 })
  }
}
