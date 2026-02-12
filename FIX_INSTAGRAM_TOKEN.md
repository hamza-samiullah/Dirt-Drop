# Quick Fix: Instagram Access Token Expired

## Problem
Your Instagram access token is invalid/expired. Error: "Cannot parse access token"

## Solution (2 Minutes)

### Option 1: Use Dashboard (Easiest)

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Go to Instagram tab:**
   - Open http://localhost:3000
   - Click "Instagram" tab
   - Click "Connect Instagram" button

3. **Authorize:**
   - Follow OAuth flow
   - Grant permissions
   - Token saved automatically!

4. **Copy credentials:**
   - Open browser console (F12)
   - Run:
     ```javascript
     console.log('Token:', localStorage.getItem('instagram_access_token'))
     console.log('Business ID:', localStorage.getItem('instagram_business_account_id'))
     ```
   - Copy both values

5. **Update .env.local:**
   ```env
   INSTAGRAM_ACCESS_TOKEN=paste_token_here
   INSTAGRAM_BUSINESS_ACCOUNT_ID=paste_id_here
   ```

6. **Restart server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

**Done!** Test by uploading an image in Content Manager.

---

### Option 2: Manual (Graph API Explorer)

1. **Go to:** https://developers.facebook.com/tools/explorer/

2. **Select your app:**
   - App ID: 898802415967891

3. **Generate token:**
   - Click "Generate Access Token"
   - Grant permissions:
     - `pages_show_list`
     - `instagram_basic`
     - `instagram_content_publish`
   - Copy the token

4. **Get Business Account ID:**
   - Run query: `me/accounts?fields=instagram_business_account`
   - Copy the `instagram_business_account.id`

5. **Update .env.local:**
   ```env
   INSTAGRAM_ACCESS_TOKEN=your_new_token
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_id
   ```

---

## Why This Happened

Instagram access tokens expire after 60 days. You need to refresh them periodically.

## Prevention

Set a reminder to refresh your token every 60 days, or use the dashboard to reconnect when needed.

---

## Test It Works

```bash
npm run dev
```

1. Go to Content Manager
2. Upload an image
3. Wait for AI suggestions
4. Click "Approve & Post"
5. Check Instagram!

If it posts successfully, you're all set! 🎉
