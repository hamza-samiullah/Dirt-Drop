'use client'

import { useState, useEffect } from 'react'
import { Upload, Image, Video, Calendar, Check, X, RefreshCw } from 'lucide-react'

interface ContentItem {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  mimeType: string
  createdTime: string
  status: 'draft' | 'approved' | 'posted'
  caption?: string
}

export default function ContentManager() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [caption, setCaption] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      if (data.success) {
        setContent(data.content)
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
    setLoading(false)
  }

  const approveAndPost = async (item: ContentItem) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          fileId: item.id,
          caption: caption || `Check out our latest update! 🚀 #app #mobile`,
          scheduledTime: scheduledTime || new Date().toISOString(),
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert('✅ Content approved and sent to Instagram!')
        setSelectedItem(null)
        setCaption('')
        setScheduledTime('')
        loadContent()
      } else {
        alert('❌ Failed to approve content')
      }
    } catch (error) {
      console.error('Error approving content:', error)
      alert('❌ Error approving content')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-custom border border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Content Manager</h2>
            <p className="text-neutral-600 mt-1">Upload and manage Instagram posts from Google Drive</p>
          </div>
          <button
            onClick={loadContent}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Refresh
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            📁 <strong>Upload files to Google Drive</strong> in the configured folder, then refresh to see them here.
          </p>
        </div>

        {content.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <Upload className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No content found</h3>
            <p className="text-neutral-600">Upload images or videos to your Google Drive folder</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-square bg-neutral-100 relative">
                  {item.mimeType.includes('image') ? (
                    <img
                      src={item.thumbnailUrl || `https://drive.google.com/thumbnail?id=${item.id}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Video className="w-16 h-16 text-neutral-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {item.mimeType.includes('image') ? (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Image</span>
                    ) : (
                      <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">Video</span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900 truncate">{item.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(item.createdTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-900">Post to Instagram</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-square bg-neutral-100 rounded-lg mb-4 overflow-hidden">
                {selectedItem.mimeType.includes('image') ? (
                  <img
                    src={`https://drive.google.com/thumbnail?id=${selectedItem.id}&sz=w1000`}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Video className="w-24 h-24 text-neutral-400" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write your Instagram caption... #hashtags"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Schedule Time (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => approveAndPost(selectedItem)}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <Check className="w-5 h-5 inline mr-2" />
                    Approve & Post
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
