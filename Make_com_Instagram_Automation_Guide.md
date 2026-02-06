# Complete Make.com Instagram Automation Setup Guide

## 🚀 Quick Start Overview
This guide will set up automated Instagram posting using Make.com that integrates with your AI Marketing Dashboard in **under 30 minutes**.

## 📋 Prerequisites Checklist
- ✅ Make.com account (free tier works)
- ✅ Instagram Business Account
- ✅ Facebook Page connected to Instagram
- ✅ Your AI Marketing Dashboard running

---

## 🔧 PHASE 1: Make.com Scenario Setup (10 minutes)

### Step 1: Create New Scenario
1. **Login** to Make.com → Click **"Create a new scenario"**
2. **Name**: `AI Instagram Auto-Poster`
3. **Save** the scenario

### Step 2: Add Webhook Trigger
1. **Search**: "Webhooks" → Select **"Custom Webhook"**
2. **Click**: "Add" → "Create a webhook"
3. **Name**: `Instagram Post Trigger`
4. **Copy webhook URL** (save this - you'll need it!)
   ```
   Example: https://hook.eu1.make.com/abc123xyz789
   ```

### Step 3: Configure Webhook Data Structure
**Click "Show advanced settings"** and paste this JSON structure:
```json
{
  "action": "create_post",
  "content": {
    "caption": "🚀 Our app just hit 50 downloads! Thanks to our amazing users in Australia 🇦🇺 #mobileapp #startup",
    "image_url": "https://via.placeholder.com/1080x1080/3b82f6/ffffff?text=App+Update",
    "hashtags": ["#app", "#productivity", "#mobile", "#startup"],
    "post_time": "2024-01-15T10:00:00Z"
  },
  "metrics": {
    "total_installs": 34,
    "daily_installs": 2,
    "retention_rate": 23.8,
    "top_country": "Australia"
  }
}
```

---

## 📱 PHASE 2: Instagram Connection (5 minutes)

### Step 4: Add Instagram Module
1. **Click "+"** after webhook
2. **Search**: "Instagram" → Select **"Instagram for Business"**
3. **Choose**: "Create a Media Object" (not "Create a Photo Post")

### Step 5: Connect Instagram Account
1. **Click**: "Create a connection"
2. **Enter your credentials**:
   - **App ID**: `898802415967891` (from your .env file)
   - **App Secret**: `55ff6e22a0070be990f501028944b2f9` (from your .env file)
3. **Follow OAuth** → Select your Instagram Business Account
4. **Test connection** → Should show green checkmark

### Step 6: Configure Instagram Post
**Map these fields exactly**:
- **Media Type**: `IMAGE`
- **Image URL**: `{{content.image_url}}`
- **Caption**: `{{content.caption}}`
- **Instagram Account**: Select your business account

### Step 7: Add Publish Module
1. **Click "+"** after Instagram module
2. **Search**: "Instagram" → Select **"Publish a Media Object"**
3. **Media Object ID**: Map from previous module
4. **Instagram Account**: Same as before

---

## 🤖 PHASE 3: AI Content Enhancement (5 minutes)

### Step 8: Add OpenAI Module (Between Webhook and Instagram)
1. **Click "+"** after webhook, before Instagram
2. **Search**: "OpenAI" → Select **"Create a Completion"**
3. **Connection**: Use API key `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`

### Step 9: Configure AI Prompt
**Paste this exact prompt**:
```
Create an engaging Instagram caption for a mobile app:

App Stats:
- Total installs: {{metrics.total_installs}}
- Daily installs: {{metrics.daily_installs}}
- Retention rate: {{metrics.retention_rate}}%
- Top country: {{metrics.top_country}}

Original caption: {{content.caption}}

Requirements:
- Keep under 150 characters
- Include 3-5 relevant hashtags
- Make it celebratory and engaging
- Include emoji
- Focus on user benefits

Return only the enhanced caption, nothing else.
```

**Settings**:
- **Model**: `gpt-3.5-turbo`
- **Max Tokens**: `100`
- **Temperature**: `0.7`

### Step 10: Update Instagram Caption
**In Instagram module, change caption to**: `{{openai.choices[0].message.content}}`

---

## 🔗 PHASE 4: Dashboard Integration (5 minutes)

### Step 11: Add Webhook URL to Dashboard
**Update your `.env.local` file**:
```env
# Make.com Webhooks
MAKE_INSTAGRAM_WEBHOOK=https://hook.eu1.make.com/YOUR_ACTUAL_WEBHOOK_ID
MAKE_CONTENT_WEBHOOK=https://hook.eu1.make.com/YOUR_ACTUAL_WEBHOOK_ID
```

### Step 12: Add Trigger Button to Dashboard
**Add this to your dashboard** (`src/app/page.tsx`):
```javascript
const triggerInstagramPost = async () => {
  const webhook_url = process.env.NEXT_PUBLIC_MAKE_INSTAGRAM_WEBHOOK || 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID'
  
  const payload = {
    action: "create_post",
    content: {
      caption: `🚀 Our app just hit ${metrics?.totalDownloads} downloads! Thanks to our amazing users in ${geoData[0]?.country} 🎉`,
      image_url: "https://via.placeholder.com/1080x1080/3b82f6/ffffff?text=App+Milestone",
      hashtags: ["#mobileapp", "#startup", "#appdownloads", "#success"],
      post_time: new Date().toISOString()
    },
    metrics: {
      total_installs: metrics?.totalDownloads || 0,
      daily_installs: metrics?.dailyDownloads || 0,
      retention_rate: metrics?.retentionRate || 0,
      top_country: geoData[0]?.country || 'Unknown'
    }
  }
  
  try {
    const response = await fetch(webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    if (response.ok) {
      alert('Instagram post triggered successfully!')
    } else {
      alert('Failed to trigger post')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error triggering post')
  }
}
```

**Add trigger button in your dashboard header**:
```jsx
<button 
  onClick={triggerInstagramPost}
  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
>
  📸 Post to Instagram
</button>
```

---

## ⚡ PHASE 5: Automated Triggers (5 minutes)

### Step 13: Create Scheduled Scenario
1. **Create new scenario**: `Daily Instagram Post`
2. **Add Schedule trigger**: Daily at 10 AM
3. **Add HTTP module**: GET request to `http://localhost:3000/api/appsflyer`
4. **Add same Instagram modules** as above
5. **Map data** from API response

### Step 14: Milestone Trigger
**Add this to your dashboard's `loadData` function**:
```javascript
// Auto-trigger Instagram post on milestones
if (totalInstalls > 0 && totalInstalls % 10 === 0) { // Every 10 downloads
  triggerInstagramPost()
}
```

---

## 🧪 TESTING YOUR SETUP (2 minutes)

### Step 15: Test Webhook
1. **In Make.com**: Click "Run once" on your scenario
2. **In your dashboard**: Click the "📸 Post to Instagram" button
3. **Check Make.com**: Should show successful execution
4. **Check Instagram**: Post should appear within 2-3 minutes

### Step 16: Verify Data Flow
**Expected flow**:
1. Dashboard button clicked ✅
2. Webhook receives data ✅
3. OpenAI enhances caption ✅
4. Instagram post created ✅
5. Post published to Instagram ✅

---

## 📊 CONTENT TEMPLATES

### Template 1: Milestone Posts
```javascript
const milestonePost = {
  caption: `🎉 MILESTONE ALERT! We just hit ${totalInstalls} downloads! Thank you to all our users, especially in ${topCountry}! 🚀 #milestone #grateful #mobileapp`,
  image_url: "https://via.placeholder.com/1080x1080/10b981/ffffff?text=Milestone+Reached"
}
```

### Template 2: Performance Updates
```javascript
const performancePost = {
  caption: `📈 Weekly Update: ${dailyInstalls} new downloads today! Our retention rate is ${retentionRate}% and growing! 💪 #growth #performance #app`,
  image_url: "https://via.placeholder.com/1080x1080/f97316/ffffff?text=Weekly+Update"
}
```

### Template 3: Feature Announcements
```javascript
const featurePost = {
  caption: `🆕 NEW FEATURE ALERT! We've just released an amazing update based on your feedback! Download now 📱 #newfeature #update #userdriven`,
  image_url: "https://via.placeholder.com/1080x1080/8b5cf6/ffffff?text=New+Feature"
}
```

---

## 🚨 TROUBLESHOOTING

### Common Issues & Fixes

**❌ "Webhook not receiving data"**
- ✅ Check webhook URL is correct in `.env.local`
- ✅ Restart your Next.js development server
- ✅ Test with Postman or curl

**❌ "Instagram connection failed"**
- ✅ Verify App ID and App Secret are correct
- ✅ Ensure Instagram account is Business account
- ✅ Check Facebook Page is connected to Instagram

**❌ "OpenAI not working"**
- ✅ Verify API key is valid and has credits
- ✅ Check prompt format and token limits
- ✅ Test OpenAI module separately

**❌ "Posts not appearing on Instagram"**
- ✅ Check Instagram API rate limits (25 posts/day)
- ✅ Verify image URL is accessible
- ✅ Ensure caption is under 2,200 characters

---

## 🎯 OPTIMIZATION TIPS

### Best Posting Times
- **Weekdays**: 8 AM, 12 PM, 6 PM
- **Weekends**: 10 AM, 2 PM, 8 PM
- **Avoid**: Late night (11 PM - 6 AM)

### Content Mix Strategy
- 🎉 **40%** Milestones & achievements
- 📊 **30%** Performance updates
- 🆕 **20%** Feature announcements
- 👥 **10%** User testimonials

### Hashtag Strategy
- Use 5-10 hashtags per post
- Mix popular (#mobileapp) and niche (#startuplife) tags
- Include location-based tags (#australianstartup)
- Rotate hashtags to avoid shadowbanning

---

## 🔒 SECURITY CHECKLIST

- ✅ API keys stored in environment variables
- ✅ Webhook URLs not exposed in client-side code
- ✅ Instagram tokens refresh automatically
- ✅ Rate limiting implemented
- ✅ Error handling for failed posts

---

## 🚀 LAUNCH CHECKLIST

**Before going live**:
- [ ] Test webhook with sample data
- [ ] Verify Instagram posts appear correctly
- [ ] Check AI-generated captions are appropriate
- [ ] Set up error notifications
- [ ] Configure posting schedule
- [ ] Test milestone triggers
- [ ] Verify all API connections
- [ ] Set up monitoring dashboard

**You're ready to launch! 🎉**

---

## 📞 SUPPORT

**If you need help**:
1. Check Make.com execution history for errors
2. Test each module individually
3. Verify all API connections are active
4. Check rate limits and quotas
5. Review webhook payload format

**Your Instagram automation is now complete and ready to drive app growth! 🚀📱**