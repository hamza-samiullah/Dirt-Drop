# 🚀 DEPLOY NOW - Instagram Posting Requires Public URL

## ⚠️ Important: Localhost Won't Work for Instagram

Instagram Graph API requires **publicly accessible URLs** for images/videos. 

`http://localhost:3000/uploads/image.jpg` ❌ Won't work
`https://your-app.vercel.app/uploads/image.jpg` ✅ Will work

## 🎯 Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
cd "/home/hsghumman/Documents/Dirt Drop"
git init
git add .
git commit -m "Instagram automation system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dirt-drop.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `APPSFLYER_API_TOKEN`
   - `APPSFLYER_APP_ID`
   - `INSTAGRAM_APP_ID`
   - `INSTAGRAM_APP_SECRET`
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID`
   - `CRON_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = `https://your-app.vercel.app`

4. Click "Deploy"

### Step 3: Test Instagram Posting
1. Go to `https://your-app.vercel.app`
2. Upload image in Content Manager
3. Generate AI captions
4. Click "Approve & Post"
5. ✅ Should post to Instagram!

## 🧪 Alternative: Test Locally with ngrok

If you want to test before deploying:

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com/download

# Start your app
npm run dev

# In another terminal, expose it
ngrok http 3000

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Update NEXTAUTH_URL in .env.local to this URL
# Now Instagram can access your images!
```

## 📊 What Works Now

✅ **Content Upload** - Works locally
✅ **AI Caption Generation** - Works locally  
✅ **File Management** - Works locally
✅ **Dashboard & Analytics** - Works locally
❌ **Instagram Posting** - Needs public URL (deploy to Vercel)

## 🎉 After Deployment

Everything will work:
- Upload content
- Generate AI captions
- Post directly to Instagram
- View analytics
- Auto-collect insights every 6 hours

## 💡 Why This Happens

Instagram's API downloads the image from the URL you provide. It can't access `localhost:3000` because that's only on your computer. Once deployed to Vercel, the URL becomes public and Instagram can download it.

---

**Ready to deploy? Follow Step 1-3 above! Takes 5 minutes.** 🚀
