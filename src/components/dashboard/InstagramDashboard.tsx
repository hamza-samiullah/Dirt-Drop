'use client'

import { useState, useEffect } from 'react'
import { Instagram, Users, Heart, Eye, TrendingUp, Plus, Settings, ExternalLink } from 'lucide-react'
import { InstagramMetrics } from '@/lib/integrations/instagram'

interface InstagramDashboardProps {
  metrics?: InstagramMetrics
}

export default function InstagramDashboard({ metrics }: InstagramDashboardProps) {
  const [contentSuggestions, setContentSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (metrics) {
      generateContentSuggestions()
    }
  }, [metrics])

  const generateContentSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'content',
          instagramData: metrics 
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setContentSuggestions(data.data || [])
      }
    } catch (error) {
      console.error('Error generating content suggestions:', error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Instagram Performance</h1>
            <p className="text-neutral-600 mt-1">AI-powered content automation and analytics</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Followers</p>
                <p className="text-2xl font-bold text-neutral-900">{metrics.followers.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-pink-100">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold text-neutral-900">{metrics.engagement.toFixed(1)}%</p>
              </div>
              <div className="p-3 rounded-xl bg-red-100">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Reach</p>
                <p className="text-2xl font-bold text-neutral-900">{metrics.reach.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Posts This Week</p>
                <p className="text-2xl font-bold text-neutral-900">{metrics.postsThisWeek}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">AI Content Suggestions</h3>
            <button
              onClick={generateContentSuggestions}
              disabled={loading}
              className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Refresh'}
            </button>
          </div>
          
          <div className="space-y-3">
            {contentSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <p className="text-sm text-neutral-700">{suggestion}</p>
                <div className="flex justify-end mt-2">
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Use This Idea
                  </button>
                </div>
              </div>
            ))}
            
            {contentSuggestions.length === 0 && !loading && (
              <p className="text-neutral-500 text-center py-4">
                Click "Refresh" to generate AI content suggestions
              </p>
            )}
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Top Performing Posts</h3>
          
          <div className="space-y-4">
            {metrics?.topPosts.map((post) => (
              <div key={post.id} className="p-4 border border-neutral-200 rounded-lg">
                <p className="text-sm text-neutral-700 mb-2 line-clamp-2">
                  {post.caption || 'No caption'}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center space-x-4">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {(!metrics?.topPosts || metrics.topPosts.length === 0) && (
              <p className="text-neutral-500 text-center py-4">
                No posts data available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Automation Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">✅ Instagram Connected</h3>
            <p className="text-neutral-600">
              Your Instagram is connected via Graph API. Use Content Manager to upload and post content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}