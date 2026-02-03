# AI Marketing Dashboard

A modern, AI-powered marketing dashboard for app analytics and Instagram automation.

## Features

- **Real-time Analytics**: App downloads, signups, revenue tracking
- **AI Insights**: OpenAI-powered recommendations and trend analysis
- **Custom Design**: Professional UI with custom color scheme
- **Responsive**: Works on desktop, tablet, and mobile
- **Integration Ready**: Placeholders for Google Play, App Store, AppsFlyer, Instagram APIs

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **AI**: OpenAI GPT-4
- **Icons**: Lucide React

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Copy `.env.local` and update with your credentials
   - OpenAI API key is already configured

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main dashboard
├── components/         # React components
│   ├── dashboard/      # Dashboard components
│   ├── charts/         # Chart components
│   └── ui/             # UI components
├── lib/                # Utilities and services
│   ├── integrations/   # API integrations
│   ├── mockData.ts     # Mock data for development
│   └── utils.ts        # Utility functions
└── types/              # TypeScript types
```

## Color Scheme

- **Primary**: Blue (#3b82f6)
- **Secondary**: Green (#10b981)
- **Accent**: Orange (#f97316)
- **Neutral**: Slate grays
- **Background**: Light gray (#f8fafc)

## API Integrations

### Ready for Integration:
- Google Play Console API
- App Store Connect API
- AppsFlyer API
- Firebase Analytics
- Instagram Graph API

### Currently Working:
- OpenAI API (AI insights generation)
- Mock data service (for development)

## Deployment

Ready for deployment on:
- Render.com (recommended)
- Vercel
- Railway
- Heroku

## Next Steps

1. Add real API integrations when credentials are provided
2. Implement Instagram posting automation via Make.com
3. Add user authentication
4. Set up database for data persistence