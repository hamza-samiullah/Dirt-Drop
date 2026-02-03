import OpenAI from 'openai'
import { AIInsight } from '@/types/dashboard'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class AIInsightsService {
  static async generateComprehensiveInsights(appData: any): Promise<AIInsight[]> {
    try {
      const prompt = `
        You are an expert mobile app marketing consultant. Analyze the following comprehensive app performance data and provide 4-6 specific, actionable insights and recommendations for the app owner.
        
        APP PERFORMANCE DATA:
        - Total Installs: ${appData.totalInstalls}
        - Organic Rate: ${appData.organicRate?.toFixed(1)}%
        - Average CPI: $${appData.averageCPI?.toFixed(2)}
        - Day 1 Retention: ${appData.retentionDay1?.toFixed(1)}%
        - Day 7 Retention: ${appData.retentionDay7?.toFixed(1)}%
        - Day 30 Retention: ${appData.retentionDay30?.toFixed(1)}%
        - Total Revenue: $${appData.totalRevenue}
        - Overall ROAS: ${appData.roas?.toFixed(2)}
        - Top Performing Campaign: ${appData.topPerformingCampaign}
        - Top Country: ${appData.topCountry}
        - Recent Trend: ${appData.recentTrend}
        - Cohort Performance: ${appData.cohortPerformance}
        - Media Source Performance: ${appData.mediaSourcePerformance}
        
        CONTEXT:
        - This is a mobile app with ${appData.totalInstalls} total installs
        - The app generates revenue (likely freemium or paid)
        - Owner wants specific actionable advice to improve performance
        
        Provide insights in JSON format with this exact structure:
        {
          "insights": [
            {
              "type": "recommendation|alert|trend|opportunity",
              "title": "Brief, specific title (max 50 chars)",
              "description": "Detailed, actionable advice with specific steps and expected outcomes (100-200 words)",
              "impact": "high|medium|low",
              "actionRequired": true|false,
              "priority": "urgent|high|medium|low",
              "expectedOutcome": "Specific measurable outcome",
              "timeframe": "immediate|1-2 weeks|1 month|3 months"
            }
          ]
        }
        
        Focus on:
        1. User acquisition optimization
        2. Retention improvement strategies
        3. Revenue optimization
        4. Campaign performance improvements
        5. Geographic expansion opportunities
        6. Cost optimization
        
        Make recommendations specific to the data provided. If retention is low, suggest specific tactics. If CPI is high, suggest optimization strategies. If organic rate is low, suggest ASO improvements.
      `

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      })

      const content = response.choices[0]?.message?.content
      if (!content) throw new Error('No response from OpenAI')

      const parsed = JSON.parse(content)
      
      return parsed.insights.map((insight: any, index: number) => ({
        id: `ai-insight-${Date.now()}-${index}`,
        ...insight,
        timestamp: new Date().toISOString(),
      }))
    } catch (error) {
      console.error('Error generating AI insights:', error)
      return this.getFallbackInsights(appData)
    }
  }

  static async generateContentSuggestions(performanceData: any): Promise<string[]> {
    try {
      const prompt = `
        Based on the following app performance data, suggest 5 specific Instagram content ideas that could drive app downloads:
        
        - App has ${performanceData.totalInstalls} installs
        - Top country: ${performanceData.topCountry}
        - Recent trend: ${performanceData.recentTrend}
        - Top campaign: ${performanceData.topPerformingCampaign}
        - Retention rate: ${performanceData.retentionDay30}%
        
        Provide suggestions as a JSON array of strings, each being a specific, actionable content idea that addresses the app's current performance metrics.
      `

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
      })

      const content = response.choices[0]?.message?.content
      if (!content) throw new Error('No response from OpenAI')

      return JSON.parse(content)
    } catch (error) {
      console.error('Error generating content suggestions:', error)
      return [
        'Share user success stories and testimonials',
        'Create behind-the-scenes app development content',
        'Post feature highlights with real user scenarios',
        'Share industry tips and educational content',
        'Create engaging polls about user preferences'
      ]
    }
  }

  static async generateMarketingStrategy(appData: any): Promise<string> {
    try {
      const prompt = `
        Create a comprehensive marketing strategy for a mobile app with the following performance:
        
        - Total Installs: ${appData.totalInstalls}
        - Organic Rate: ${appData.organicRate?.toFixed(1)}%
        - CPI: $${appData.averageCPI?.toFixed(2)}
        - Retention (Day 30): ${appData.retentionDay30?.toFixed(1)}%
        - ROAS: ${appData.roas?.toFixed(2)}
        - Top Country: ${appData.topCountry}
        - Trend: ${appData.recentTrend}
        
        Provide a detailed 3-month marketing strategy with specific tactics, budget recommendations, and expected outcomes. Format as a comprehensive plan with sections for:
        1. Immediate Actions (Week 1-2)
        2. Short-term Strategy (Month 1)
        3. Medium-term Strategy (Month 2-3)
        4. Budget Allocation
        5. Success Metrics
      `

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 1500,
      })

      return response.choices[0]?.message?.content || 'Strategy generation failed'
    } catch (error) {
      console.error('Error generating marketing strategy:', error)
      return 'Unable to generate marketing strategy at this time.'
    }
  }

  private static getFallbackInsights(appData: any): AIInsight[] {
    const insights: AIInsight[] = []
    
    // Analyze retention
    if (appData.retentionDay30 < 25) {
      insights.push({
        id: 'retention-improvement',
        type: 'recommendation',
        title: 'Improve User Retention',
        description: `Your 30-day retention rate of ${appData.retentionDay30?.toFixed(1)}% is below industry average. Implement onboarding improvements, push notification campaigns, and in-app engagement features to boost retention by 10-15%.`,
        impact: 'high',
        actionRequired: true,
        priority: 'high',
        expectedOutcome: 'Increase 30-day retention to 30%+',
        timeframe: '1 month',
        timestamp: new Date().toISOString()
      })
    }

    // Analyze CPI
    if (appData.averageCPI > 30) {
      insights.push({
        id: 'cpi-optimization',
        type: 'alert',
        title: 'High Cost Per Install',
        description: `Your average CPI of $${appData.averageCPI?.toFixed(2)} is above optimal range. Focus on improving ad creative, targeting, and bidding strategies. Consider increasing organic acquisition through ASO improvements.`,
        impact: 'high',
        actionRequired: true,
        priority: 'urgent',
        expectedOutcome: 'Reduce CPI by 20-30%',
        timeframe: '2 weeks',
        timestamp: new Date().toISOString()
      })
    }

    // Analyze organic rate
    if (appData.organicRate < 40) {
      insights.push({
        id: 'organic-growth',
        type: 'opportunity',
        title: 'Boost Organic Acquisition',
        description: `Only ${appData.organicRate?.toFixed(1)}% of installs are organic. Invest in App Store Optimization (ASO), encourage user reviews, and implement referral programs to increase organic discovery and reduce dependency on paid channels.`,
        impact: 'medium',
        actionRequired: true,
        priority: 'medium',
        expectedOutcome: 'Increase organic rate to 50%+',
        timeframe: '3 months',
        timestamp: new Date().toISOString()
      })
    }

    // Analyze trend
    if (appData.recentTrend === 'declining' || appData.recentTrend === 'rapidly_declining') {
      insights.push({
        id: 'trend-reversal',
        type: 'alert',
        title: 'Declining Install Trend',
        description: 'Your recent install trend is declining. Immediately review and refresh ad creatives, expand to new audiences, and consider seasonal promotions or feature launches to re-engage your target market.',
        impact: 'high',
        actionRequired: true,
        priority: 'urgent',
        expectedOutcome: 'Reverse declining trend within 2 weeks',
        timeframe: 'immediate',
        timestamp: new Date().toISOString()
      })
    }

    return insights.length > 0 ? insights : [{
      id: 'general-optimization',
      type: 'recommendation',
      title: 'Continue Optimization',
      description: 'Your app performance shows good potential. Focus on scaling successful campaigns, improving user onboarding, and expanding to new geographic markets to accelerate growth.',
      impact: 'medium',
      actionRequired: false,
      priority: 'medium',
      expectedOutcome: 'Sustained growth trajectory',
      timeframe: '1 month',
      timestamp: new Date().toISOString()
    }]
  }

  // Legacy method for backward compatibility
  static async generateInsights(metricsData: any): Promise<AIInsight[]> {
    return this.generateComprehensiveInsights(metricsData)
  }
}