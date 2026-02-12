# Instagram Marketing Automation - Complete Setup Guide

**100% Code-Based Solution - No External Services Required**

---

## 🎯 What This System Does

1. **Upload Content** → AI generates captions automatically
2. **Approve & Post** → Publishes to Instagram instantly
3. **Analytics** → Collects Instagram insights every 6 hours (automatic)
4. **Dashboard** → View app metrics from AppsFlyer

---

## ✅ What You Need

### Required Accounts
- ✅ OpenAI API account (for AI captions)
- ✅ Instagram Business Account
- ✅ Facebook Page (connected to Instagram)
- ✅ AppsFlyer account (for app analytics)
- ✅ Vercel account (for deployment)

### Required Information
You need to obtain these values and add them to `.env.local`:

---

## 📝 Step-by-Step Setup

### Step 1: Get Instagram Business Account ID

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your Instagram app
3. Click "Generate Access Token"
4. Grant permissions: `pages_show_list`, `instagram_basic`, `instagram_content_publish`
5. Run this query:
   ```
   me/accounts?fields=instagram_business_account
   ```
6. Copy the `instagram_business_account.id` value
7. Add to `.env.local`:
   ```
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your_id_here
   ```

### Step 2: Verify Environment Variables

Open `.env.local` and ensure these are set:

```env
# OpenAI (for AI caption generation)
OPENAI_API_KEY=sk-proj-your_key_here

# AppsFlyer (for app analytics)
APPSFLYER_API_TOKEN=your_token_here
APPSFLYER_APP_ID=com.arcfreak.dirtdrop

# Instagram (for posting)
INSTAGRAM_APP_ID=898802415967891
INSTAGRAM_APP_SECRET=55ff6e22a0070be990f501028944b2f9
INSTAGRAM_ACCESS_TOKEN=your_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_id_here  # ← Add this!

# Cron (for analytics)
CRON_SECRET=sk_cron_secret_change_this_to_random_string_12345
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## 🚀 How to Use

### Upload and Post Content

1. Go to **Content Manager** tab
2. Click "Upload" or drag & drop an image/video
3. Wait 2-3 seconds for AI to generate captions
4. Review the 3 caption options
5. Edit if needed
6. Click **"Approve & Post"**
7. Content posts to Instagram immediately!

### View Analytics

1. Go to **IG Performance** tab
2. See your Instagram posts and engagement
3. Analytics update every 6 hours automatically

### View App Metrics

1. Go to **Overview** tab
2. See AppsFlyer data (installs, revenue, retention)

---

## 🏗️ System Architecture

```
Dashboard (Next.js)
    ↓
Upload File → public/uploads/
    ↓
AI Service (OpenAI) → Generate Captions
    ↓
User Approves
    ↓
Instagram Service → Post to Instagram
    ↓
Vercel Cron (every 6 hours) → Collect Analytics
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── content/route.ts          # Upload + AI + Posting
│   │   ├── instagram-analytics/      # Instagram data
│   │   ├── appsflyer/                # App analytics
│   │   └── cron/analytics/           # Auto analytics collection
│   └── page.tsx                      # Main dashboard
├── components/
│   └── dashboard/
│       ├── ContentManager.tsx        # Upload & approve UI
│       ├── InstagramPerformance.tsx  # Analytics display
│       └── ...
├── lib/
│   ├── services/
│   │   ├── ai.ts                     # OpenAI integration
│   │   └── instagram.ts              # Instagram posting
│   └── integrations/
│       ├── appsflyer.ts              # AppsFlyer API
│       └── instagram-analytics.ts    # Instagram insights
└── public/
    └── uploads/                      # Uploaded content storage
```

---

## 🔧 Key Features

### 1. AI Caption Generation
- **File**: `src/lib/services/ai.ts`
- **Trigger**: Automatic on file upload
- **Output**: 3 captions, hashtags, posting time
- **Cost**: ~$0.002 per generation (GPT-3.5-turbo)

### 2. Instagram Publishing
- **File**: `src/lib/services/instagram.ts`
- **Supports**: Photos and Reels
- **Process**: 
  - Photos: 5-10 seconds
  - Reels: 30-60 seconds (includes video processing)

### 3. Analytics Collection
- **File**: `src/app/api/cron/analytics/route.ts`
- **Schedule**: Every 6 hours (configured in `vercel.json`)
- **Collects**: Account insights, post performance
- **Automatic**: No manual action needed

---

## 🚢 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dirt-drop.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `OPENAI_API_KEY`
   - `APPSFLYER_API_TOKEN`
   - `APPSFLYER_APP_ID`
   - `INSTAGRAM_APP_ID`
   - `INSTAGRAM_APP_SECRET`
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID`
   - `CRON_SECRET`
5. Click "Deploy"

### Step 3: Update Instagram Redirect URI

1. Go to Facebook Developers
2. Your App → Settings → Basic
3. Add to "Valid OAuth Redirect URIs":
   ```
   https://your-app.vercel.app/api/instagram/callback
   ```

### Step 4: Verify Cron Job

Vercel automatically sets up the cron job from `vercel.json`. It will run every 6 hours.

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

## 🧪 Testing

### Test AI Caption Generation
```bash
curl -X POST http://localhost:3000/api/content \
  -F "file=@test-image.jpg"
```

### Test Instagram Posting
```bash
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_INSTAGRAM_TOKEN" \
  -d '{
    "action": "approve",
    "fileId": "1234567890-test.jpg",
    "caption": "Test post 🚀 #test"
  }'
```

### Test Analytics Cron
```bash
curl http://localhost:3000/api/cron/analytics \
  -H "Authorization: Bearer sk_cron_secret_change_this_to_random_string_12345"
```

---

## 🐛 Troubleshooting

### AI Captions Not Generating
- Check `OPENAI_API_KEY` is valid
- Verify you have OpenAI credits
- Check browser console for errors

### Instagram Posting Fails
- Verify `INSTAGRAM_BUSINESS_ACCOUNT_ID` is set
- Check access token is valid (not expired)
- Ensure image URL is publicly accessible
- Image must be 1080x1080 or 1080x1350

### Analytics Not Collecting
- Check `INSTAGRAM_ACCESS_TOKEN` is valid
- Verify `INSTAGRAM_BUSINESS_ACCOUNT_ID` is correct
- Ensure account has published posts
- Check Vercel cron logs

### AppsFlyer Shows No Data
- Verify `APPSFLYER_API_TOKEN` is correct
- Check `APPSFLYER_APP_ID` matches your app
- Ensure app exists in AppsFlyer dashboard

---

## 📊 What's Automated

✅ **AI Caption Generation** - Instant on upload
✅ **Instagram Posting** - One-click publish
✅ **Analytics Collection** - Every 6 hours
✅ **Dashboard Updates** - Real-time data

---

## 🎉 You're Done!

Your Instagram marketing automation is complete and ready to use!

### Quick Start:
1. `npm run dev`
2. Go to Content Manager
3. Upload an image
4. Wait for AI suggestions
5. Click "Approve & Post"
6. Check Instagram!

---

## 📚 Additional Documentation

- **CODE_AUTOMATION.md** - Technical details
- **STORAGE_SOLUTION.md** - File storage explanation
- **TROUBLESHOOTING.md** - Common issues
- **README.md** - Project overview

---

## 🔐 Security Notes

- Never commit `.env.local` to git
- Rotate Instagram access token every 60 days
- Keep `CRON_SECRET` random and secure
- Use environment variables in Vercel for production

---

## 🚀 Next Steps (Optional)

- Add database for content history
- Implement scheduled posting
- Add A/B testing for captions
- Multi-account support
- TikTok integration

---

**Built with ❤️ - 100% Code-Based Solution**

No Make.com, no external automation services, just clean code! 🎉
