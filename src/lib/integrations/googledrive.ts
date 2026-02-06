import { google } from 'googleapis'

export interface ContentItem {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  mimeType: string
  createdTime: string
  size: number
  status: 'draft' | 'approved' | 'posted'
  caption?: string
  scheduledTime?: string
}

export class GoogleDriveService {
  private static drive: any = null

  private static async getDriveClient() {
    if (this.drive) return this.drive

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    })

    this.drive = google.drive({ version: 'v3', auth })
    return this.drive
  }

  static async listContent(folderId?: string): Promise<ContentItem[]> {
    try {
      const drive = await this.getDriveClient()
      const folder = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID

      const response = await drive.files.list({
        q: `'${folder}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`,
        fields: 'files(id, name, mimeType, createdTime, size, thumbnailLink, webContentLink)',
        orderBy: 'createdTime desc',
      })

      return response.data.files.map((file: any) => ({
        id: file.id,
        name: file.name,
        url: file.webContentLink,
        thumbnailUrl: file.thumbnailLink || '',
        mimeType: file.mimeType,
        createdTime: file.createdTime,
        size: parseInt(file.size || '0'),
        status: 'draft' as const,
      }))
    } catch (error) {
      console.error('Error fetching from Google Drive:', error)
      return []
    }
  }

  static async getFileUrl(fileId: string): Promise<string> {
    try {
      const drive = await this.getDriveClient()
      const response = await drive.files.get({
        fileId,
        fields: 'webContentLink',
      })
      return response.data.webContentLink
    } catch (error) {
      console.error('Error getting file URL:', error)
      return ''
    }
  }

  static async getPublicUrl(fileId: string): Promise<string> {
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }
}
