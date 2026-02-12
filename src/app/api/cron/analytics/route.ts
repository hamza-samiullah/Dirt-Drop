import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

    if (!accessToken || !businessAccountId) {
      return NextResponse.json({ error: 'Instagram not configured' }, { status: 400 })
    }

    const accountInsights = await fetchAccountInsights(accessToken, businessAccountId)
    const media = await fetchRecentMedia(accessToken, businessAccountId)
    
    const mediaInsights = await Promise.all(
      media.map(async (item: any) => {
        const insights = await fetchMediaInsights(item.id, accessToken)
        return { id: item.id, caption: item.caption, timestamp: item.timestamp, ...insights }
      })
    )

    return NextResponse.json({
      success: true,
      accountInsights,
      mediaInsights,
      collectedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error collecting analytics:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

async function fetchAccountInsights(accessToken: string, businessAccountId: string) {
  const metrics = ['impressions', 'reach', 'profile_views', 'follower_count']
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${businessAccountId}/insights?metric=${metrics.join(',')}&period=day&access_token=${accessToken}`
  )
  const data = await response.json()
  if (data.error) throw new Error(data.error.message)
  
  const insights: any = {}
  data.data?.forEach((metric: any) => {
    insights[metric.name] = metric.values[0]?.value || 0
  })
  return insights
}

async function fetchRecentMedia(accessToken: string, businessAccountId: string) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${businessAccountId}/media?fields=id,caption,timestamp,media_type&limit=25&access_token=${accessToken}`
  )
  const data = await response.json()
  if (data.error) throw new Error(data.error.message)
  return data.data || []
}

async function fetchMediaInsights(mediaId: string, accessToken: string) {
  const metrics = ['engagement', 'impressions', 'reach', 'saved']
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${mediaId}/insights?metric=${metrics.join(',')}&access_token=${accessToken}`
  )
  const data = await response.json()
  if (data.error) return {}
  
  const insights: any = {}
  data.data?.forEach((metric: any) => {
    insights[metric.name] = metric.values[0]?.value || 0
  })
  return insights
}
