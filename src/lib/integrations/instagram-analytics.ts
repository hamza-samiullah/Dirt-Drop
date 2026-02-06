export interface InstagramPost {
  id: string
  caption: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  timestamp: string
  like_count: number
  comments_count: number
  engagement_rate: number
}

export interface InstagramInsights {
  impressions: number
  reach: number
  engagement: number
  saves: number
  shares: number
}

export class InstagramAnalyticsService {
  static async getRecentPosts(accessToken: string, limit: number = 10): Promise<InstagramPost[]> {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`
      )
      const data = await response.json()
      
      return (data.data || []).map((post: any) => ({
        ...post,
        engagement_rate: this.calculateEngagementRate(post.like_count, post.comments_count)
      }))
    } catch (error) {
      console.error('Error fetching Instagram posts:', error)
      return []
    }
  }

  static async getPostInsights(postId: string, accessToken: string): Promise<InstagramInsights> {
    try {
      const response = await fetch(
        `https://graph.instagram.com/${postId}/insights?metric=impressions,reach,engagement,saved,shares&access_token=${accessToken}`
      )
      const data = await response.json()
      
      const insights: any = {}
      data.data?.forEach((metric: any) => {
        insights[metric.name] = metric.values[0]?.value || 0
      })
      
      return insights
    } catch (error) {
      console.error('Error fetching post insights:', error)
      return { impressions: 0, reach: 0, engagement: 0, saves: 0, shares: 0 }
    }
  }

  static calculateEngagementRate(likes: number, comments: number, followers: number = 1000): number {
    return ((likes + comments) / followers) * 100
  }

  static async generateAIRecommendations(posts: InstagramPost[]): Promise<string[]> {
    if (posts.length === 0) return []

    const topPosts = posts.sort((a, b) => b.engagement_rate - a.engagement_rate).slice(0, 3)
    const avgEngagement = posts.reduce((sum, p) => sum + p.engagement_rate, 0) / posts.length

    const recommendations = []

    // Analyze top performing content
    const topTypes = topPosts.map(p => p.media_type)
    if (topTypes.filter(t => t === 'IMAGE').length > 2) {
      recommendations.push('📸 Images perform best - focus on high-quality photos')
    } else if (topTypes.filter(t => t === 'VIDEO').length > 2) {
      recommendations.push('🎥 Videos drive engagement - create more video content')
    }

    // Engagement analysis
    if (avgEngagement < 2) {
      recommendations.push('⚡ Low engagement - try posting at different times (8 AM, 12 PM, 6 PM)')
    } else if (avgEngagement > 5) {
      recommendations.push('🔥 Great engagement! Maintain posting frequency and content style')
    }

    // Caption analysis
    const avgCaptionLength = posts.reduce((sum, p) => sum + (p.caption?.length || 0), 0) / posts.length
    if (avgCaptionLength < 50) {
      recommendations.push('✍️ Add longer captions with storytelling for better engagement')
    }

    // Posting frequency
    recommendations.push('📅 Post consistently 1-2 times daily for optimal reach')
    recommendations.push('💡 Use 5-10 relevant hashtags per post')

    return recommendations
  }
}
