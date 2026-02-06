'use client'

import { Brain, AlertTriangle, TrendingUp, Lightbulb, Clock, Target, Zap } from 'lucide-react'
import { AIInsight } from '@/types/dashboard'

interface AIInsightsProps {
  insights: AIInsight[]
}

function getInsightIcon(type: string) {
  switch (type) {
    case 'recommendation':
      return <Lightbulb className="w-5 h-5" />
    case 'alert':
      return <AlertTriangle className="w-5 h-5" />
    case 'trend':
      return <TrendingUp className="w-5 h-5" />
    case 'opportunity':
      return <Target className="w-5 h-5" />
    default:
      return <Brain className="w-5 h-5" />
  }
}

function getInsightColor(type: string, impact: string) {
  if (type === 'alert') {
    return 'border-red-200 bg-red-50'
  }
  if (type === 'opportunity') {
    return 'border-green-200 bg-green-50'
  }
  if (impact === 'high') {
    return 'border-accent-200 bg-accent-50'
  }
  if (impact === 'medium') {
    return 'border-primary-200 bg-primary-50'
  }
  return 'border-secondary-200 bg-secondary-50'
}

function getIconColor(type: string, impact: string) {
  if (type === 'alert') {
    return 'text-red-600'
  }
  if (type === 'opportunity') {
    return 'text-green-600'
  }
  if (impact === 'high') {
    return 'text-accent-600'
  }
  if (impact === 'medium') {
    return 'text-primary-600'
  }
  return 'text-secondary-600'
}

function getPriorityBadge(priority?: string) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  
  switch (priority) {
    case 'urgent':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'high':
      return `${baseClasses} bg-orange-100 text-orange-800`
    case 'medium':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'low':
      return `${baseClasses} bg-green-100 text-green-800`
    default:
      return `${baseClasses} bg-neutral-100 text-neutral-800`
  }
}

function getImpactBadge(impact: string) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  
  switch (impact) {
    case 'high':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'medium':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'low':
      return `${baseClasses} bg-green-100 text-green-800`
    default:
      return `${baseClasses} bg-neutral-100 text-neutral-800`
  }
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">AI Marketing Insights</h2>
            <p className="text-sm text-neutral-600">Powered by ChatGPT analysis of your AppsFlyer data</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-neutral-500">
          <Zap className="w-4 h-4 mr-1 text-accent-600" />
          Live Analysis
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`
              p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-custom-lg
              ${getInsightColor(insight.type, insight.impact)}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`${getIconColor(insight.type, insight.impact)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{insight.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={getImpactBadge(insight.impact)}>
                      {insight.impact.toUpperCase()} IMPACT
                    </span>
                    {insight.priority && (
                      <span className={getPriorityBadge(insight.priority)}>
                        {insight.priority.toUpperCase()} PRIORITY
                      </span>
                    )}
                    {insight.actionRequired && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        ACTION REQUIRED
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs text-neutral-500">
                {insight.timeframe && (
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {insight.timeframe}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-neutral-700 leading-relaxed mb-4">
              {insight.description}
            </p>
            
            {insight.expectedOutcome && (
              <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-neutral-800">
                  <span className="text-secondary-600">Expected Outcome:</span> {insight.expectedOutcome}
                </p>
              </div>
            )}
            
            {insight.actionRequired && (
              <div className="flex space-x-3">
                <button 
                  onClick={() => alert(`Taking action on: ${insight.title}\n\nThis would typically:\n- Open a detailed action plan\n- Connect to relevant tools\n- Track implementation progress`)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                >
                  Take Action
                </button>
                <button 
                  onClick={() => alert(`Learn more about: ${insight.title}\n\n${insight.description}\n\nExpected Outcome: ${insight.expectedOutcome || 'Improved performance'}\n\nThis would typically open detailed documentation and best practices.`)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-sm font-medium"
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {insights.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Generating AI Insights...</h3>
          <p className="text-neutral-600">AI is analyzing your AppsFlyer data to provide personalized recommendations.</p>
        </div>
      )}

      {/* Quick Actions Panel */}
      {insights.length > 0 && (
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">Quick Actions Based on AI Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => alert('Optimize Campaigns\n\nThis would:\n- Review campaign performance\n- Identify underperforming ads\n- Suggest budget reallocation\n- A/B test recommendations')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 text-left transition-all duration-200"
            >
              <div className="font-medium">Optimize Campaigns</div>
              <div className="text-sm opacity-90">Review and adjust underperforming campaigns</div>
            </button>
            <button 
              onClick={() => alert('Improve Retention\n\nThis would:\n- Analyze user drop-off points\n- Implement push notifications\n- Create engagement campaigns\n- Improve onboarding flow')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 text-left transition-all duration-200"
            >
              <div className="font-medium">Improve Retention</div>
              <div className="text-sm opacity-90">Implement user engagement strategies</div>
            </button>
            <button 
              onClick={() => alert('Expand Markets\n\nThis would:\n- Identify high-potential regions\n- Localize app content\n- Target new demographics\n- Analyze competitor presence')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 text-left transition-all duration-200"
            >
              <div className="font-medium">Expand Markets</div>
              <div className="text-sm opacity-90">Target high-potential geographic regions</div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}