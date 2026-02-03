import { NextRequest, NextResponse } from 'next/server'
import { MakeWebhookService } from '@/lib/integrations/make'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, metrics, featureData } = body

    let result = false

    switch (action) {
      case 'milestone_post':
        const milestonePayload = MakeWebhookService.createMilestonePost(
          metrics.totalInstalls,
          metrics.milestone
        )
        result = await MakeWebhookService.triggerInstagramPost(milestonePayload)
        break

      case 'daily_performance':
        const dailyPayload = MakeWebhookService.createDailyPerformancePost(metrics)
        result = await MakeWebhookService.triggerInstagramPost(dailyPayload)
        break

      case 'feature_announcement':
        const featurePayload = MakeWebhookService.createFeatureAnnouncementPost(
          featureData.name,
          featureData.description
        )
        result = await MakeWebhookService.triggerInstagramPost(featurePayload)
        break

      case 'generate_content':
        const suggestions = await MakeWebhookService.generateContentSuggestion(metrics)
        return NextResponse.json({ 
          success: true, 
          suggestions 
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({ 
      success: result,
      message: result ? 'Post triggered successfully' : 'Failed to trigger post'
    })
  } catch (error) {
    console.error('Make.com webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Make.com webhook integration active',
    endpoints: {
      'POST /api/make': 'Trigger Instagram posts via Make.com',
      actions: [
        'milestone_post',
        'daily_performance', 
        'feature_announcement',
        'generate_content'
      ]
    }
  })
}