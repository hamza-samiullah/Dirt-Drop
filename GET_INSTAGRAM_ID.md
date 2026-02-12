# How to Get Your Instagram Business Account ID

## The Problem
Your Instagram is connected to Facebook, but the Graph API doesn't return the `instagram_business_account` field.

## Solution: 3 Methods

### Method 1: Instagram Professional Dashboard (Easiest)
1. Go to https://business.facebook.com/latest/settings/instagram_accounts
2. Click on your connected Instagram account
3. Look at the URL - it will show: `instagram_accounts/{YOUR_INSTAGRAM_ID}`
4. Copy that ID

### Method 2: Meta Business Suite
1. Go to https://business.facebook.com/
2. Click "Settings" → "Instagram accounts"
3. Click on your Instagram account
4. The ID will be in the URL or account details

### Method 3: Graph API Explorer (Most Reliable)
1. Go to https://developers.facebook.com/tools/explorer/
2. Select your app from dropdown
3. Click "Get Token" → "Get User Access Token"
4. Select permissions: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`
5. Click "Generate Access Token"
6. In the query field, enter: `me/accounts?fields=instagram_business_account`
7. Click "Submit"
8. Look for `instagram_business_account` → `id` in the response

### Method 4: Direct API Call
Run this in your browser console or terminal:

```javascript
// In browser console on any page
fetch('https://graph.facebook.com/v18.0/me/accounts?fields=instagram_business_account&access_token=YOUR_ACCESS_TOKEN')
  .then(r => r.json())
  .then(d => console.log(d))
```

Replace `YOUR_ACCESS_TOKEN` with your token from `.env.local`

### Method 5: Check Page Settings
1. Go to your Facebook Page: https://www.facebook.com/953961091123759
2. Click "Settings"
3. Click "Instagram" in left sidebar
4. If Instagram is connected, you'll see account details
5. Sometimes the ID is visible in the connection settings

## Why This Happens
- Instagram must be a **Business** or **Creator** account (not Personal)
- Instagram must be connected to a Facebook **Page** (not just logged in)
- The Facebook Page must have proper permissions
- The access token must have correct scopes

## Quick Fix: Convert to Business Account
If you have a Personal Instagram account:

1. Open Instagram app
2. Go to Settings → Account
3. Click "Switch to Professional Account"
4. Choose "Business" or "Creator"
5. Connect to your Facebook Page (ID: 953961091123759)
6. Wait 5-10 minutes for API to update
7. Try Method 3 again

## Verify Your Setup
Once you have the ID, test it:

```bash
curl "https://graph.facebook.com/v18.0/YOUR_INSTAGRAM_ID?fields=username,followers_count&access_token=YOUR_ACCESS_TOKEN"
```

You should see your Instagram username and follower count.

## Add to .env.local
Once you have the ID:

```env
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841234567890123
```

Then restart your dev server:
```bash
npm run dev
```

## Still Not Working?
If none of these work, your Instagram might not be properly set up as a Business account connected to a Facebook Page. Contact me with:
- Your Instagram username
- Your Facebook Page ID (953961091123759)
- Screenshot of Instagram account type (Settings → Account)
