import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// This endpoint receives AI-generated content suggestions from Make.com Workflow 4
// and stores them for the dashboard to display

interface ContentSuggestion {
    concept: string
    caption: string
    visualRecommendation: string
    bestPostingTime: string
    targetAudience: string
    engagementPrediction: 'high' | 'medium' | 'low'
    basedOnMetrics?: {
        totalInstalls: number
        topCountry: string
        retentionRate: number
    }
}

// In-memory storage (replace with database in production)
let cachedSuggestions: ContentSuggestion[] = []
let lastUpdated: Date | null = null

export async function GET() {
    try {
        // Return cached suggestions if available and less than 24 hours old
        if (cachedSuggestions.length > 0 && lastUpdated) {
            const hoursSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60)
            if (hoursSinceUpdate < 24) {
                return NextResponse.json({
                    success: true,
                    suggestions: cachedSuggestions,
                    lastUpdated: lastUpdated.toISOString(),
                    source: 'cache'
                })
            }
        }

        // If no cached data or expired, return empty array
        // Make.com Workflow 4 will populate this daily
        return NextResponse.json({
            success: true,
            suggestions: [],
            message: 'No suggestions available. AI suggestions are generated daily at 9:00 AM.'
        })
    } catch (error: any) {
        console.error('Error fetching suggestions:', error)
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to fetch suggestions'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { suggestions, basedOnMetrics, generatedAt } = body

        // Parse suggestions if they come as a JSON string
        let parsedSuggestions: ContentSuggestion[]
        if (typeof suggestions === 'string') {
            parsedSuggestions = JSON.parse(suggestions)
        } else {
            parsedSuggestions = suggestions
        }

        // Add IDs and metrics to each suggestion
        const enrichedSuggestions = parsedSuggestions.map((suggestion, index) => ({
            id: `${Date.now()}-${index}`,
            ...suggestion,
            basedOnMetrics: basedOnMetrics || suggestion.basedOnMetrics
        }))

        // Store in cache
        cachedSuggestions = enrichedSuggestions
        lastUpdated = new Date(generatedAt || Date.now())

        console.log(`Received ${enrichedSuggestions.length} AI content suggestions from Make.com`)

        return NextResponse.json({
            success: true,
            message: `${enrichedSuggestions.length} suggestions stored successfully`,
            count: enrichedSuggestions.length
        })
    } catch (error: any) {
        console.error('Error storing suggestions:', error)
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to store suggestions'
        }, { status: 500 })
    }
}
