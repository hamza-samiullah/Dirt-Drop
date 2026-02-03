export interface AppMetrics {
  totalDownloads: number
  dailyDownloads: number
  totalSignups: number
  dailySignups: number
  conversionRate: number
  retentionRate: number
  averageRating: number
  totalRevenue: number
}

export interface ChartData {
  date: string
  downloads: number
  signups: number
  revenue: number
}

export interface GeographicData {
  country: string
  downloads: number
  percentage: number
}

export interface DeviceData {
  platform: string
  downloads: number
  percentage: number
}

export interface InstagramMetrics {
  followers: number
  engagement: number
  reach: number
  impressions: number
  postsThisWeek: number
  avgLikesPerPost: number
}

export interface AIInsight {
  id: string
  type: 'recommendation' | 'alert' | 'trend' | 'opportunity'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionRequired: boolean
  timestamp: string
  priority?: 'urgent' | 'high' | 'medium' | 'low'
  expectedOutcome?: string
  timeframe?: 'immediate' | '1-2 weeks' | '1 month' | '3 months'
}

export interface CampaignData {
  id: string
  name: string
  platform: string
  status: 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  installs: number
  cpi: number
  roas: number
}

export interface ActivityItem {
  id: string
  type: 'download' | 'signup' | 'post' | 'campaign'
  description: string
  timestamp: string
  value?: number
}