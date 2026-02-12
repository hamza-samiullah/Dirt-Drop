# Required Information Checklist

Complete this checklist before deploying the system.

---

## ✅ Required API Keys & Credentials

### 1. OpenAI API Key
- [ ] Sign up at https://platform.openai.com/
- [ ] Create API key
- [ ] Add to `.env.local` as `OPENAI_API_KEY`
- [ ] Ensure you have credits ($5 minimum recommended)

**Status**: ✅ Already configured

---

### 2. Instagram Access Token & Business Account ID

**Current Status**: ❌ **BOTH MISSING - REQUIRED**

Your current access token is invalid/expired. You need to generate a new one.

#### Step-by-Step Instructions:

**Step 1: Connect Instagram in Dashboard**
1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click **"Instagram"** tab
4. Click **"Connect Instagram"** button
5. Follow OAuth flow to authorize
6. Access token will be saved automatically

**Step 2: Get Business Account ID**

After connecting Instagram:

**Option A: From Browser Console (Easiest)**
1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.getItem('instagram_business_account_id')
   ```
3. Copy the ID
4. Add to `.env.local`:
   ```env
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your_id_here
   ```

**Option B: From Graph API Explorer**
1. Go to https://developers.facebook.com/tools/explorer/
2. Select your Instagram app (ID: 898802415967891)
3. Click "Generate Access Token"
4. Grant permissions: `pages_show_list`, `instagram_basic`, `instagram_content_publish`
5. Run query: `me/accounts?fields=instagram_business_account`
6. Copy the `instagram_business_account.id` value
7. Add to `.env.local`

**Step 3: Update Access Token in .env.local**

After connecting via dashboard:
1. Open browser console
2. Run:
   ```javascript
   localStorage.getItem('instagram_access_token')
   ```
3. Copy the token
4. Update `.env.local`:
   ```env
   INSTAGRAM_ACCESS_TOKEN=your_new_token_here
   ```

**This is REQUIRED for Instagram posting to work!**

---

### 3. Instagram Access Token Expiry

**Current Status**: ❌ **EXPIRED - Need to refresh**

**Note**: Instagram access tokens expire after 60 days.

#### To Get New Token:
**Use the dashboard (Easiest):**
1. Run `npm run dev`
2. Go to Instagram tab
3. Click "Connect Instagram"
4. Token saved automatically

**Or manually refresh:**
1. Go to https://developers.facebook.com/tools/explorer/
2. Select app ID: 898802415967891
3. Generate new token with permissions
4. Update `.env.local`

---

### 4. AppsFlyer API Token

**Status**: ✅ Already configured

---

### 5. Cron Secret

**Status**: ✅ Already configured

**Note**: Change this to a random string before deploying to production.

---

## 📋 Pre-Deployment Checklist

### Local Development
- [ ] All environment variables set in `.env.local`
- [ ] Instagram Business Account ID added
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test file upload
- [ ] Test AI caption generation
- [ ] Test Instagram posting
- [ ] Verify dashboard loads

### Vercel Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] All environment variables added to Vercel
- [ ] Instagram redirect URI updated with Vercel domain
- [ ] Deployment successful
- [ ] Cron job verified in Vercel dashboard
- [ ] Test production deployment

---

## 🔑 Environment Variables Summary

Copy this to Vercel environment variables:

```env
OPENAI_API_KEY=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

NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app

APPSFLYER_API_TOKEN=eyJhbGciOiJBMjU2S1ciLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwidHlwIjoiSldUIiwiemlwIjoiREVGIn0.cVun9LBEFK-ozpsBrQ82p9iIV9Er9vIGAF9FuVF0H9jaiWPuo5-KMQ.6X4e5Ni3JLcO_2vA.j81RlPtorrAjrE-yHqvDfbOGhgryRUB7aGj8kSJVN9BCQDkTNr6AIsG9ovi3tsX03xh2a3LuC1Gh-ISftKw_CgPkfEkNV14nuVusacD6utwb0N6VEX7QAHlYTuPwLUgKxthf6Lzm26N5p2nvumKtOciq8kYlyQIqq8sIHgT07JyoWBQlOG1R2AJYCuB3McJRwftxczSQjwWja5YCqsCUbDL3bXouEjSrQuPqV3LF74CE6qMxMfutxkUZrIA24o70AmX3tHeExphSKOUYxWPJM64cnnfxMmMLnoKfTfUOKteUDTcwg8HM8-_hCNQh_cwOOdpFinKzlW6F7Ud7Fy5otw.PSHrwQeatq_Ah8FnuLG0pA
APPSFLYER_APP_ID=com.arcfreak.dirtdrop

INSTAGRAM_APP_ID=898802415967891
INSTAGRAM_APP_SECRET=55ff6e22a0070be990f501028944b2f9
INSTAGRAM_ACCESS_TOKEN=EAAMxdL66HpMBQkL3R5DBLjjlE9hORJZBtjm6py97Py7mxvF1UlbV2Rht0BwEqmcw208BEYqyezXvsTRqrtBARxxobCBbe5vE96s0iij3YE7h0pAfeRQZCgAmYZBKtPoWImPlj6BUycnfOtGdxsA6ZCt7NCogZAoWxRzmHibgoxZB4YNy4m2yYBwxX1ywih
INSTAGRAM_BUSINESS_ACCOUNT_ID=YOUR_ID_HERE  ← GET THIS!

CRON_SECRET=generate_random_string_here
```

---

## ⚠️ Critical Missing Items

**YOU MUST GET**:
1. ❌ Instagram Access Token (expired - need new one)
2. ❌ Instagram Business Account ID

**Easiest way**: Use the dashboard!

1. Run `npm run dev`
2. Go to Instagram tab
3. Click "Connect Instagram"
4. Follow OAuth flow
5. Both token and ID saved automatically!
6. Copy them from browser console to `.env.local`

Without these, Instagram posting will NOT work.

---

## 🎯 Quick Test After Setup

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click "Content Manager"
4. Upload a test image
5. Wait for AI suggestions (2-3 seconds)
6. Click "Approve & Post"
7. Check your Instagram account

If it posts successfully, you're ready to deploy!

---

## 📞 Need Help?

Check these files:
- **FINAL_SETUP.md** - Complete setup guide
- **TROUBLESHOOTING.md** - Common issues
- **CODE_AUTOMATION.md** - Technical details

---

**Status**: Almost ready! Just need Instagram Business Account ID.
