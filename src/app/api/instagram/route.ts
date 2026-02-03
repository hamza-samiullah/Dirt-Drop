import { NextRequest, NextResponse } from 'next/server'
import { InstagramService } from '@/lib/integrations/instagram'

export async function GET() {
  try {
    const authUrl = InstagramService.getAuthUrl()
    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error('Error generating Instagram auth URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate auth URL' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, accessToken, businessAccountId, postData, code } = body

    switch (action) {
      case 'getMetrics':
        if (!accessToken || !businessAccountId) {
          return NextResponse.json(
            { error: 'Access token and business account ID required' },
            { status: 400 }
          )
        }
        
        const metrics = await InstagramService.getAccountMetrics(accessToken, businessAccountId)
        return NextResponse.json({ success: true, metrics })

      case 'createPost':
        if (!accessToken || !businessAccountId || !postData) {
          return NextResponse.json(
            { error: 'Access token, business account ID, and post data required' },
            { status: 400 }
          )
        }
        
        const result = await InstagramService.createPost(accessToken, businessAccountId, postData)
        return NextResponse.json(result)

      case 'generateToken':
        if (!code) {
          return NextResponse.json(
            { error: 'Authorization code required' },
            { status: 400 }
          )
        }
        
        const tokenResult = await InstagramService.generateAccessToken(code)
        return NextResponse.json(tokenResult)

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Instagram API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}