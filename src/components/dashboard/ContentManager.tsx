'use client'

import { useState, useEffect } from 'react'
import { Upload, Video, Trash2, Check, X, RefreshCw, Plus, Sparkles } from 'lucide-react'

interface ContentItem {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  mimeType: string
  createdTime: string
  size: number
  status: 'draft' | 'approved' | 'posted'
  caption?: string
  suggestions?: {
    captions: string[]
    hashtags: string[]
    bestPostingTime: string
    targetAudience: string
    engagementPrediction: string
  }
}

export default function ContentManager() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      if (data.success) {
        setContent(data.content || [])
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
    setLoading(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Please upload an image or video file')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/content', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        alert('✅ File uploaded successfully!')
        loadContent()
      } else {
        alert(`❌ ${data.error || 'Failed to upload file'}`)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('❌ Error uploading file')
    }
    setUploading(false)
    event.target.value = ''
  }

  const generateAICaptions = async (item: ContentItem) => {
    setGeneratingAI(true)
    try {
      const formData = new FormData()
      const response = await fetch(item.url)
      const blob = await response.blob()
      const file = new File([blob], item.name, { type: item.mimeType })
      formData.append('file', file)

      const aiResponse = await fetch('/api/content', {
        method: 'POST',
        body: formData,
      })

      const data = await aiResponse.json()
      if (data.success && data.suggestions) {
        setSelectedItem({ ...item, suggestions: data.suggestions })
        setCaption(data.suggestions.captions[0])
      }
    } catch (error) {
      console.error('Error generating AI captions:', error)
      alert('❌ Failed to generate AI captions')
    }
    setGeneratingAI(false)
  }

  const deleteContent = async (item: ContentItem, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!confirm(`Delete ${item.name}?`)) return

    try {
      const response = await fetch('/api/content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: item.id }),
      })

      const data = await response.json()
      if (data.success) {
        alert('✅ Content deleted')
        loadContent()
      } else {
        alert('❌ Failed to delete content')
      }
    } catch (error) {
      console.error('Error deleting content:', error)
      alert('❌ Error deleting content')
    }
  }

  const approveAndPost = async (item: ContentItem) => {
    if (!caption.trim()) {
      alert('Please enter a caption')
      return
    }

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          fileId: item.id,
          caption: caption,
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert(`✅ Posted to Instagram! Post ID: ${data.postId}`)
        setSelectedItem(null)
        setCaption('')
        loadContent()
      } else {
        const errorMsg = data.error || 'Failed to post to Instagram'
        if (errorMsg.includes('publicly accessible')) {
          alert(`❌ ${errorMsg}\n\n📖 See DEPLOY_NOW.md for instructions`)
        } else {
          alert(`❌ ${errorMsg}`)
        }
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
            <p className="text-neutral-600 mt-1">Upload and manage Instagram posts</p>
          </div>
          <div className="flex space-x-3">
            <label className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors cursor-pointer">
              <Plus className="w-4 h-4 inline mr-2" />
              {uploading ? 'Uploading...' : 'Upload File'}
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <button
              onClick={loadContent}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {content.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <Upload className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No content uploaded yet</h3>
            <p className="text-neutral-600 mb-4">Upload images or videos to get started</p>
            <label className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">
              <Plus className="w-4 h-4 inline mr-2" />
              Upload Your First File
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedItem(item)
                  setCaption('')
                }}
              >
                <div className="aspect-square bg-neutral-100 relative">
                  {item.mimeType.includes('image') ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="12"%3EImage%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          parent.innerHTML = '<div class="flex items-center justify-center h-full"><svg class="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></div>'
                        }
                      }}
                    />
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {item.mimeType.includes('image') ? (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Image</span>
                    ) : (
                      <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">Video</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => deleteContent(item, e)}
                    className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
                    src={selectedItem.url}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={selectedItem.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="space-y-4">
                {!selectedItem.suggestions && (
                  <button
                    onClick={() => generateAICaptions(selectedItem)}
                    disabled={generatingAI}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-medium"
                  >
                    <Sparkles className="w-5 h-5 inline mr-2" />
                    {generatingAI ? 'Generating AI Captions...' : 'Generate AI Captions'}
                  </button>
                )}

                {selectedItem.suggestions && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
                    <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
                      <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                      AI Suggestions
                    </h4>
                    <div className="space-y-2">
                      {selectedItem.suggestions.captions.map((cap, index) => (
                        <button
                          key={index}
                          onClick={() => setCaption(cap)}
                          className="w-full text-left p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors text-sm"
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-neutral-600">
                      <p><strong>Hashtags:</strong> {selectedItem.suggestions.hashtags.join(' ')}</p>
                      <p className="mt-1"><strong>Best time:</strong> {selectedItem.suggestions.bestPostingTime}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Caption *
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write your Instagram caption... #hashtags"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => approveAndPost(selectedItem)}
                    disabled={!caption.trim()}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
