# 🧪 Quick Test Guide

## Test Instagram Posting (2 minutes)

### Step 1: Start Server
```bash
npm run dev
```

### Step 2: Upload Test Image
1. Go to http://localhost:3000
2. Click **"Content Manager"** tab
3. Click **"Upload File"**
4. Select any image from your computer
5. Wait for upload confirmation

### Step 3: Generate AI Captions
1. Click on the uploaded image
2. Click **"Generate AI Captions"** button
3. Wait 2-3 seconds
4. You'll see 3 AI-generated caption options
5. Select one or edit it

### Step 4: Post to Instagram
1. Click **"Approve & Post"** button
2. Wait 5-10 seconds
3. You should see: "✅ Posted to Instagram! Post ID: 123456789"

### Step 5: Verify on Instagram
1. Open Instagram app or web
2. Go to your profile: https://www.instagram.com/
3. Check if the post appears!

## Expected Results

✅ **Upload**: File appears in Content Manager grid
✅ **AI Captions**: 3 options with hashtags and posting time
✅ **Post**: Success message with Instagram Post ID
✅ **Instagram**: Post visible on your Instagram profile

## Troubleshooting

### Error: "Instagram credentials not configured"
- Check `.env.local` has `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_BUSINESS_ACCOUNT_ID`
- Restart server: `npm run dev`

### Error: "Failed to post to Instagram"
- Access token might be expired
- Generate new token from Graph API Explorer
- Update `.env.local`

### Error: "Failed to generate AI captions"
- Check `OPENAI_API_KEY` in `.env.local`
- Verify you have OpenAI API credits

## Test Analytics (Optional)

### Manual Trigger
```bash
curl http://localhost:3000/api/cron/analytics?secret=sk_cron_secret_change_this_to_random_string_12345
```

Should return: `{"success": true, "message": "Analytics collected successfully"}`

## All Tests Passing? 🎉

You're ready to deploy to Vercel!

```bash
git add .
git commit -m "Complete Instagram automation system"
git push origin main
```

Then deploy on Vercel dashboard.

---

**Need help? Check PROJECT_COMPLETE.md for full documentation**
