import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readdir, stat, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { AIService } from '@/lib/services/ai'
import { InstagramService } from '@/lib/services/instagram'

export const dynamic = 'force-dynamic'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

export async function GET() {
  try {
    await ensureUploadDir()
    const files = await readdir(UPLOAD_DIR)
    
    const content = await Promise.all(
      files.map(async (file) => {
        const filePath = join(UPLOAD_DIR, file)
        const stats = await stat(filePath)
        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        const isVideo = /\.(mp4|mov|avi)$/i.test(file)
        
        if (!isImage && !isVideo) return null
        
        return {
          id: file,
          name: file,
          url: `/uploads/${file}`,
          thumbnailUrl: `/uploads/${file}`,
          mimeType: isImage ? 'image/jpeg' : 'video/mp4',
          createdTime: stats.birthtime.toISOString(),
          size: stats.size,
          status: 'draft' as const,
        }
      })
    )
    
    return NextResponse.json({ 
      success: true, 
      content: content.filter(Boolean) 
    })
  } catch (error: any) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to fetch content' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    
    // Handle file upload
    if (contentType?.includes('multipart/form-data')) {
      await ensureUploadDir()
      
      const formData = await request.formData()
      const file = formData.get('file') as File
      
      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = join(UPLOAD_DIR, filename)
      
      await writeFile(filepath, buffer)
      
      // Generate AI suggestions automatically
      const postType = file.type.startsWith('video') ? 'reel' : 'photo'
      const suggestions = await AIService.generateCaptionSuggestions(file.name, postType)
      
      return NextResponse.json({ 
        success: true, 
        fileId: filename,
        url: `/uploads/${filename}`,
        suggestions,
        message: 'File uploaded and AI suggestions generated' 
      })
    }

    // Handle content approval and direct Instagram posting
    const body = await request.json()
    const { action, fileId, caption } = body

    if (action === 'approve') {
      const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
      const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
      
      if (!accessToken || !businessAccountId) {
        return NextResponse.json({ 
          success: false, 
          error: 'Instagram credentials not configured. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID to .env.local' 
        }, { status: 400 })
      }

      const baseUrl = (process.env.NEXTAUTH_URL || request.headers.get('origin') || 'http://localhost:3000').replace(/\/$/, '')
      const mediaUrl = `${baseUrl}/uploads/${fileId}`
      const isVideo = /\.(mp4|mov|avi)$/i.test(fileId)
      
      console.log('Posting to Instagram:', { mediaUrl, isVideo, caption })
      
      // Post directly to Instagram
      const result = isVideo 
        ? await InstagramService.publishReel(mediaUrl, caption, accessToken, businessAccountId)
        : await InstagramService.publishPhoto(mediaUrl, caption, accessToken, businessAccountId)

      console.log('Instagram result:', result)

      if (!result.success) {
        return NextResponse.json({ 
          success: false, 
          error: result.error || 'Failed to post to Instagram' 
        }, { status: 500 })
      }

      return NextResponse.json({ 
        success: true, 
        postId: result.postId,
        message: 'Successfully posted to Instagram!' 
      })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Error processing content:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to process content' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { fileId } = body

    if (!fileId) {
      return NextResponse.json({ success: false, error: 'No file ID provided' }, { status: 400 })
    }

    const filepath = join(UPLOAD_DIR, fileId)
    
    if (existsSync(filepath)) {
      const { unlink } = await import('fs/promises')
      await unlink(filepath)
      return NextResponse.json({ success: true, message: 'File deleted successfully' })
    } else {
      return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 })
    }
  } catch (error: any) {
    console.error('Error deleting file:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to delete file' 
    }, { status: 500 })
  }
}
