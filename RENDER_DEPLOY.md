# 🚀 Deploy to Render - Complete Guide

## Why Render?
- ✅ Free tier available
- ✅ Persistent file storage
- ✅ Easy deployment
- ✅ Built-in cron jobs
- ✅ No credit card required for free tier

## 📋 Deployment Steps

### Step 1: Push to GitHub

```bash
cd "/home/hsghumman/Documents/Dirt Drop"
git add .
git commit -m "Instagram automation system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dirt-drop.git
git push -u origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Deploy Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your `dirt-drop` repository
3. Configure:
   - **Name**: `dirt-drop`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. Click **"Advanced"** and add environment variables:

```
OPENAI_API_KEY=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

NEXTAUTH_SECRET=dirt-drop-secret-2024-render

NEXTAUTH_URL=https://dirt-drop.onrender.com

APPSFLYER_API_TOKEN=eyJhbGciOiJBMjU2S1ciLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwidHlwIjoiSldUIiwiemlwIjoiREVGIn0.cVun9LBEFK-ozpsBrQ82p9iIV9Er9vIGAF9FuVF0H9jaiWPuo5-KMQ.6X4e5Ni3JLcO_2vA.j81RlPtorrAjrE-yHqvDfbOGhgryRUB7aGj8kSJVN9BCQDkTNr6AIsG9ovi3tsX03xh2a3LuC1Gh-ISftKw_CgPkfEkNV14nuVusacD6utwb0N6VEX7QAHlYTuPwLUgKxthf6Lzm26N5p2nvumKtOciq8kYlyQIqq8sIHgT07JyoWBQlOG1R2AJYCuB3McJRwftxczSQjwWja5YCqsCUbDL3bXouEjSrQuPqV3LF74CE6qMxMfutxkUZrIA24o70AmX3tHeExphSKOUYxWPJM64cnnfxMmMLnoKfTfUOKteUDTcwg8HM8-_hCNQh_cwOOdpFinKzlW6F7Ud7Fy5otw.PSHrwQeatq_Ah8FnuLG0pA

APPSFLYER_APP_ID=com.arcfreak.dirtdrop

INSTAGRAM_APP_ID=898802415967891

INSTAGRAM_APP_SECRET=55f51256df587cb2e60517db47899e77

INSTAGRAM_ACCESS_TOKEN=EAAMxdL66HpMBQvv3lSPN6KJyd4K6E7eAAfOiuyxlTZCt9HPbG6HPOtHJGbIA7Jm5LQqwT7oHhfZCQa7ZCFDbXp2QcLRDGAiXfCmkNnX69FnvWgNFTkZAbRMv4qgq5LZCnkZBZAze543NBEi5P1ZBte0vYAgtTIZCmD1GG15gZCEEZClT1UvBt2pBmDcPeZC21laXGxWY4loRzED8dUUXcPnyQt6F3WmnXWlV3PGzhx5a

INSTAGRAM_BUSINESS_ACCOUNT_ID=17841476833801694

CRON_SECRET=sk_cron_secret_change_this_to_random_string_12345
```

5. Click **"Create Web Service"**

### Step 4: Wait for Deployment

- First deployment takes 5-10 minutes
- Watch the logs for any errors
- Once deployed, you'll get a URL like: `https://dirt-drop.onrender.com`

### Step 5: Set Up Cron Job (Optional)

1. Click **"New +"** → **"Cron Job"**
2. Configure:
   - **Name**: `instagram-analytics-cron`
   - **Schedule**: `0 */6 * * *` (every 6 hours)
   - **Command**: 
     ```bash
     curl -X GET "https://dirt-drop.onrender.com/api/cron/analytics?secret=sk_cron_secret_change_this_to_random_string_12345"
     ```

3. Click **"Create Cron Job"**

### Step 6: Test Instagram Posting

1. Go to `https://dirt-drop.onrender.com`
2. Upload an image in Content Manager
3. Generate AI captions
4. Click "Approve & Post"
5. ✅ Should post to Instagram!

## ✅ What Works on Render

- ✅ Upload content (persistent storage!)
- ✅ Generate AI captions
- ✅ Post to Instagram
- ✅ View analytics
- ✅ Auto-collect insights (via cron)
- ✅ Files persist between deployments

## 🆚 Render vs Vercel

| Feature | Render | Vercel |
|---------|--------|--------|
| Free Tier | ✅ Yes | ✅ Yes |
| Persistent Storage | ✅ Yes | ❌ No |
| Cron Jobs | ✅ Free | 💰 Pro only |
| Cold Starts | ~30s | ~1s |
| Best For | Full apps | Static/serverless |

## 💰 Cost

### Free Tier
- Web Service: **$0/month**
- 750 hours/month
- Sleeps after 15 min inactivity
- OpenAI API: **$5-15/month**
- **Total: $5-15/month**

### Paid Tier ($7/month)
- Always on (no sleep)
- Faster performance
- More resources

## 🔧 Troubleshooting

### Deployment fails?
- Check build logs in Render dashboard
- Verify all environment variables are set
- Make sure `package.json` has correct scripts

### App sleeps on free tier?
- Free tier sleeps after 15 min inactivity
- First request after sleep takes ~30s
- Upgrade to $7/month for always-on

### Instagram posting fails?
- Check `NEXTAUTH_URL` matches your Render URL
- Verify Instagram credentials
- Check logs in Render dashboard

### Uploads not working?
- Render has persistent storage (unlike Vercel)
- Files should persist between deployments
- Check `public/uploads` directory permissions

## 📊 Monitoring

View logs in Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. See real-time logs

## 🔄 Updates

To update your app:
```bash
git add .
git commit -m "Update"
git push origin main
```

Render auto-deploys on push!

## 🎯 Production Tips

1. **Upgrade to paid tier** ($7/month) for:
   - No sleep
   - Better performance
   - More reliable

2. **Add custom domain**:
   - Go to Settings → Custom Domain
   - Add your domain
   - Update `NEXTAUTH_URL`

3. **Monitor usage**:
   - Check Render dashboard
   - Monitor OpenAI API usage
   - Set up alerts

---

**🎉 You're live on Render! Start posting to Instagram!**
