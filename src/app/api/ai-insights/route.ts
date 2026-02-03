import { NextRequest, NextResponse } from 'next/server'
import { AIInsightsService } from '@/lib/integrations/openai'
import { AppsFlyerService } from '@/lib/integrations/appsflyer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appId, type = 'insights' } = body

    // Get comprehensive app data
    const appData = await AppsFlyerService.getInsightsData(appId)

    let result
    switch (type) {
      case 'insights':
        result = await AIInsightsService.generateComprehensiveInsights(appData)
        break
      case 'content':
        result = await AIInsightsService.generateContentSuggestions(appData)
        break
      case 'strategy':
        result = await AIInsightsService.generateMarketingStrategy(appData)
        break
      default:
        result = await AIInsightsService.generateComprehensiveInsights(appData)
    }

    return NextResponse.json({ 
      success: true,
      data: result,
      appData // Include app data for context
    })
  } catch (error) {
    console.error('Error generating AI insights:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate AI insights' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'AI Insights API is running',
    status: 'healthy',
    endpoints: {
      'POST /api/ai-insights': 'Generate comprehensive insights',
      'POST /api/ai-insights (type: content)': 'Generate content suggestions',
      'POST /api/ai-insights (type: strategy)': 'Generate marketing strategy'
    }
  })
}