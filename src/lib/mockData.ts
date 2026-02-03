import { AppMetrics, ChartData, GeographicData, DeviceData, InstagramMetrics, AIInsight, CampaignData, ActivityItem } from '@/types/dashboard'

export class MockDataService {
  static getAppMetrics(): AppMetrics {
    return {
      totalDownloads: 45678,
      dailyDownloads: 234,
      totalSignups: 12456,
      dailySignups: 89,
      conversionRate: 27.3,
      retentionRate: 68.5,
      averageRating: 4.2,
      totalRevenue: 23450
    }
  }

  static getChartData(): ChartData[] {
    const data = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString().split('T')[0],
        downloads: Math.floor(Math.random() * 300) + 100,
        signups: Math.floor(Math.random() * 100) + 30,
        revenue: Math.floor(Math.random() * 1000) + 200
      })
    }
    return data
  }

  static getGeographicData(): GeographicData[] {
    return [
      { country: 'United States', downloads: 15234, percentage: 33.4 },
      { country: 'United Kingdom', downloads: 8765, percentage: 19.2 },
      { country: 'Canada', downloads: 6543, percentage: 14.3 },
      { country: 'Australia', downloads: 4321, percentage: 9.5 },
      { country: 'Germany', downloads: 3456, percentage: 7.6 },
      { country: 'Others', downloads: 7359, percentage: 16.0 }
    ]
  }

  static getDeviceData(): DeviceData[] {
    return [
      { platform: 'iOS', downloads: 27406, percentage: 60.0 },
      { platform: 'Android', downloads: 18272, percentage: 40.0 }
    ]
  }

  static getInstagramMetrics(): InstagramMetrics {
    return {
      followers: 8945,
      engagement: 4.7,
      reach: 23456,
      impressions: 45678,
      postsThisWeek: 5,
      avgLikesPerPost: 234
    }
  }

  static getAIInsights(): AIInsight[] {
    return [
      {
        id: '1',
        type: 'recommendation',
        title: 'Optimize Posting Schedule',
        description: 'Your posts perform 23% better when published between 2-4 PM EST. Consider scheduling more content during this window.',
        impact: 'high',
        actionRequired: true,
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'trend',
        title: 'Download Spike Detected',
        description: 'App downloads increased by 45% in the last 3 days. This correlates with your recent Instagram campaign.',
        impact: 'medium',
        actionRequired: false,
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        type: 'alert',
        title: 'Conversion Rate Drop',
        description: 'Signup conversion rate has decreased by 8% this week. Review your onboarding flow for potential issues.',
        impact: 'high',
        actionRequired: true,
        timestamp: new Date().toISOString()
      }
    ]
  }

  static getCampaignData(): CampaignData[] {
    return [
      {
        id: '1',
        name: 'Instagram Awareness Q4',
        platform: 'Instagram',
        status: 'active',
        budget: 5000,
        spent: 3240,
        installs: 1456,
        cpi: 2.22,
        roas: 3.4
      },
      {
        id: '2',
        name: 'Facebook Retargeting',
        platform: 'Facebook',
        status: 'active',
        budget: 2000,
        spent: 1890,
        installs: 678,
        cpi: 2.79,
        roas: 2.8
      },
      {
        id: '3',
        name: 'Google UAC',
        platform: 'Google',
        status: 'paused',
        budget: 3000,
        spent: 2100,
        installs: 945,
        cpi: 2.22,
        roas: 4.1
      }
    ]
  }

  static getRecentActivity(): ActivityItem[] {
    return [
      {
        id: '1',
        type: 'download',
        description: 'New app download from United States',
        timestamp: '2 minutes ago'
      },
      {
        id: '2',
        type: 'signup',
        description: 'User completed signup process',
        timestamp: '5 minutes ago'
      },
      {
        id: '3',
        type: 'post',
        description: 'Instagram post published: "5 Tips for Better Productivity"',
        timestamp: '1 hour ago'
      },
      {
        id: '4',
        type: 'campaign',
        description: 'Instagram Awareness campaign budget increased',
        timestamp: '3 hours ago',
        value: 500
      },
      {
        id: '5',
        type: 'download',
        description: 'New app download from Canada',
        timestamp: '4 hours ago'
      }
    ]
  }
}