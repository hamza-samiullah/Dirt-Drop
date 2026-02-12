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
  const [posts, setPosts] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadInstagramData()
  }, [])

  const loadInstagramData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/instagram-analytics')
      const data = await response.json()
      
      if (data.success) {
        setPosts(data.posts || [])
        setStats(data.stats || {})
        setContentSuggestions(data.recommendations || [])
      }
    } catch (error) {
      console.error('Error loading Instagram data:', error)
    }
    setLoading(false)
  }

  const generateContentSuggestions = async () => {
    setLoading(true)
    await loadInstagramData()
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
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Total Posts</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalPosts || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-pink-100">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Avg Engagement</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.avgEngagement?.toFixed(1) || 0}%</p>
              </div>
              <div className="p-3 rounded-xl bg-red-100">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Total Likes</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalLikes || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Total Comments</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalComments || 0}</p>
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
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-start space-x-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                {post.media_url && post.media_type !== 'VIDEO' && (
                  <img 
                    src={post.media_url} 
                    alt="Post" 
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpath d="m21 15-5-5L5 21"%3E%3C/path%3E%3C/svg%3E'
                    }}
                  />
                )}
                {post.media_type === 'VIDEO' && (
                  <div className="w-16 h-16 bg-neutral-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-700 line-clamp-2 mb-2">
                    {post.caption || 'No caption'}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-neutral-500">
                    <span>❤️ {post.like_count}</span>
                    <span>💬 {post.comments_count}</span>
                    <span>📊 {post.engagement_rate.toFixed(1)}%</span>
                  </div>
                </div>
                {post.permalink && (
                  <a 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
            
            {posts.length === 0 && !loading && (
              <p className="text-neutral-500 text-center py-8">
                No posts yet. Start posting to see analytics!
              </p>
            )}
            
            {loading && (
              <p className="text-neutral-500 text-center py-8">
                Loading posts...
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