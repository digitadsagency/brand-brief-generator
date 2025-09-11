import { NextRequest, NextResponse } from 'next/server'
import { addBrandBriefToSheet } from '@/lib/brand-brief-sheets'
import { OnboardingData } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const data: OnboardingData = await request.json()
    
    const result = await addBrandBriefToSheet(data)
    
    return NextResponse.json({
      success: true,
      message: result.message,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}/edit`
    })
  } catch (error) {
    console.error('Error adding to sheet:', error)
    return NextResponse.json(
      { success: false, error: 'Error adding to sheet' },
      { status: 500 }
    )
  }
}
