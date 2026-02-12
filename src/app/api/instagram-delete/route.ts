import { NextRequest, NextResponse } from 'next/server'
import { InstagramService } from '@/lib/services/instagram'

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId } = body

    if (!postId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Post ID is required' 
      }, { status: 400 })
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    
    if (!accessToken) {
      return NextResponse.json({ 
        success: false, 
        error: 'Instagram credentials not configured' 
      }, { status: 400 })
    }

    const result = await InstagramService.deletePost(postId, accessToken)

    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error || 'Failed to delete post' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    })
  } catch (error: any) {
    console.error('Error deleting Instagram post:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to delete post' 
    }, { status: 500 })
  }
}
