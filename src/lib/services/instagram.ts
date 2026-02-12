export class InstagramService {
  static async publishPhoto(imageUrl: string, caption: string, accessToken: string, businessAccountId: string) {
    try {
      console.log('Publishing photo:', { imageUrl, caption, businessAccountId })
      
      // Check if URL is publicly accessible
      if (imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')) {
        return { 
          success: false, 
          error: 'Instagram requires publicly accessible URLs. Deploy to Render or use ngrok for testing.' 
        }
      }

      // Step 1: Create media container
      const containerResponse = await fetch(
        `https://graph.facebook.com/v18.0/${businessAccountId}/media`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: imageUrl,
            caption: caption,
            access_token: accessToken,
          }),
        }
      )

      const containerData = await containerResponse.json()
      console.log('Container response:', JSON.stringify(containerData, null, 2))
      
      if (containerData.error) {
        console.error('Container error:', containerData.error)
        
        // Provide helpful error message
        let errorMsg = containerData.error.message
        if (containerData.error.error_user_msg) {
          errorMsg = `${errorMsg}\n\nDetails: ${containerData.error.error_user_msg}`
        }
        
        // Check for common issues
        if (errorMsg.includes('media URI')) {
          errorMsg += '\n\nPossible fixes:\n1. Image might be too large (max 8MB)\n2. Image format issue (try JPG instead of PNG)\n3. Image not publicly accessible\n4. Try uploading a different image'
        }
        
        throw new Error(errorMsg)
      }

      const creationId = containerData.id

      // Wait for Instagram to process the image (2-5 seconds)
      console.log('Waiting for Instagram to process image...')
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Step 2: Publish the container
      const publishResponse = await fetch(
        `https://graph.facebook.com/v18.0/${businessAccountId}/media_publish`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creation_id: creationId,
            access_token: accessToken,
          }),
        }
      )

      const publishData = await publishResponse.json()
      console.log('Publish response:', publishData)
      
      if (publishData.error) {
        console.error('Publish error:', publishData.error)
        throw new Error(publishData.error.message)
      }

      return { success: true, postId: publishData.id }
    } catch (error: any) {
      console.error('Error publishing photo:', error)
      return { success: false, error: error.message }
    }
  }

  static async deletePost(postId: string, accessToken: string) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${postId}?access_token=${accessToken}`,
        { method: 'DELETE' }
      )

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message)
      }

      return { success: true }
    } catch (error: any) {
      console.error('Error deleting post:', error)
      return { success: false, error: error.message }
    }
  }

  static async publishReel(videoUrl: string, caption: string, accessToken: string, businessAccountId: string) {
    try {
      // Check if URL is publicly accessible
      if (videoUrl.includes('localhost') || videoUrl.includes('127.0.0.1')) {
        return { 
          success: false, 
          error: 'Instagram requires publicly accessible URLs. Deploy to Vercel or use ngrok for testing.' 
        }
      }

      // Step 1: Create media container for reel
      const containerResponse = await fetch(
        `https://graph.facebook.com/v18.0/${businessAccountId}/media`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type: 'REELS',
            video_url: videoUrl,
            caption: caption,
            access_token: accessToken,
          }),
        }
      )

      const containerData = await containerResponse.json()
      if (containerData.error) throw new Error(containerData.error.message)

      const creationId = containerData.id

      // Step 2: Wait for video processing (poll status)
      await this.waitForVideoProcessing(creationId, accessToken)

      // Step 3: Publish the reel
      const publishResponse = await fetch(
        `https://graph.facebook.com/v18.0/${businessAccountId}/media_publish`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creation_id: creationId,
            access_token: accessToken,
          }),
        }
      )

      const publishData = await publishResponse.json()
      if (publishData.error) throw new Error(publishData.error.message)

      return { success: true, postId: publishData.id }
    } catch (error: any) {
      console.error('Error publishing reel:', error)
      return { success: false, error: error.message }
    }
  }

  private static async waitForVideoProcessing(creationId: string, accessToken: string, maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${creationId}?fields=status_code&access_token=${accessToken}`
      )
      const data = await response.json()

      if (data.status_code === 'FINISHED') return
      if (data.status_code === 'ERROR') throw new Error('Video processing failed')

      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
    }
    throw new Error('Video processing timeout')
  }
}
