import { NextRequest, NextResponse } from 'next/server'
import { GoogleDriveService } from '@/lib/integrations/googledrive'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const content = await GoogleDriveService.listContent()
    return NextResponse.json({ success: true, content })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, fileId, caption, scheduledTime } = body

    if (action === 'approve') {
      const webhookUrl = process.env.MAKE_CONTENT_WEBHOOK
      
      if (!webhookUrl) {
        return NextResponse.json({ success: false, error: 'Webhook not configured' }, { status: 400 })
      }

      const imageUrl = GoogleDriveService.getPublicUrl(fileId)
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'post_to_instagram',
          fileId,
          imageUrl,
          caption,
          scheduledTime: scheduledTime || new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to trigger webhook')
      }

      return NextResponse.json({ success: true, message: 'Content approved and queued for posting' })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing content:', error)
    return NextResponse.json({ success: false, error: 'Failed to process content' }, { status: 500 })
  }
}
