import { NextRequest, NextResponse } from 'next/server'
import { InstagramAnalyticsService } from '@/lib/integrations/instagram-analytics'
import { AIInsightsService } from '@/lib/integrations/openai'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('authorization')?.replace('Bearer ', '')
    const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || ''
    
    if (!accessToken) {
      return NextResponse.json({ success: false, error: 'No access token' }, { status: 401 })
    }

    const posts = await InstagramAnalyticsService.getRecentPosts(accessToken, businessAccountId, 10)
    const recommendations = await InstagramAnalyticsService.generateAIRecommendations(posts)

    return NextResponse.json({ 
      success: true, 
      posts,
      recommendations,
      stats: {
        totalPosts: posts.length,
        avgEngagement: posts.length > 0 ? posts.reduce((sum, p) => sum + p.engagement_rate, 0) / posts.length : 0,
        totalLikes: posts.reduce((sum, p) => sum + p.like_count, 0),
        totalComments: posts.reduce((sum, p) => sum + p.comments_count, 0)
      }
    })
  } catch (error) {
    console.error('Error fetching Instagram analytics:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { posts } = body

    if (!posts || posts.length === 0) {
      return NextResponse.json({ success: false, error: 'No posts data' }, { status: 400 })
    }

    // Generate AI recommendations using OpenAI
    const prompt = `Analyze these Instagram post performance metrics and provide 5 specific, actionable recommendations for improving engagement:

Posts Data:
${posts.map((p: any, i: number) => `
Post ${i + 1}:
- Type: ${p.media_type}
- Likes: ${p.like_count}
- Comments: ${p.comments_count}
- Engagement Rate: ${p.engagement_rate.toFixed(2)}%
- Caption: ${p.caption?.substring(0, 100)}...
`).join('\n')}

Provide recommendations in JSON array format: ["recommendation 1", "recommendation 2", ...]`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    const recommendations = JSON.parse(data.choices[0]?.message?.content || '[]')

    return NextResponse.json({ success: true, recommendations })
  } catch (error) {
    console.error('Error generating AI recommendations:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate recommendations' }, { status: 500 })
  }
}
