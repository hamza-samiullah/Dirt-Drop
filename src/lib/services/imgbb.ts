// ImgBB Free Image Hosting Service
// No API key needed for basic usage

export class ImgBBService {
  static async uploadImage(imageBuffer: Buffer, filename: string): Promise<string> {
    try {
      // Convert buffer to base64
      const base64Image = imageBuffer.toString('base64')
      
      // ImgBB free API (no key needed for basic usage)
      const formData = new FormData()
      formData.append('image', base64Image)
      
      const response = await fetch('https://api.imgbb.com/1/upload?key=demo', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.success && data.data?.url) {
        return data.data.url
      }
      
      throw new Error('Failed to upload to ImgBB')
    } catch (error: any) {
      console.error('ImgBB upload error:', error)
      throw error
    }
  }
}
