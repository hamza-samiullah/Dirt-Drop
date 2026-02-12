export class InstagramService {
  static async publishPhoto(imageUrl: string, caption: string, accessToken: string, businessAccountId: string) {
    try {
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
      if (containerData.error) throw new Error(containerData.error.message)

      const creationId = containerData.id

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
      if (publishData.error) throw new Error(publishData.error.message)

      return { success: true, postId: publishData.id }
    } catch (error: any) {
      console.error('Error publishing photo:', error)
      return { success: false, error: error.message }
    }
  }

  static async publishReel(videoUrl: string, caption: string, accessToken: string, businessAccountId: string) {
    try {
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
