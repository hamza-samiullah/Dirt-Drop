# START HERE - Instagram Marketing Automation

## ✅ What You Have
- ✅ Code-based Instagram automation (no Make.com needed!)
- ✅ AI caption generation with OpenAI
- ✅ Direct Instagram Graph API posting
- ✅ Local file storage (no Google Drive needed!)
- ✅ AppsFlyer analytics integration
- ✅ Automatic analytics collection via Vercel Cron

## 🚨 What You Need

### 1. Instagram Business Account ID
**This is the ONLY thing missing!**

Follow this guide: **[GET_INSTAGRAM_ID.md](./GET_INSTAGRAM_ID.md)**

Quick methods:
- Go to https://business.facebook.com/latest/settings/instagram_accounts
- Or use Graph API Explorer: https://developers.facebook.com/tools/explorer/
- Or check if your Instagram is a Business/Creator account (not Personal)

### 2. Update .env.local
Once you have the ID, add it to `.env.local`:

```env
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841234567890123
```

### 3. Restart Server
```bash
npm run dev
```

## 🎉 That's It!

Once you add the Instagram Business Account ID, everything will work:

1. **Upload** content in Content Manager
2. **Click** on uploaded content
3. **Generate** AI captions (3 options)
4. **Approve & Post** → Goes live on Instagram instantly!

## 📊 How It Works

```
Upload File → Save to /public/uploads/
     ↓
Click Content → Generate AI Captions (OpenAI)
     ↓
Select Caption → Edit if needed
     ↓
Approve & Post → Direct Instagram Graph API
     ↓
Posted! → Track in Analytics
```

## 💰 Cost: $5-15/month
- OpenAI API only
- No Make.com fees
- No Google Drive fees
- Instagram API is free

## 🐛 Troubleshooting

**Can't find Instagram Business Account ID?**
- See [GET_INSTAGRAM_ID.md](./GET_INSTAGRAM_ID.md)
- Make sure Instagram is Business/Creator account
- Make sure it's connected to Facebook Page

**Instagram API errors?**
- Verify access token is valid
- Check token has `instagram_basic` and `instagram_content_publish` permissions
- Ensure Business Account ID is correct

**AI captions not generating?**
- Check OpenAI API key in `.env.local`
- Verify you have API credits

## 📚 Documentation

- **[GET_INSTAGRAM_ID.md](./GET_INSTAGRAM_ID.md)** - How to get Business Account ID
- **[README.md](./README.md)** - Full project overview
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues

---

**🚀 Once you add the Instagram Business Account ID, you're ready to automate!**
