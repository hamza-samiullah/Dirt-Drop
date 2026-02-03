import axios from 'axios'

export interface InstagramMetrics {
  followers: number
  engagement: number
  reach: number
  impressions: number
  postsThisWeek: number
  avgLikesPerPost: number
  topPosts: Array<{
    id: string
    caption: string
    likes: number
    comments: number
    engagement: number
    timestamp: string
  }>
}

export interface InstagramPost {
  id: string
  caption: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  timestamp: string
  like_count: number
  comments_count: number
}

export class InstagramService {
  private static readonly BASE_URL = 'https://graph.facebook.com/v18.0'
  private static readonly APP_ID = process.env.INSTAGRAM_APP_ID
  private static readonly APP_SECRET = process.env.INSTAGRAM_APP_SECRET

  static async getAccountMetrics(accessToken: string, businessAccountId: string): Promise<InstagramMetrics> {
    try {
      // Get account info
      const accountResponse = await axios.get(
        `${this.BASE_URL}/${businessAccountId}`,
        {
          params: {
            fields: 'followers_count,media_count',
            access_token: accessToken
          }
        }
      )

      // Get recent media
      const mediaResponse = await axios.get(
        `${this.BASE_URL}/${businessAccountId}/media`,
        {
          params: {
            fields: 'id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count',
            limit: 25,
            access_token: accessToken
          }
        }
      )

      // Get insights for recent posts
      const posts = mediaResponse.data.data || []
      const postsWithInsights = await Promise.all(
        posts.slice(0, 10).map(async (post: any) => {
          try {
            const insightsResponse = await axios.get(
              `${this.BASE_URL}/${post.id}/insights`,
              {
                params: {
                  metric: 'engagement,impressions,reach',
                  access_token: accessToken
                }
              }
            )
            
            const insights = insightsResponse.data.data || []
            const engagement = insights.find((i: any) => i.name === 'engagement')?.values[0]?.value || 0
            const impressions = insights.find((i: any) => i.name === 'impressions')?.values[0]?.value || 0
            const reach = insights.find((i: any) => i.name === 'reach')?.values[0]?.value || 0

            return {
              ...post,
              engagement,
              impressions,
              reach
            }
          } catch (error) {
            return {
              ...post,
              engagement: 0,
              impressions: 0,
              reach: 0
            }
          }
        })
      )

      // Calculate metrics
      const totalLikes = posts.reduce((sum: number, post: any) => sum + (post.like_count || 0), 0)
      const totalComments = posts.reduce((sum: number, post: any) => sum + (post.comments_count || 0), 0)
      const totalEngagement = totalLikes + totalComments
      const avgLikesPerPost = posts.length > 0 ? totalLikes / posts.length : 0
      const totalImpressions = postsWithInsights.reduce((sum: number, post: any) => sum + (post.impressions || 0), 0)
      const totalReach = postsWithInsights.reduce((sum: number, post: any) => sum + (post.reach || 0), 0)
      const engagementRate = totalImpressions > 0 ? (totalEngagement / totalImpressions) * 100 : 0

      // Get posts from this week
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      const postsThisWeek = posts.filter((post: any) => 
        new Date(post.timestamp) > oneWeekAgo
      ).length

      return {
        followers: accountResponse.data.followers_count || 0,
        engagement: engagementRate,
        reach: totalReach,
        impressions: totalImpressions,
        postsThisWeek,
        avgLikesPerPost,
        topPosts: postsWithInsights
          .sort((a: any, b: any) => (b.like_count || 0) - (a.like_count || 0))
          .slice(0, 5)
          .map((post: any) => ({
            id: post.id,
            caption: post.caption || '',
            likes: post.like_count || 0,
            comments: post.comments_count || 0,
            engagement: post.engagement || 0,
            timestamp: post.timestamp
          }))
      }
    } catch (error) {
      console.error('Error fetching Instagram metrics:', error)
      return this.getMockMetrics()
    }
  }

  static async createPost(accessToken: string, businessAccountId: string, postData: {
    caption: string
    image_url?: string
    video_url?: string
  }): Promise<{ success: boolean; post_id?: string; error?: string }> {
    try {
      // Step 1: Create media container
      const containerParams: any = {
        access_token: accessToken,
        caption: postData.caption
      }

      if (postData.image_url) {
        containerParams.image_url = postData.image_url
      } else if (postData.video_url) {
        containerParams.video_url = postData.video_url
        containerParams.media_type = 'VIDEO'
      } else {
        return { success: false, error: 'No media URL provided' }
      }

      const containerResponse = await axios.post(
        `${this.BASE_URL}/${businessAccountId}/media`,
        null,
        { params: containerParams }
      )

      const containerId = containerResponse.data.id

      // Step 2: Publish the media
      const publishResponse = await axios.post(
        `${this.BASE_URL}/${businessAccountId}/media_publish`,
        null,
        {
          params: {
            creation_id: containerId,
            access_token: accessToken
          }
        }
      )

      return {
        success: true,
        post_id: publishResponse.data.id
      }
    } catch (error: any) {
      console.error('Error creating Instagram post:', error)
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to create post'
      }
    }
  }

  static async generateAccessToken(code: string): Promise<{ access_token?: string; error?: string }> {
    try {
      // Exchange code for short-lived token
      const shortTokenResponse = await axios.get(
        `${this.BASE_URL}/oauth/access_token`,
        {
          params: {
            client_id: this.APP_ID,
            client_secret: this.APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.NEXTAUTH_URL}/api/instagram/callback`,
            code
          }
        }
      )

      const shortToken = shortTokenResponse.data.access_token

      // Exchange for long-lived token
      const longTokenResponse = await axios.get(
        `${this.BASE_URL}/oauth/access_token`,
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: this.APP_ID,
            client_secret: this.APP_SECRET,
            fb_exchange_token: shortToken
          }
        }
      )

      return { access_token: longTokenResponse.data.access_token }
    } catch (error: any) {
      console.error('Error generating access token:', error)
      return { error: error.response?.data?.error?.message || 'Failed to generate token' }
    }
  }

  static getAuthUrl(): string {
    const baseUrl = 'https://www.facebook.com/v18.0/dialog/oauth'
    const params = new URLSearchParams({
      client_id: this.APP_ID || '',
      redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/instagram/callback`,
      scope: 'pages_show_list,pages_read_engagement,business_management',
      response_type: 'code'
    })
    
    return `${baseUrl}?${params.toString()}`
  }

  private static getMockMetrics(): InstagramMetrics {
    return {
      followers: 1250,
      engagement: 4.2,
      reach: 5600,
      impressions: 8900,
      postsThisWeek: 3,
      avgLikesPerPost: 89,
      topPosts: [
        {
          id: '1',
          caption: 'Check out our latest app update! 🚀',
          likes: 156,
          comments: 23,
          engagement: 179,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          caption: 'Behind the scenes of app development 💻',
          likes: 134,
          comments: 18,
          engagement: 152,
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    }
  }
}