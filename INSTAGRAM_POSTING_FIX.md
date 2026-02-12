# 🔧 Instagram Posting Fix - Image Requirements

## The Problem

Instagram API error: "Media download has failed. The media URI doesn't meet our requirements."

This means Instagram cannot download your image from Render.

## Why This Happens

1. **Image too large** - Instagram max: 8MB
2. **Wrong format** - PNG might not work, use JPG
3. **Image not accessible** - Render might not serve it correctly
4. **CORS issues** - Instagram can't access the file

## ✅ Solutions

### Solution 1: Use JPG Instead of PNG

PNG files often fail. Convert to JPG before uploading.

**Online converter**: https://www.iloveimg.com/convert-to-jpg

### Solution 2: Reduce Image Size

Instagram requirements:
- Max size: 8MB
- Max dimensions: 1080x1080 (square) or 1080x1350 (portrait)
- Format: JPG preferred

**Online compressor**: https://tinyjpg.com

### Solution 3: Test Image Accessibility

1. Upload image to your app
2. Copy the image URL from logs: `https://dirt-drop.onrender.com/uploads/YOUR_IMAGE.jpg`
3. Open in browser - if it loads, Instagram should be able to access it
4. If it doesn't load, there's a Render configuration issue

### Solution 4: Use External Image Hosting (Recommended)

Instead of hosting on Render, use:

**Cloudinary (Free tier):**
1. Sign up: https://cloudinary.com
2. Upload image
3. Get public URL
4. Use that URL for Instagram posting

**ImgBB (Free):**
1. Go to: https://imgbb.com
2. Upload image
3. Copy direct link
4. Use for Instagram

## 🎯 Quick Test

Try posting this test image (hosted externally):
```
https://picsum.photos/1080/1080
```

If this works, the issue is with your Render-hosted images.

## 🔄 Temporary Workaround

Until we fix the image hosting:

1. Upload image to ImgBB or Cloudinary
2. Get the direct URL
3. Manually test posting via Graph API Explorer:
   ```
   POST https://graph.facebook.com/v18.0/17841476833801694/media
   {
     "image_url": "YOUR_EXTERNAL_IMAGE_URL",
     "caption": "Test post",
     "access_token": "YOUR_TOKEN"
   }
   ```

## 📊 Instagram Image Requirements

| Requirement | Value |
|-------------|-------|
| Format | JPG (preferred), PNG |
| Max Size | 8MB |
| Min Width | 320px |
| Max Width | 1080px |
| Aspect Ratio | 4:5 to 1.91:1 |
| Color Space | sRGB |

## 🚀 Long-term Fix

We need to either:
1. Use external image hosting (Cloudinary/S3)
2. Fix Render's image serving
3. Convert PNG to JPG automatically before posting

---

**For now: Use JPG images under 2MB and test if they're accessible in browser first!**
