# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### 3. Environment Variables for Vercel
Add these in Vercel Dashboard → Settings → Environment Variables:

```
OPENAI_API_KEY=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

APPSFLYER_EMAIL=info@dirtdrop.com.au
APPSFLYER_PASSWORD=Dirtydrop25!
APPSFLYER_API_TOKEN=eyJhbGciOiJBMjU2S1ciLCJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwidHlwIjoiSldUIiwiemlwIjoiREVGIn0.cVun9LBEFK-ozpsBrQ82p9iIV9Er9vIGAF9FuVF0H9jaiWPuo5-KMQ.6X4e5Ni3JLcO_2vA.j81RlPtorrAjrE-yHqvDfbOGhgryRUB7aGj8kSJVN9BCQDkTNr6AIsG9ovi3tsX03xh2a3LuC1Gh-ISftKw_CgPkfEkNV14nuVusacD6utwb0N6VEX7QAHlYTuPwLUgKxthf6Lzm26N5p2nvumKtOciq8kYlyQIqq8sIHgT07JyoWBQlOG1R2AJYCuB3McJRwftxczSQjwWja5YCqsCUbDL3bXouEjSrQuPqV3LF74CE6qMxMfutxkUZrIA24o70AmX3tHeExphSKOUYxWPJM64cnnfxMmMLnoKfTfUOKteUDTcwg8HM8-_hCNQh_cwOOdpFinKzlW6F7Ud7Fy5otw.PSHrwQeatq_Ah8FnuLG0pA

INSTAGRAM_APP_ID=898802415967891
INSTAGRAM_APP_SECRET=55ff6e22a0070be990f501028944b2f9

MAKE_INSTAGRAM_WEBHOOK=https://hook.eu1.make.com/YOUR_WEBHOOK_ID_HERE
NEXT_PUBLIC_MAKE_INSTAGRAM_WEBHOOK=https://hook.eu1.make.com/YOUR_WEBHOOK_ID_HERE

NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-vercel-app.vercel.app
```

### 4. Update Make.com Webhook
After deployment, update your Make.com webhook to use:
```
https://your-vercel-app.vercel.app/api/make
```

### 5. Test Deployment
1. Visit your Vercel URL
2. Check all charts and data load
3. Test Instagram post button
4. Verify Make.com integration

## 🎯 Your app will be live at: `https://your-app-name.vercel.app`

## Troubleshooting
- **Build fails**: Check package.json dependencies
- **API errors**: Verify environment variables
- **Instagram not working**: Check webhook URLs
- **Charts not loading**: Clear browser cache

## Post-Deployment Checklist
- [ ] All environment variables added
- [ ] Dashboard loads correctly
- [ ] Charts display data
- [ ] Instagram button works
- [ ] Make.com webhook updated
- [ ] Client can access the URL

**Ready to show your client! 🚀**