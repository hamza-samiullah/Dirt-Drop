# Deploy to Vercel - Quick Guide

## 🚀 One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/dirt-drop)

## 📋 Manual Deployment Steps

### 1. Push to GitHub

```bash
cd "/home/hsghumman/Documents/Dirt Drop"
git init
git add .
git commit -m "Instagram automation system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dirt-drop.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Click "Deploy" (it will fail first time - that's OK!)

### 3. Add Environment Variables

Go to your project → Settings → Environment Variables

Add these:

```
OPENAI_API_KEY=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

NEXTAUTH_SECRET=dirt-drop-secret-2024-change-this
NEXTAUTH_URL=https://your-app-name.vercel.app

APPSFLYER_API_TOKEN=eyJhbGciOiJBMjU2S1ciLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwidHlwIjoiSldUIiwiemlwIjoiREVGIn0.cVun9LBEFK-ozpsBrQ82p9iIV9Er9vIGAF9FuVF0H9jaiWPuo5-KMQ.6X4e5Ni3JLcO_2vA.j81RlPtorrAjrE-yHqvDfbOGhgryRUB7aGj8kSJVN9BCQDkTNr6AIsG9ovi3tsX03xh2a3LuC1Gh-ISftKw_CgPkfEkNV14nuVusacD6utwb0N6VEX7QAHlYTuPwLUgKxthf6Lzm26N5p2nvumKtOciq8kYlyQIqq8sIHgT07JyoWBQlOG1R2AJYCuB3McJRwftxczSQjwWja5YCqsCUbDL3bXouEjSrQuPqV3LF74CE6qMxMfutxkUZrIA24o70AmX3tHeExphSKOUYxWPJM64cnnfxMmMLnoKfTfUOKteUDTcwg8HM8-_hCNQh_cwOOdpFinKzlW6F7Ud7Fy5otw.PSHrwQeatq_Ah8FnuLG0pA
APPSFLYER_APP_ID=com.arcfreak.dirtdrop

INSTAGRAM_APP_ID=898802415967891
INSTAGRAM_APP_SECRET=55f51256df587cb2e60517db47899e77
INSTAGRAM_ACCESS_TOKEN=EAAMxdL66HpMBQvv3lSPN6KJyd4K6E7eAAfOiuyxlTZCt9HPbG6HPOtHJGbIA7Jm5LQqwT7oHhfZCQa7ZCFDbXp2QcLRDGAiXfCmkNnX69FnvWgNFTkZAbRMv4qgq5LZCnkZBZAze543NBEi5P1ZBte0vYAgtTIZCmD1GG15gZCEEZClT1UvBt2pBmDcPeZC21laXGxWY4loRzED8dUUXcPnyQt6F3WmnXWlV3PGzhx5a
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841476833801694

CRON_SECRET=sk_cron_secret_change_this_to_random_string_12345
```

**IMPORTANT:** Replace `NEXTAUTH_URL` with your actual Vercel URL!

### 4. Redeploy

Go to Deployments → Click "..." → Redeploy

### 5. Test Instagram Posting

1. Go to your Vercel URL
2. Upload an image in Content Manager
3. Generate AI captions
4. Click "Approve & Post"
5. ✅ Should post to Instagram!

## ✅ What Works After Deployment

- ✅ Upload content
- ✅ Generate AI captions
- ✅ Post to Instagram (now works!)
- ✅ View analytics
- ✅ Auto-collect insights every 6 hours

## 🔧 Troubleshooting

### Instagram posting still fails?
- Check `NEXTAUTH_URL` matches your Vercel URL exactly
- Verify Instagram access token is valid
- Check Instagram Business Account ID is correct

### Cron not running?
- Vercel Cron requires Pro plan OR
- Use Vercel Hobby plan (free) - cron runs but limited

### Images not uploading?
- Vercel has read-only filesystem
- Uploads work but won't persist between deployments
- For production, use Cloudinary or S3 (see upgrade guide)

## 📊 Cost

- Vercel Hobby: **$0/month** (perfect for testing)
- OpenAI API: **$5-15/month**
- **Total: $5-15/month**

---

**🎉 You're live! Start posting to Instagram!**
