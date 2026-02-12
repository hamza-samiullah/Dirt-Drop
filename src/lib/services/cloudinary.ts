// Cloudinary service for hosting images and videos
// Works with Instagram API perfectly

export class CloudinaryService {
  private static cloudName = process.env.CLOUDINARY_CLOUD_NAME
  private static apiKey = process.env.CLOUDINARY_API_KEY
  private static apiSecret = process.env.CLOUDINARY_API_SECRET

  static async uploadMedia(buffer: Buffer, filename: string, isVideo: boolean): Promise<string> {
    try {
      if (!this.cloudName || !this.apiKey || !this.apiSecret) {
        throw new Error('Cloudinary credentials not configured')
      }

      // Convert buffer to base64
      const base64Data = buffer.toString('base64')
      const dataURI = `data:${isVideo ? 'video/mp4' : 'image/jpeg'};base64,${base64Data}`

      // Create signature
      const timestamp = Math.round(Date.now() / 1000)
      const signature = await this.generateSignature(timestamp)

      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', dataURI)
      formData.append('timestamp', timestamp.toString())
      formData.append('api_key', this.apiKey)
      formData.append('signature', signature)
      formData.append('resource_type', isVideo ? 'video' : 'image')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/${isVideo ? 'video' : 'image'}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      // Return secure URL that Instagram can access
      return data.secure_url
    } catch (error: any) {
      console.error('Cloudinary upload error:', error)
      throw error
    }
  }

  private static async generateSignature(timestamp: number): Promise<string> {
    const crypto = await import('crypto')
    const stringToSign = `timestamp=${timestamp}${this.apiSecret}`
    return crypto.createHash('sha1').update(stringToSign).digest('hex')
  }
}
