import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AISuggestions {
  captions: string[]
  hashtags: string[]
  bestPostingTime: string
  targetAudience: string
  engagementPrediction: 'high' | 'medium' | 'low'
}

export class AIService {
  static async generateCaptionSuggestions(
    fileName: string,
    postType: 'photo' | 'reel'
  ): Promise<AISuggestions> {
    try {
      const prompt = `Generate 3 Instagram caption options for this ${postType}. Also suggest 10 relevant hashtags and the best posting time.

File name: ${fileName}
Content type: ${postType}

Return ONLY valid JSON in this exact format:
{
  "captions": ["caption1", "caption2", "caption3"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"],
  "bestPostingTime": "6:00 PM",
  "targetAudience": "description of target audience",
  "engagementPrediction": "high"
}`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      })

      const content = response.choices[0]?.message?.content || '{}'
      const suggestions = JSON.parse(content)

      return {
        captions: suggestions.captions || [],
        hashtags: suggestions.hashtags || [],
        bestPostingTime: suggestions.bestPostingTime || '6:00 PM',
        targetAudience: suggestions.targetAudience || 'General audience',
        engagementPrediction: suggestions.engagementPrediction || 'medium',
      }
    } catch (error) {
      console.error('Error generating AI suggestions:', error)
      return {
        captions: [
          'Check out this amazing content! 🚀',
          'New post alert! What do you think? 💭',
          'Sharing this with you all! ✨',
        ],
        hashtags: ['#instagram', '#content', '#social', '#marketing', '#digital'],
        bestPostingTime: '6:00 PM',
        targetAudience: 'General audience',
        engagementPrediction: 'medium',
      }
    }
  }
}
