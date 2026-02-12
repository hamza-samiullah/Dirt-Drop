import { NextRequest, NextResponse } from 'next/server'
import { InstagramAnalyticsService } from '@/lib/integrations/instagram-analytics'
import { AIInsightsService } from '@/lib/integrations/openai'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
    
    if (!accessToken || !businessAccountId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Instagram credentials not configured' 
      }, { status: 401 })
    }

    console.log('Fetching Instagram posts for:', businessAccountId)

    // Fetch recent posts from Instagram
    const postsResponse = await fetch(
      `https://graph.facebook.com/v18.0/${businessAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=25&access_token=${accessToken}`
    )

    const postsData = await postsResponse.json()
    console.log('Instagram API response:', postsData)

    if (postsData.error) {
      console.error('Instagram API error:', postsData.error)
      return NextResponse.json({ 
        success: false, 
        error: postsData.error.message 
      }, { status: 500 })
    }

    const posts = (postsData.data || []).map((post: any) => ({
      id: post.id,
      caption: post.caption || '',
      media_type: post.media_type,
      media_url: post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      like_count: post.like_count || 0,
      comments_count: post.comments_count || 0,
      engagement_rate: post.like_count && post.comments_count 
        ? ((post.like_count + post.comments_count) / 100) * 100 
        : 0
    }))

    const recommendations = posts.length > 0 
      ? [
          `Your top post has ${posts[0]?.like_count || 0} likes. Try posting similar content!`,
          `Post during peak hours (6-9 PM) for better engagement`,
          `Use 5-10 relevant hashtags per post`,
          `Engage with comments within the first hour of posting`,
          `Post consistently 3-5 times per week`
        ]
      : [
          `Start posting content to see analytics`,
          `Use AI caption generation for better engagement`,
          `Post during peak hours (6-9 PM)`,
          `Include relevant hashtags`,
          `Engage with your audience`
        ]

    return NextResponse.json({ 
      success: true, 
      posts,
      recommendations,
      stats: {
        totalPosts: posts.length,
        avgEngagement: posts.length > 0 
          ? posts.reduce((sum: number, p: any) => sum + p.engagement_rate, 0) / posts.length 
          : 0,
        totalLikes: posts.reduce((sum: number, p: any) => sum + p.like_count, 0),
        totalComments: posts.reduce((sum: number, p: any) => sum + p.comments_count, 0)
      }
    })
  } catch (error: any) {
    console.error('Error fetching Instagram analytics:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to fetch analytics' 
    }, { status: 500 })
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
