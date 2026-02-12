'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, TrendingUp, Clock, Users, Sparkles } from 'lucide-react'

interface ContentSuggestion {
    id: string
    concept: string
    caption: string
    visualRecommendation: string
    bestPostingTime: string
    targetAudience: string
    engagementPrediction: 'high' | 'medium' | 'low'
    basedOnMetrics?: {
        totalInstalls: number
        topCountry: string
    }
}

export default function AIContentSuggestions() {
    const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedSuggestion, setSelectedSuggestion] = useState<ContentSuggestion | null>(null)

    useEffect(() => {
        loadSuggestions()
    }, [])

    const loadSuggestions = async () => {
        try {
            const response = await fetch('/api/content/suggestions')
            const data = await response.json()

            if (data.success) {
                setSuggestions(data.suggestions || [])
            }
        } catch (error) {
            console.error('Error loading suggestions:', error)
            // Load mock suggestions for demo
            setSuggestions([
                {
                    id: '1',
                    concept: 'Milestone Celebration',
                    caption: '🎉 We just hit 1,000 downloads! Thank you to our amazing community in Australia 🇦🇺 #milestone #grateful #appgrowth',
                    visualRecommendation: 'Confetti background with app icon and "1K Downloads" text overlay',
                    bestPostingTime: '2026-02-07T18:00:00Z',
                    targetAudience: 'Current users and potential downloaders',
                    engagementPrediction: 'high',
                    basedOnMetrics: {
                        totalInstalls: 1000,
                        topCountry: 'Australia'
                    }
                },
                {
                    id: '2',
                    concept: 'User Benefit Highlight',
                    caption: '⚡ Save 15+ hours per week with our app! Join thousands of productive users worldwide 🌍 #productivity #timemanagement',
                    visualRecommendation: 'Before/after split screen showing time saved',
                    bestPostingTime: '2026-02-08T12:00:00Z',
                    targetAudience: 'Busy professionals and entrepreneurs',
                    engagementPrediction: 'medium'
                },
                {
                    id: '3',
                    concept: 'Geographic Reach',
                    caption: '🌏 Now serving users in 15+ countries! Our community is growing globally 🚀 #global #expansion #worldwide',
                    visualRecommendation: 'World map with highlighted countries',
                    bestPostingTime: '2026-02-09T15:00:00Z',
                    targetAudience: 'International audience',
                    engagementPrediction: 'medium'
                },
                {
                    id: '4',
                    concept: 'Growth Showcase',
                    caption: '📈 200% growth this month! Thank you for making us one of the fastest-growing apps 💪 #growth #success #trending',
                    visualRecommendation: 'Upward trending graph with vibrant colors',
                    bestPostingTime: '2026-02-10T10:00:00Z',
                    targetAudience: 'Investors and potential users',
                    engagementPrediction: 'high'
                },
                {
                    id: '5',
                    concept: 'Call to Action',
                    caption: '🔥 Limited time: Get premium features free for 30 days! Download now 👇 #limitedoffer #premium #download',
                    visualRecommendation: 'Bold CTA with app store badges',
                    bestPostingTime: '2026-02-11T16:00:00Z',
                    targetAudience: 'New potential users',
                    engagementPrediction: 'high'
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleUseSuggestion = (suggestion: ContentSuggestion) => {
        setSelectedSuggestion(suggestion)
        // Store in localStorage for content manager to use
        localStorage.setItem('selectedSuggestion', JSON.stringify(suggestion))
        alert('Suggestion saved! Go to Content Manager to upload a matching visual.')
    }

    const getPredictionColor = (prediction: string) => {
        switch (prediction) {
            case 'high': return 'text-green-600 bg-green-50'
            case 'medium': return 'text-yellow-600 bg-yellow-50'
            case 'low': return 'text-gray-600 bg-gray-50'
            default: return 'text-gray-600 bg-gray-50'
        }
    }

    const formatPostingTime = (isoString: string) => {
        const date = new Date(isoString)
        return date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
                <div className="animate-pulse">
                    <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-neutral-100 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-custom">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">AI Content Suggestions</h2>
                </div>
                <p className="text-purple-100">
                    Daily AI-generated content ideas based on your app performance
                </p>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={suggestion.id}
                        className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200 hover:shadow-lg transition-shadow"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">{suggestion.concept}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getPredictionColor(suggestion.engagementPrediction)}`}>
                                        {suggestion.engagementPrediction.toUpperCase()} engagement
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="mb-4">
                            <p className="text-sm font-medium text-neutral-700 mb-2">Suggested Caption:</p>
                            <p className="text-neutral-900 bg-neutral-50 p-3 rounded-lg text-sm leading-relaxed">
                                {suggestion.caption}
                            </p>
                        </div>

                        {/* Visual Recommendation */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4 text-yellow-500" />
                                <p className="text-sm font-medium text-neutral-700">Visual Idea:</p>
                            </div>
                            <p className="text-sm text-neutral-600 bg-yellow-50 p-3 rounded-lg">
                                {suggestion.visualRecommendation}
                            </p>
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <div>
                                    <p className="text-xs text-neutral-500">Best Time</p>
                                    <p className="text-neutral-900 font-medium text-xs">
                                        {formatPostingTime(suggestion.bestPostingTime)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-green-500" />
                                <div>
                                    <p className="text-xs text-neutral-500">Target</p>
                                    <p className="text-neutral-900 font-medium text-xs truncate">
                                        {suggestion.targetAudience}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Based on Metrics */}
                        {suggestion.basedOnMetrics && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                    <p className="text-xs font-medium text-blue-900">Based on your metrics:</p>
                                </div>
                                <p className="text-xs text-blue-700">
                                    {suggestion.basedOnMetrics.totalInstalls.toLocaleString()} installs •
                                    Top market: {suggestion.basedOnMetrics.topCountry}
                                </p>
                            </div>
                        )}

                        {/* Action Button */}
                        <button
                            onClick={() => handleUseSuggestion(suggestion)}
                            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
                        >
                            Use This Idea
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {suggestions.length === 0 && (
                <div className="bg-white rounded-xl p-12 shadow-custom border border-neutral-200 text-center">
                    <Sparkles className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Suggestions Yet</h3>
                    <p className="text-neutral-600 mb-4">
                        AI content suggestions are generated daily at 9:00 AM based on your app performance.
                    </p>
                    <button
                        onClick={loadSuggestions}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Refresh Suggestions
                    </button>
                </div>
            )}
        </div>
    )
}
