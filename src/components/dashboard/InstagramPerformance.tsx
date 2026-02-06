'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Heart, MessageCircle, Eye, BarChart3, Lightbulb, RefreshCw } from 'lucide-react'

interface InstagramPost {
  id: string
  caption: string
  media_type: string
  media_url: string
  permalink: string
  timestamp: string
  like_count: number
  comments_count: number
  engagement_rate: number
}

export default function InstagramPerformance() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const accessToken = localStorage.getItem('instagram_access_token')
      
      if (!accessToken) {
        setLoading(false)
        return
      }

      const response = await fetch('/api/instagram-analytics', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      
      const data = await response.json()
      
      if (data.success) {
        setPosts(data.posts)
        setRecommendations(data.recommendations)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    }
    setLoading(false)
  }

  const generateAIRecommendations = async () => {
    try {
      const response = await fetch('/api/instagram-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts })
      })
      
      const data = await response.json()
      if (data.success) {
        setRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error('Error generating recommendations:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!localStorage.getItem('instagram_access_token')) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-custom border border-neutral-200 text-center">
        <BarChart3 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">Connect Instagram</h3>
        <p className="text-neutral-600">Connect your Instagram account to view performance analytics</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600">Total Posts</span>
            <BarChart3 className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalPosts || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600">Avg Engagement</span>
            <TrendingUp className="w-5 h-5 text-secondary-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats?.avgEngagement?.toFixed(2) || 0}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600">Total Likes</span>
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalLikes || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600">Total Comments</span>
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalComments || 0}</p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Lightbulb className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">AI Recommendations</h3>
          </div>
          <button
            onClick={generateAIRecommendations}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            Generate New
          </button>
        </div>
        <div className="space-y-2">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2 bg-white bg-opacity-50 rounded-lg p-3">
              <span className="text-primary-600 font-bold">{index + 1}.</span>
              <p className="text-neutral-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts Performance */}
      <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Posts Performance</h3>
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
              <img
                src={post.media_url}
                alt="Post"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm text-neutral-700 line-clamp-2">{post.caption}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {new Date(post.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <Heart className="w-4 h-4 text-red-500 mx-auto mb-1" />
                  <span className="font-medium">{post.like_count}</span>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <span className="font-medium">{post.comments_count}</span>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
                  <span className="font-medium">{post.engagement_rate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
