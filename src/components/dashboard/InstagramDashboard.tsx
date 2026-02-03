'use client'

import { useState, useEffect } from 'react'
import { Instagram, Users, Heart, Eye, TrendingUp, Plus, Settings, ExternalLink } from 'lucide-react'
import { InstagramMetrics } from '@/lib/integrations/instagram'

interface InstagramDashboardProps {
  metrics?: InstagramMetrics
  isConnected: boolean
  onConnect: () => void
}

export default function InstagramDashboard({ metrics, isConnected, onConnect }: InstagramDashboardProps) {
  const [contentSuggestions, setContentSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected && metrics) {
      generateContentSuggestions()
    }
  }, [isConnected, metrics])

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

  if (!isConnected) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <h1 className="text-2xl font-bold text-neutral-900">Instagram Integration</h1>
          <p className="text-neutral-600 mt-1">Connect your Instagram Business account to start automating posts</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-8 border border-pink-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Connect Your Instagram Business Account
            </h2>
            
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Integrate your Instagram Business account to automatically post AI-generated content, 
              track performance metrics, and optimize your social media strategy based on app analytics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Auto-Post Content</h3>
                <p className="text-sm text-neutral-600">AI generates and schedules posts based on your app performance</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Track Performance</h3>
                <p className="text-sm text-neutral-600">Monitor engagement and correlate with app downloads</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Smart Optimization</h3>
                <p className="text-sm text-neutral-600">AI optimizes posting times and content for maximum impact</p>
              </div>
            </div>

            <button
              onClick={onConnect}
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Connect Instagram Business Account
            </button>
            
            <p className="text-xs text-neutral-500 mt-4">
              Secure OAuth integration • No password required • Revoke access anytime
            </p>
          </div>
        </div>
      </div>
    )
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
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Make.com Automation</h3>
            <p className="text-neutral-600">
              Your Instagram posting automation is ready. Configure Make.com scenarios to start auto-posting.
            </p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
            View Setup Guide
          </button>
        </div>
      </div>
    </div>
  )
}