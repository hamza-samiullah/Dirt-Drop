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

    const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n')

    if (!clientEmail || !privateKey) {
      throw new Error('Google Drive credentials not configured. Please set GOOGLE_DRIVE_CLIENT_EMAIL and GOOGLE_DRIVE_PRIVATE_KEY in .env.local')
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: [
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive'
        ],
      })

      this.drive = google.drive({ version: 'v3', auth })
      return this.drive
    } catch (error) {
      console.error('Error initializing Google Drive client:', error)
      throw new Error('Failed to initialize Google Drive. Check your credentials.')
    }
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

  static async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    try {
      const drive = await this.getDriveClient()
      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

      if (!folderId) {
        throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured in environment variables')
      }

      const { Readable } = require('stream')

      console.log(`Uploading file: ${fileName} (${mimeType}) to folder: ${folderId}`)

      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId],
          mimeType: mimeType,
        },
        media: {
          mimeType: mimeType,
          body: Readable.from(fileBuffer),
        },
        fields: 'id, webViewLink',
      })

      console.log(`File uploaded successfully. File ID: ${response.data.id}`)

      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      })

      console.log(`Permissions set to public for file: ${response.data.id}`)

      return response.data.id
    } catch (error: any) {
      console.error('Error uploading to Google Drive:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        errors: error.errors,
      })
      throw new Error(`Failed to upload to Google Drive: ${error.message || 'Unknown error'}`)
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
