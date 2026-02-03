# AI Marketing Dashboard

🚀 **Live Demo**: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

A modern, AI-powered marketing dashboard for app analytics and Instagram automation.

## ✨ Features

- **📊 Real-time Analytics**: App downloads, signups, revenue tracking from AppsFlyer
- **🤖 AI Insights**: OpenAI-powered recommendations and trend analysis
- **📱 Instagram Automation**: Automated posting via Make.com integration
- **🎨 Custom Design**: Professional UI with responsive design
- **⚡ Live Data**: Real AppsFlyer integration with fallback data

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **AI**: OpenAI GPT-4
- **Automation**: Make.com
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes (AppsFlyer, AI, Instagram)
│   └── page.tsx        # Main dashboard
├── components/         # React components
│   ├── dashboard/      # Dashboard components
│   └── charts/         # Chart components
├── lib/                # Utilities and services
│   ├── integrations/   # API integrations
│   └── utils.ts        # Utility functions
└── types/              # TypeScript types
```

## 🎨 Color Scheme

- **Primary**: Blue (#3b82f6)
- **Secondary**: Green (#10b981)
- **Accent**: Orange (#f97316)
- **Background**: Light gray (#f8fafc)

## 🔗 API Integrations

### ✅ Working:
- OpenAI API (AI insights)
- AppsFlyer API (app analytics)
- Instagram Graph API (posting)
- Make.com (automation)

### 📋 Ready for:
- Google Play Console API
- App Store Connect API
- Firebase Analytics

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

## 📱 Instagram Automation

See [Make_com_Instagram_Automation_Guide.md](./Make_com_Instagram_Automation_Guide.md) for complete setup.

## 🔧 Environment Variables

Copy `.env.local` and update with your credentials:

```env
OPENAI_API_KEY=your_openai_key
APPSFLYER_API_TOKEN=your_appsflyer_token
INSTAGRAM_APP_ID=your_instagram_app_id
MAKE_INSTAGRAM_WEBHOOK=your_make_webhook_url
```

## 📊 Dashboard Features

- **Overview**: Real-time metrics and AI insights
- **Analytics**: Detailed AppsFlyer data with raw JSON
- **Instagram**: Automated posting and content management
- **AI Insights**: Personalized recommendations

## 🎯 Next Steps

1. ✅ Real data integration (completed)
2. ✅ Instagram automation (completed)
3. ✅ AI insights (completed)
4. 🚀 Deploy to Vercel (ready)
5. 📱 Show to client (ready)

**Ready for production! 🎉**