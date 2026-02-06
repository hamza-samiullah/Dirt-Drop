# 📸 Complete Content Management & Instagram Automation Guide

## 🎯 Overview
This system allows you to:
1. Upload images/videos to Google Drive
2. View and manage content in the dashboard
3. Approve content with custom captions
4. Auto-post to Instagram via Make.com

---

## 📁 PART 1: Google Drive Setup (5 minutes)

### Step 1: Create Google Drive Folder
1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder: **"Instagram Content"**
3. Copy the folder ID from URL:
   ```
   https://drive.google.com/drive/folders/1ABC123XYZ789
                                          ↑ This is your folder ID
   ```

### Step 2: Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: **"Instagram Automation"**
3. Enable **Google Drive API**
4. Go to **Credentials** → **Create Credentials** → **Service Account**
5. Name: `instagram-content-manager`
6. Click **Create and Continue** → **Done**

### Step 3: Get Service Account Credentials
1. Click on the service account you created
2. Go to **Keys** tab → **Add Key** → **Create New Key**
3. Choose **JSON** → Download the file
4. Open the JSON file and copy:
   - `client_email`
   - `private_key`

### Step 4: Share Drive Folder
1. Go back to your Google Drive folder
2. Click **Share**
3. Add the service account email (from JSON file)
4. Give **Editor** access

---

## 🔧 PART 2: Dashboard Configuration (3 minutes)

### Update Environment Variables
Add to Vercel (or `.env.local`):

```env
GOOGLE_DRIVE_CLIENT_EMAIL=instagram-content@project.iam.gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----
GOOGLE_DRIVE_FOLDER_ID=1ABC123XYZ789

MAKE_CONTENT_WEBHOOK=https://hook.eu1.make.com/YOUR_CONTENT_WEBHOOK_ID
```

**Important**: Replace `\n` in private key with actual newlines in Vercel.

---

## 🤖 PART 3: Make.com Content Automation (15 minutes)

### Scenario 1: Content Approval & Posting

#### Step 1: Create New Scenario
1. Go to Make.com → **Create new scenario**
2. Name: **"Instagram Content Approval System"**

#### Step 2: Add Webhook Trigger
1. Add **Webhooks** → **Custom Webhook**
2. Name: `Content Approval Trigger`
3. Copy webhook URL → Save to `MAKE_CONTENT_WEBHOOK`

#### Step 3: Test Webhook Data Structure
Expected JSON:
```json
{
  "action": "post_to_instagram",
  "fileId": "1ABC123XYZ",
  "imageUrl": "https://drive.google.com/uc?export=view&id=1ABC123XYZ",
  "caption": "Check out our latest update! 🚀 #app #mobile",
  "scheduledTime": "2024-01-15T10:00:00Z"
}
```

#### Step 4: Add Google Drive Module
1. Click **+** → Search **"Google Drive"**
2. Select **"Download a File"**
3. **Connection**: Create new connection with your Google account
4. **File ID**: Map from webhook `{{fileId}}`
5. **Convert to**: Leave as is

#### Step 5: Add Instagram Module
1. Click **+** → Search **"Instagram"**
2. Select **"Create a Media Object"**
3. **Connection**: Use your Instagram Business account
4. **Media Type**: `IMAGE`
5. **Image URL**: Map from webhook `{{imageUrl}}`
6. **Caption**: Map from webhook `{{caption}}`

#### Step 6: Add Publish Module
1. Click **+** → Search **"Instagram"**
2. Select **"Publish a Media Object"**
3. **Media Object ID**: Map from previous module
4. **Instagram Account**: Same as before

#### Step 7: Add Delay (Optional)
If you want scheduled posting:
1. Before Instagram modules, add **Tools** → **Sleep**
2. **Delay**: Calculate from `{{scheduledTime}}`

#### Step 8: Add Error Handling
1. Add error handler route to webhook
2. Add **Email** module to notify on failures
3. Configure retry logic

---

## 📱 PART 4: Using the System

### Upload Content
1. Upload images/videos to your Google Drive folder
2. Supported formats: JPG, PNG, MP4, MOV
3. Recommended size: 1080x1080px for images

### Approve & Post from Dashboard
1. Go to **Content Manager** in dashboard
2. Click **Refresh** to load new content
3. Click on any image/video
4. Add caption and hashtags
5. (Optional) Set scheduled time
6. Click **Approve & Post**

### What Happens Next
1. ✅ Dashboard sends data to Make.com webhook
2. ✅ Make.com downloads file from Google Drive
3. ✅ Make.com creates Instagram media object
4. ✅ Make.com publishes to Instagram
5. ✅ You get confirmation notification

---

## 🎨 PART 5: Content Best Practices

### Image Requirements
- **Size**: 1080x1080px (square) or 1080x1350px (portrait)
- **Format**: JPG or PNG
- **Max file size**: 8MB
- **Aspect ratio**: 1:1 or 4:5

### Video Requirements
- **Size**: 1080x1920px (stories) or 1080x1080px (feed)
- **Format**: MP4 or MOV
- **Max file size**: 100MB
- **Duration**: 3-60 seconds (feed), 15 seconds (stories)

### Caption Best Practices
- **Length**: 125-150 characters for optimal engagement
- **Hashtags**: 5-10 relevant hashtags
- **Emojis**: Use 2-3 emojis for visual appeal
- **CTA**: Include clear call-to-action

### Posting Schedule
- **Best times**: 8 AM, 12 PM, 6 PM (user's timezone)
- **Frequency**: 1-2 posts per day
- **Consistency**: Post at same times daily

---

## 🔄 PART 6: Advanced Automation

### Auto-Caption Generation
Add OpenAI module before Instagram:

```
Prompt: Create an engaging Instagram caption for this image.
Context: Mobile app with {{totalInstalls}} downloads
Style: Professional, exciting, include 5 hashtags
Length: Under 150 characters
```

### Content Scheduling Queue
1. Add **Google Sheets** module
2. Store approved content with scheduled times
3. Use **Schedule** trigger to post at specific times
4. Mark as posted after successful posting

### Performance Tracking
1. After posting, add **HTTP** module
2. Send post data back to dashboard:
   ```json
   {
     "action": "track_post",
     "postId": "{{instagram.id}}",
     "fileId": "{{fileId}}",
     "postedAt": "{{now}}"
   }
   ```

---

## 🚨 Troubleshooting

### "No content found"
- ✅ Check Google Drive folder ID is correct
- ✅ Verify service account has access to folder
- ✅ Ensure files are images or videos
- ✅ Click Refresh button

### "Webhook not configured"
- ✅ Add `MAKE_CONTENT_WEBHOOK` to environment variables
- ✅ Restart Vercel deployment
- ✅ Test webhook with Postman

### "Failed to post to Instagram"
- ✅ Check Instagram Business account is connected
- ✅ Verify image meets Instagram requirements
- ✅ Check Make.com execution logs
- ✅ Ensure caption is under 2,200 characters

### "Google Drive access denied"
- ✅ Verify service account email is correct
- ✅ Check folder is shared with service account
- ✅ Ensure Google Drive API is enabled

---

## 📊 PART 7: Monitoring & Analytics

### Make.com Dashboard
- View execution history
- Check success/failure rates
- Monitor API usage
- Set up email alerts

### Dashboard Analytics
Track in your dashboard:
- Content uploaded vs posted
- Approval rate
- Posting frequency
- Engagement per post type

---

## ✅ Launch Checklist

**Before going live**:
- [ ] Google Drive folder created and shared
- [ ] Service account credentials added to Vercel
- [ ] Make.com scenario created and tested
- [ ] Webhook URLs configured
- [ ] Test upload and approval flow
- [ ] Verify Instagram posting works
- [ ] Set up error notifications
- [ ] Document workflow for client

---

## 🎯 Quick Start Summary

1. **Upload** → Add images to Google Drive folder
2. **Refresh** → Click refresh in Content Manager
3. **Review** → Click image to preview
4. **Caption** → Add caption and hashtags
5. **Approve** → Click "Approve & Post"
6. **Done** → Content posts to Instagram automatically!

**Your content management system is ready! 🚀📸**
