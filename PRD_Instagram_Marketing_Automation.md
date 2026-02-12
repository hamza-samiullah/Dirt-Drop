# Product Requirements Document (PRD)
## Instagram Marketing Automation System with Make.com

**Version**: 2.0  
**Last Updated**: February 6, 2026  
**Status**: Production Ready

---

## 1. Executive Summary

### 1.1 Project Overview
An AI-powered Instagram marketing automation system that uses Make.com workflows to handle all Instagram operations including content upload, AI-powered suggestions, approval workflows, automated posting, and analytics tracking.

### 1.2 Key Objectives
- ✅ Automate Instagram content management end-to-end
- ✅ Provide AI-powered content suggestions based on app performance
- ✅ Enable user approval before posting
- ✅ Track Instagram performance and insights
- ✅ Integrate with AppsFlyer for app analytics
- ✅ Store content in Google Drive for accessibility

### 1.3 Success Metrics
- **Automation Rate**: 90% of Instagram workflow automated
- **Time Savings**: 15+ hours/week saved on manual posting
- **Engagement Increase**: 25% improvement in Instagram engagement
- **Content Quality**: AI suggestions accepted rate > 70%
- **System Uptime**: 99.5% availability

---

## 2. System Architecture

### 2.1 Technology Stack

#### Frontend Dashboard
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Vercel

#### Backend & Automation
- **Automation Platform**: Make.com (5 workflows)
- **AI Engine**: OpenAI GPT-4
- **Storage**: Google Drive
- **Analytics**: AppsFlyer API
- **Social Media**: Instagram Graph API

#### Data Storage
- **Make.com Data Stores**: 2 stores (Content Queue, Content Ideas)
- **File Storage**: Google Drive
- **Session Storage**: Browser localStorage

### 2.2 System Flow

```
User Dashboard → Upload Content → Google Drive
                                      ↓
                                  Make.com Workflow 1
                                      ↓
                                  OpenAI Analysis
                                      ↓
                              AI Suggestions → Dashboard
                                      ↓
                              User Approves → Make.com Workflow 2
                                      ↓
                              Instagram Publishing
                                      ↓
                              Analytics Collection (Workflow 3)
                                      ↓
                              Dashboard Display
```

---

## 3. Core Features

### 3.1 Dashboard Features

#### A. Analytics Overview
**Purpose**: Display real-time app performance metrics from AppsFlyer

**Components**:
- Total installs counter
- Daily installs trend
- Revenue tracking
- Retention rate
- Geographic distribution
- Device breakdown (iOS/Android)

**Data Source**: AppsFlyer API
**Update Frequency**: Real-time on page load
**Visualization**: Cards + Charts (Line, Bar, Pie)

#### B. Instagram Performance
**Purpose**: Show Instagram account and post performance

**Metrics Displayed**:
- Follower count
- Total impressions
- Engagement rate
- Profile views
- Website clicks
- Top performing posts

**Data Source**: Make.com Workflow 3 (Instagram Insights)
**Update Frequency**: Every 6 hours
**Visualization**: Metric cards + Performance charts

#### C. Content Manager
**Purpose**: Upload, review, and approve Instagram content

**Features**:
- Drag-and-drop file upload (photos/reels)
- Upload to Google Drive
- AI-generated caption suggestions
- Hashtag recommendations
- Best posting time suggestions
- Approval/rejection workflow
- Schedule posting

**User Flow**:
1. User uploads photo/reel
2. File saved to Google Drive
3. Make.com triggers AI analysis
4. Dashboard shows AI suggestions
5. User reviews and edits caption
6. User approves for posting
7. Make.com publishes to Instagram

#### D. AI Content Suggestions
**Purpose**: Daily AI-generated content ideas based on app performance

**Features**:
- 5 daily content ideas
- Caption templates
- Visual recommendations
- Target audience insights
- Engagement predictions

**Data Source**: Make.com Workflow 4 (AI Strategy Generator)
**Update Frequency**: Daily at 9:00 AM
**AI Model**: GPT-4

### 3.2 Make.com Workflows

#### Workflow 1: Content Upload & AI Analysis
**Trigger**: Webhook from dashboard
**Purpose**: Process uploaded content and generate AI suggestions

**Steps**:
1. Receive upload notification
2. Fetch file from Google Drive
3. Send to OpenAI for analysis
4. Generate captions, hashtags, timing
5. Store in Data Store
6. Send suggestions to dashboard

**Execution Time**: ~10-15 seconds
**Error Handling**: Retry 3 times, notify dashboard on failure

#### Workflow 2: Instagram Publishing
**Trigger**: Webhook from dashboard (approval)
**Purpose**: Publish approved content to Instagram

**Steps**:
1. Receive approval notification
2. Download file from Google Drive
3. Route by type (photo/reel)
4. Publish to Instagram
5. Update Data Store status
6. Notify dashboard of success

**Execution Time**: ~20-30 seconds
**Error Handling**: Retry on failure, log errors

#### Workflow 3: Analytics Collection
**Trigger**: Schedule (every 6 hours)
**Purpose**: Collect Instagram insights and post performance

**Steps**:
1. Fetch user insights (followers, impressions, etc.)
2. Get all published posts from Data Store
3. Fetch insights for each post
4. Aggregate metrics
5. Send to dashboard API

**Execution Time**: ~2-5 minutes
**Data Retention**: 30 days

#### Workflow 4: AI Content Strategy
**Trigger**: Schedule (daily at 9:00 AM)
**Purpose**: Generate content ideas based on app performance

**Steps**:
1. Fetch AppsFlyer metrics
2. Send to OpenAI with prompt
3. Parse AI response
4. Store ideas in Data Store
5. Send to dashboard

**Execution Time**: ~15-20 seconds
**AI Cost**: ~$0.05 per execution

#### Workflow 5: Reel Processing
**Trigger**: Webhook from dashboard
**Purpose**: Optimize and process video reels

**Steps**:
1. Receive reel upload notification
2. Download from Google Drive
3. Optimize video (optional CloudConvert)
4. Re-upload optimized version
5. Generate AI suggestions
6. Notify dashboard

**Execution Time**: ~1-3 minutes (depending on video length)
**Video Requirements**: Max 90 seconds, 9:16 aspect ratio

---

## 4. User Workflows

### 4.1 Upload & Post Photo

```
User Action                    System Response
────────────────────────────────────────────────────────────
1. Click "Upload Photo"        → Open file picker
2. Select image file           → Upload to Google Drive
3. Wait for AI analysis        → Make.com Workflow 1 triggered
                               → OpenAI generates suggestions
4. Review AI suggestions       → Display 3 caption options
                               → Show hashtags
                               → Recommend posting time
5. Edit caption (optional)     → Update caption in form
6. Click "Approve & Post"      → Make.com Workflow 2 triggered
7. Confirmation message        → Instagram post published
                               → Update content queue status
```

**Time to Complete**: 2-3 minutes
**User Effort**: Minimal (upload + approve)

### 4.2 Upload & Schedule Reel

```
User Action                    System Response
────────────────────────────────────────────────────────────
1. Click "Upload Reel"         → Open file picker
2. Select video file           → Upload to Google Drive
3. Wait for processing         → Make.com Workflow 5 triggered
                               → Video optimization (if needed)
4. Review AI suggestions       → Display hook-style captions
                               → Show trending hashtags
                               → Music recommendations
5. Select posting time         → Schedule for future posting
6. Click "Schedule"            → Store in queue with schedule
7. Confirmation                → Will post at scheduled time
```

**Time to Complete**: 3-5 minutes
**User Effort**: Minimal (upload + schedule)

### 4.3 Review AI Content Ideas

```
User Action                    System Response
────────────────────────────────────────────────────────────
1. Open "AI Suggestions" tab   → Display daily ideas
2. Browse 5 content ideas      → Show concept, caption, visual
3. Click "Use This Idea"       → Pre-fill content form
4. Upload matching visual      → Follow standard upload flow
5. Post or schedule            → Standard posting workflow
```

**Frequency**: Daily
**User Benefit**: Never run out of content ideas

---

## 5. Data Models

### 5.1 Instagram Content Queue (Make.com Data Store)

```typescript
interface ContentQueueItem {
  id: string
  fileId: string                    // Google Drive file ID
  fileName: string
  downloadUrl: string
  postType: 'photo' | 'reel'
  caption: string
  aiSuggestions: {
    captions: string[]
    hashtags: string[]
    bestPostingTime: string
    targetAudience: string
    engagementPrediction: 'high' | 'medium' | 'low'
  }
  status: 'pending_approval' | 'approved' | 'published' | 'failed'
  uploadedAt: string
  approvedAt: string | null
  publishedAt: string | null
  scheduledFor: string | null
  instagramPostId: string | null
  insights: {
    engagement: number
    impressions: number
    reach: number
    saved: number
    likes: number
    comments: number
  } | null
  lastAnalyzed: string | null
}
```

### 5.2 Content Ideas (Make.com Data Store)

```typescript
interface ContentIdea {
  id: string
  concept: string
  caption: string
  visualRecommendation: string
  bestPostingTime: string
  targetAudience: string
  basedOnMetrics: {
    totalInstalls: number
    topCountry: string
    retentionRate: number
  }
  status: 'suggested' | 'in_progress' | 'completed'
  createdAt: string
  usedAt: string | null
}
```

### 5.3 AppsFlyer Metrics

```typescript
interface AppMetrics {
  totalInstalls: number
  dailyInstalls: number
  organicInstalls: number
  totalRevenue: number
  retentionDay1: number
  retentionDay7: number
  retentionDay30: number
  topCountries: Array<{
    country: string
    installs: number
    percentage: number
  }>
  dailyData: Array<{
    date: string
    installs: number
    revenue: number
  }>
}
```

---

## 6. API Endpoints

### 6.1 Dashboard API Routes

#### POST `/api/content/upload`
**Purpose**: Upload content to Google Drive and trigger AI analysis

**Request**:
```typescript
FormData {
  file: File
  type: 'photo' | 'reel'
}
```

**Response**:
```json
{
  "success": true,
  "fileId": "google_drive_file_id",
  "url": "https://drive.google.com/...",
  "message": "File uploaded successfully"
}
```

#### POST `/api/content/approve`
**Purpose**: Approve content for Instagram posting

**Request**:
```json
{
  "fileId": "google_drive_file_id",
  "caption": "Final caption with #hashtags",
  "scheduledTime": "2026-02-07T18:00:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Content approved and queued for posting"
}
```

#### GET `/api/content/suggestions`
**Purpose**: Get AI-generated content ideas

**Response**:
```json
{
  "success": true,
  "suggestions": [
    {
      "concept": "Milestone celebration",
      "caption": "🎉 We hit 1000 downloads!",
      "visualRecommendation": "Confetti background with app icon",
      "bestPostingTime": "2026-02-07T18:00:00Z"
    }
  ]
}
```

#### GET `/api/instagram/analytics`
**Purpose**: Get Instagram performance metrics

**Response**:
```json
{
  "success": true,
  "userInsights": {
    "followerCount": 1250,
    "impressions": 15000,
    "reach": 8500,
    "profileViews": 450
  },
  "postInsights": {
    "totalPosts": 25,
    "avgEngagement": 125,
    "topPost": {...}
  }
}
```

#### GET `/api/appsflyer`
**Purpose**: Get app analytics from AppsFlyer

**Response**: See AppMetrics interface above

---

## 7. Security & Privacy

### 7.1 Authentication
- Dashboard: No authentication required (single user)
- API Routes: Environment variable validation
- Make.com Webhooks: Webhook secret validation (optional)

### 7.2 Data Protection
- API keys stored in environment variables
- Google Drive service account with limited permissions
- Instagram access token with minimal scopes
- No user data stored in Make.com beyond 30 days

### 7.3 Rate Limiting
- Instagram API: 200 requests/hour (enforced by Meta)
- OpenAI API: 3 requests/minute (configurable)
- Make.com: 10,000 operations/month (free tier)

---

## 8. Cost Analysis

### 8.1 Monthly Costs

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (Hosting) | $0 | Hobby plan sufficient |
| Make.com | $0-9 | Free tier: 1,000 ops/month |
| OpenAI API | $10-30 | ~300 requests/month |
| Google Drive | $0 | 15GB free storage |
| Instagram API | $0 | Free for business accounts |
| **Total** | **$10-39/month** | Scales with usage |

### 8.2 Cost Optimization
- Use GPT-3.5-turbo instead of GPT-4 for suggestions ($0.002 vs $0.03 per request)
- Batch Instagram insights requests
- Cache AppsFlyer data for 1 hour
- Compress images before upload

---

## 9. Implementation Timeline

### Week 1: Setup & Configuration
- **Day 1-2**: Make.com workflows setup
  - Create all 5 workflows
  - Configure Data Stores
  - Test each workflow individually
  
- **Day 3-4**: Dashboard updates
  - Update content upload UI
  - Add AI suggestions display
  - Implement approval workflow
  
- **Day 5**: Integration testing
  - End-to-end testing
  - Fix bugs and issues
  
- **Day 6-7**: Documentation & deployment
  - Write setup guides
  - Deploy to Vercel
  - Final testing

### Week 2: Monitoring & Optimization
- Monitor workflow executions
- Optimize AI prompts
- Gather user feedback
- Make improvements

---

## 10. Testing Strategy

### 10.1 Unit Testing
- Test each Make.com workflow independently
- Validate API endpoints
- Test file upload/download

### 10.2 Integration Testing
- End-to-end content upload → posting flow
- Analytics collection and display
- AI suggestion generation

### 10.3 User Acceptance Testing
- Upload various file types
- Test approval/rejection flows
- Verify Instagram posting
- Check analytics accuracy

---

## 11. Monitoring & Maintenance

### 11.1 Monitoring
- Make.com execution history
- Dashboard error logs (Vercel)
- Instagram API rate limits
- OpenAI API usage

### 11.2 Maintenance Tasks
- **Daily**: Check workflow executions
- **Weekly**: Review AI suggestion quality
- **Monthly**: Analyze costs and optimize
- **Quarterly**: Update AI prompts based on performance

---

## 12. Future Enhancements

### Phase 2 (Optional)
- [ ] Multi-account Instagram support
- [ ] A/B testing for captions
- [ ] Competitor analysis
- [ ] Automated hashtag research
- [ ] Instagram Stories automation
- [ ] Comment moderation with AI
- [ ] Influencer collaboration tracking

### Phase 3 (Advanced)
- [ ] TikTok integration
- [ ] Facebook page posting
- [ ] LinkedIn company page
- [ ] Twitter/X integration
- [ ] Multi-platform analytics dashboard

---

## 13. Success Criteria

### Must Have (MVP)
- ✅ Content upload to Google Drive
- ✅ AI caption suggestions
- ✅ User approval workflow
- ✅ Automated Instagram posting
- ✅ Basic analytics display

### Should Have
- ✅ Reel processing
- ✅ Daily AI content ideas
- ✅ Scheduled posting
- ✅ Performance tracking

### Nice to Have
- ⏳ A/B testing
- ⏳ Multi-account support
- ⏳ Advanced analytics

---

## 14. Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Instagram API changes | High | Medium | Monitor Meta developer updates |
| Make.com downtime | High | Low | Implement retry logic |
| OpenAI rate limits | Medium | Medium | Cache responses, use GPT-3.5 |
| Google Drive quota | Low | Low | Monitor storage usage |
| User adoption | Medium | Low | Provide clear documentation |

---

## 15. Appendix

### 15.1 Glossary
- **Make.com**: No-code automation platform (formerly Integromat)
- **AppsFlyer**: Mobile attribution and marketing analytics
- **Instagram Graph API**: Official Instagram API for businesses
- **GPT-4**: OpenAI's advanced language model
- **Webhook**: HTTP callback for real-time notifications

### 15.2 References
- [Make.com Documentation](https://www.make.com/en/help)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [AppsFlyer API Docs](https://dev.appsflyer.com/)

---

**Document Status**: ✅ Approved for Implementation  
**Next Review**: After Week 1 implementation
