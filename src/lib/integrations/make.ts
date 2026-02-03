export interface MakeWebhookPayload {
  action: 'create_post' | 'schedule_post' | 'generate_content'
  content: {
    caption: string
    image_url?: string
    video_url?: string
    hashtags: string[]
    post_time?: string
  }
  app_metrics: {
    total_installs: number
    daily_installs: number
    retention_rate: number
    top_country: string
    growth_rate?: number
    revenue?: number
  }
  trigger_type: 'milestone' | 'daily' | 'feature' | 'manual'
}

export class MakeWebhookService {
  private static readonly INSTAGRAM_WEBHOOK = process.env.MAKE_INSTAGRAM_WEBHOOK
  private static readonly CONTENT_WEBHOOK = process.env.MAKE_CONTENT_WEBHOOK

  static async triggerInstagramPost(payload: MakeWebhookPayload): Promise<boolean> {
    if (!this.INSTAGRAM_WEBHOOK) {
      console.error('Make.com Instagram webhook URL not configured')
      return false
    }

    try {
      const response = await fetch(this.INSTAGRAM_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        console.log('Successfully triggered Instagram post via Make.com')
        return true
      } else {
        console.error('Make.com webhook failed:', response.status, response.statusText)
        return false
      }
    } catch (error) {
      console.error('Error triggering Make.com webhook:', error)
      return false
    }
  }

  static async generateContentSuggestion(appMetrics: any): Promise<string[]> {
    if (!this.CONTENT_WEBHOOK) {
      return this.getFallbackContent(appMetrics)
    }

    try {
      const payload = {
        action: 'generate_content',
        app_metrics: appMetrics,
        content_type: 'instagram_captions',
        count: 5
      }

      const response = await fetch(this.CONTENT_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const data = await response.json()
        return data.suggestions || this.getFallbackContent(appMetrics)
      }
    } catch (error) {
      console.error('Error generating content via Make.com:', error)
    }

    return this.getFallbackContent(appMetrics)
  }

  static createMilestonePost(installs: number, milestone: number): MakeWebhookPayload {
    return {
      action: 'create_post',
      content: {
        caption: `🎉 We just hit ${milestone.toLocaleString()} downloads! Thank you to our amazing users for making this possible. Your support drives us to keep improving! #milestone #grateful #app`,
        hashtags: ['#milestone', '#grateful', '#app', '#thankyou', '#community'],
        post_time: new Date().toISOString()
      },
      app_metrics: {
        total_installs: installs,
        daily_installs: 0,
        retention_rate: 0,
        top_country: 'Global'
      },
      trigger_type: 'milestone'
    }
  }

  static createDailyPerformancePost(metrics: any): MakeWebhookPayload {
    const growthRate = metrics.dailyInstalls > 0 ? 
      ((metrics.dailyInstalls / metrics.totalInstalls) * 100).toFixed(1) : '0'

    return {
      action: 'create_post',
      content: {
        caption: `📊 Daily Update: ${metrics.dailyInstalls} new downloads today! Our app now has ${metrics.totalInstalls} total installs with ${metrics.retentionRate}% retention rate. Growing strong! 💪 #appgrowth #metrics #progress`,
        hashtags: ['#appgrowth', '#metrics', '#progress', '#dailyupdate', '#mobile'],
        post_time: new Date().toISOString()
      },
      app_metrics: {
        total_installs: metrics.totalInstalls,
        daily_installs: metrics.dailyInstalls,
        retention_rate: metrics.retentionRate,
        top_country: metrics.topCountry || 'Global',
        growth_rate: parseFloat(growthRate)
      },
      trigger_type: 'daily'
    }
  }

  static createFeatureAnnouncementPost(featureName: string, description: string): MakeWebhookPayload {
    return {
      action: 'create_post',
      content: {
        caption: `🚀 New Feature Alert: ${featureName}! ${description} Update your app now to try it out! #newfeature #update #innovation`,
        hashtags: ['#newfeature', '#update', '#innovation', '#app', '#mobile'],
        post_time: new Date().toISOString()
      },
      app_metrics: {
        total_installs: 0,
        daily_installs: 0,
        retention_rate: 0,
        top_country: 'Global'
      },
      trigger_type: 'feature'
    }
  }

  private static getFallbackContent(appMetrics: any): string[] {
    return [
      `🎯 Our app has reached ${appMetrics.totalInstalls} downloads! Thank you for your support! #milestone #grateful`,
      `📈 Daily growth: ${appMetrics.dailyInstalls} new users joined us today! Welcome aboard! #growth #community`,
      `🌟 ${appMetrics.retentionRate}% of our users love the app so much they keep coming back! #retention #quality`,
      `🌍 Users from ${appMetrics.topCountry} are leading our global community! Where are you from? #global #community`,
      `💡 Behind the scenes: Our team is working hard to bring you the best mobile experience! #team #development`
    ]
  }
}