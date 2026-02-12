# 🔧 Troubleshooting Guide - Render Deployment

## Common Issues & Solutions

### 1. ❌ OpenAI API Key Invalid

**Error:** `Incorrect API key provided`

**Solution:**
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. In Render dashboard → Environment → Update `OPENAI_API_KEY`
4. Save (auto-redeploys)

### 2. ❌ Instagram Posting Fails

**Error:** `Only photo or video can be accepted as media type`

**Causes & Solutions:**

#### A. NEXTAUTH_URL Not Set Correctly
```bash
# In Render Environment, set:
NEXTAUTH_URL=https://your-app-name.onrender.com
```
**Must match your actual Render URL exactly!**

#### B. Instagram Access Token Expired
1. Go to Graph API Explorer: https://developers.facebook.com/tools/explorer/
2. Select your app
3. Get Token → Get Page Access Token
4. Select your page
5. Copy new token
6. Update `INSTAGRAM_ACCESS_TOKEN` in Render

#### C. Instagram Business Account ID Wrong
Verify in Render logs:
```
Posting to Instagram: { mediaUrl: '...', isVideo: false, caption: '...' }
```

If `mediaUrl` shows `localhost`, `NEXTAUTH_URL` is wrong.

### 3. ❌ No Instagram Performance Data

**Why:** No posts yet or analytics not collected

**Solution:**
1. Post at least one image successfully
2. Wait 6 hours for cron to run
3. Or manually trigger: `curl https://your-app.onrender.com/api/cron/analytics?secret=YOUR_CRON_SECRET`

### 4. ❌ App Sleeps (Free Tier)

**Symptom:** First request takes 30+ seconds

**Solutions:**
- **Free:** Accept 15min sleep time
- **Paid ($7/month):** Upgrade to always-on
- **Workaround:** Use UptimeRobot to ping every 14 min

### 5. ❌ Build Fails

**Check Render logs for:**

#### Missing Dependencies
```bash
# Solution: Ensure package.json has all deps
npm install
```

#### Node Version
```bash
# In render.yaml or Environment:
NODE_VERSION=18.17.0
```

### 6. ❌ Uploads Not Working

**Check:**
1. `public/uploads` directory exists
2. Render has write permissions (should be automatic)
3. Check logs for file write errors

### 7. ❌ Environment Variables Not Loading

**Solution:**
1. Go to Render dashboard → Environment
2. Verify ALL variables are set:
   - OPENAI_API_KEY
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - INSTAGRAM_ACCESS_TOKEN
   - INSTAGRAM_BUSINESS_ACCOUNT_ID
   - APPSFLYER_API_TOKEN
   - APPSFLYER_APP_ID
   - INSTAGRAM_APP_ID
   - INSTAGRAM_APP_SECRET
   - CRON_SECRET

3. Click "Save Changes" (triggers redeploy)

## 🔍 Debugging Steps

### Step 1: Check Render Logs
```
Render Dashboard → Your Service → Logs
```

Look for:
- `Posting to Instagram:` - Shows URL being sent
- `Container response:` - Instagram API response
- `Error publishing photo:` - Actual error

### Step 2: Test Instagram Credentials

Run in browser console:
```javascript
fetch('https://graph.facebook.com/v18.0/17841476833801694?fields=username,followers_count&access_token=YOUR_TOKEN')
  .then(r => r.json())
  .then(d => console.log(d))
```

Should return Instagram username. If error, token/ID is wrong.

### Step 3: Test Image URL

In browser, visit:
```
https://your-app.onrender.com/uploads/your-image.jpg
```

Should show the image. If 404, upload failed.

### Step 4: Check NEXTAUTH_URL

In Render logs, look for:
```
Posting to Instagram: { mediaUrl: 'https://your-app.onrender.com/uploads/...' }
```

If shows `localhost`, `NEXTAUTH_URL` is wrong.

## 📊 Expected Behavior

### Successful Upload
```
✅ File uploaded successfully!
```

### Successful AI Generation
```
Container response: { id: '123456789' }
```

### Successful Instagram Post
```
Publish response: { id: '987654321' }
✅ Posted to Instagram! Post ID: 987654321
```

## 🆘 Still Not Working?

### Get Help
1. Check Render logs (copy full error)
2. Verify all environment variables
3. Test Instagram credentials manually
4. Check if OpenAI key is valid

### Quick Test Checklist
- [ ] OpenAI key is valid (test at platform.openai.com)
- [ ] Instagram token is valid (test in Graph API Explorer)
- [ ] NEXTAUTH_URL matches Render URL exactly
- [ ] Instagram Business Account ID is correct
- [ ] All environment variables are set in Render
- [ ] App is deployed successfully (no build errors)

---

**Most common issue: NEXTAUTH_URL not set correctly in Render!**
