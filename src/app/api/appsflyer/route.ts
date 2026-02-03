import { NextRequest, NextResponse } from 'next/server'
import { AppsFlyerService } from '@/lib/integrations/appsflyer'

export async function GET() {
  try {
    const metrics = await AppsFlyerService.getComprehensiveMetrics()
    
    return NextResponse.json({ 
      success: true,
      ...metrics
    })
  } catch (error) {
    console.error('Error fetching AppsFlyer data:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch AppsFlyer data',
        // Fallback data
        totalInstalls: 34,
        dailyInstalls: 2,
        totalRevenue: 850,
        retentionDay30: 23.8
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appId } = body

    const insights = await AppsFlyerService.getInsightsData(appId)

    return NextResponse.json({ 
      success: true,
      insights 
    })
  } catch (error) {
    console.error('Error generating AppsFlyer insights:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate insights' 
      },
      { status: 500 }
    )
  }
}