# Instagram Marketing Automation System

**100% Code-Based AI-Powered Instagram Marketing**

---

## 🎯 Overview

Complete Instagram marketing automation with AI-powered captions, automatic posting, and analytics tracking. Built with Next.js 14, TypeScript, and direct Instagram Graph API integration.

**No external automation services required** - everything runs in your codebase!

### ✨ Key Features

- 📸 **Smart Content Upload**: Drag & drop with instant AI caption generation
- 🤖 **AI-Powered Captions**: GPT-3.5 generates 3 caption options + hashtags
- ✅ **One-Click Publishing**: Approve and post to Instagram instantly
- 📊 **Auto Analytics**: Collects Instagram insights every 6 hours
- 💡 **App Metrics**: Real-time AppsFlyer data integration
- 🎬 **Reel Support**: Automatic video processing for Instagram Reels

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API key
- Instagram Business Account
- AppsFlyer account

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**📖 Get Instagram Business ID**: See [GET_INSTAGRAM_ID.md](./GET_INSTAGRAM_ID.md)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── content/              # Upload + AI + Direct Instagram Posting
│   │   ├── instagram-analytics/  # Instagram insights
│   │   ├── appsflyer/            # App analytics
│   │   └── cron/analytics/       # Auto collection
│   └── page.tsx                  # Main dashboard
├── components/
│   └── dashboard/
│       ├── ContentManager.tsx    # Upload & approve UI
│       ├── InstagramPerformance.tsx
│       └── ...
├── lib/
│   ├── services/
│   │   ├── ai.ts                 # OpenAI integration
│   │   └── instagram.ts          # Instagram Graph API
│   └── integrations/
│       ├── appsflyer.ts
│       └── instagram-analytics.ts
└── public/
    └── uploads/                  # Content storage
```

---

## 🎨 Features

### Content Management
- Drag-and-drop file upload
- AI caption generation (2-3 seconds)
- 3 caption options per upload
- Hashtag suggestions
- Best posting time recommendations
- One-click Instagram publishing via Graph API

### Analytics Dashboard
- **Overview**: AppsFlyer metrics (installs, revenue, retention)
- **IG Performance**: Post analytics, engagement rates
- **AI Insights**: Performance recommendations
- **Real-time Updates**: Auto-refresh every 6 hours

### Automation
- ✅ AI caption generation on demand
- ✅ Direct Instagram posting via Graph API
- ✅ Analytics collection (Vercel Cron)
- ✅ No external services needed

---

## 🔄 User Workflow

1. **Upload**: Drag image/video to Content Manager
2. **Click Content**: Select uploaded content
3. **Generate AI**: Click "Generate AI Captions" button
4. **Review**: Choose caption or edit (3 options provided)
5. **Approve**: Click "Approve & Post"
6. **Published**: Live on Instagram in 5-10 seconds via Graph API
7. **Track**: View performance in analytics

**Time**: 2-3 minutes from upload to published

---

## 💰 Cost Breakdown

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Vercel | $0 | Hobby plan (includes cron) |
| OpenAI API | $5-15 | ~500 caption generations |
| Instagram API | $0 | Free |
| AppsFlyer | $0 | Free tier |
| **Total** | **$5-15/month** | |

---

## 🔧 Configuration

### Required Environment Variables

```env
# OpenAI
OPENAI_API_KEY=sk-proj-your_key_here

# AppsFlyer
APPSFLYER_API_TOKEN=your_token_here
APPSFLYER_APP_ID=your_app_id_here

# Instagram Graph API
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id

# Cron Job Secret
CRON_SECRET=your_random_secret_string
```

**📖 Get Instagram Business ID**: See [GET_INSTAGRAM_ID.md](./GET_INSTAGRAM_ID.md)

---

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/dirt-drop)

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔒 Security

- API keys in environment variables
- Instagram access token with minimal scopes
- Cron endpoint protected with secret
- No user data stored
- Files stored locally (not in git)

---

## 🛣️ Roadmap

### Future Enhancements
- [ ] Database for content history
- [ ] Scheduled posting
- [ ] A/B testing for captions
- [ ] Multi-account support
- [ ] TikTok integration
- [ ] Instagram Stories automation

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- Next.js for the framework
- OpenAI for GPT-3.5
- Meta for Instagram Graph API
- AppsFlyer for analytics
- Vercel for hosting

---

**Built with ❤️ - 100% Code-Based Solution**

🚀 **Ready to automate? Start with [GET_INSTAGRAM_ID.md](./GET_INSTAGRAM_ID.md)!**
